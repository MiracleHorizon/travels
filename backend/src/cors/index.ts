type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'

interface CorsOptions {
  origin?: string
  /** При credentials: true браузер не допускает '*'; перечисляем разрешённые origins */
  allowedOrigins?: string[]
  methods?: HttpMethod[]
  headers?: string[]
  credentials?: boolean
}

// eslint-disable-next-line
type RouteHandler<Path extends string> = (req: Bun.BunRequest<Path>) => Response | Promise<Response>

type Route<Path extends string> =
  | RouteHandler<Path>
  // eslint-disable-next-line
  | { [Method in HttpMethod]?: RouteHandler<Path> }
  | Response

type Routes = {
  [Path in string]: Route<Path> | RouteHandler<Path> | Response
}

const allowedMethods = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] as const)

const CLIENT_URL = process.env.CLIENT_URL ?? 'https://localhost:3000'

// В dev фронт может быть на https (Vite), бэк на http — разрешаем оба варианта
const defaultAllowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [CLIENT_URL]
    : [
        CLIENT_URL,
        CLIENT_URL.replace(/^http:/, 'https:'),
        CLIENT_URL.replace(/^https:/, 'http:')
      ].filter((v, i, a) => a.indexOf(v) === i)

export const corsHeaders: CorsOptions = {
  allowedOrigins: defaultAllowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  headers: ['Content-Type'],
  credentials: true
}

const getCorsHeadersForRequest = (
  req: Bun.BunRequest<string>,
  options: CorsOptions
): Record<string, string> => {
  const origins =
    options.allowedOrigins ??
    (options.origin === '*' ? [] : options.origin ? [options.origin] : defaultAllowedOrigins)
  const credentials = options.credentials ?? true
  const requestOrigin = req.headers.get('origin') ?? ''
  const allowOrigin =
    credentials && origins.length > 0
      ? origins.includes(requestOrigin)
        ? requestOrigin
        : origins[0]
      : (options.origin ?? '*')

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': String(options.methods ?? '*'),
    'Access-Control-Allow-Headers': String(options.headers ?? '*'),
    'Access-Control-Allow-Credentials': String(credentials)
  }
}

// TODO: Улучшить
export const injectCORS = (routes: Routes, options: CorsOptions = {}): Routes => {
  const staticCorsHeaders = {
    'Access-Control-Allow-Origin': options.allowedOrigins?.[0] ?? options.origin ?? '*',
    'Access-Control-Allow-Methods': String(options.methods ?? '*'),
    'Access-Control-Allow-Headers': String(options.headers ?? '*'),
    'Access-Control-Allow-Credentials': String(options.credentials ?? true)
  }

  const wrappedRoutes: Routes = {}

  for (const [path, body] of Object.entries(routes)) {
    if (typeof body === 'function') {
      wrappedRoutes[path] = async (req: Bun.BunRequest<string>) => {
        const headers = getCorsHeadersForRequest(req, options)
        if (
          options.methods &&
          req.method !== 'OPTIONS' &&
          !options.methods.includes(req.method as HttpMethod)
        ) {
          return new Response('Method Not Allowed', {
            status: 405,
            headers
          })
        }

        if (options.headers && req.headers.has('access-control-request-headers')) {
          const requestedHeaders =
            req.headers
              .get('access-control-request-headers')
              ?.split(',')
              .map(h => h.trim().toLowerCase()) || []
          const allowedHeaders = options.headers.map(h => h.toLowerCase())

          const hasDisallowedHeader = requestedHeaders.some(
            header => !allowedHeaders.includes(header)
          )

          if (hasDisallowedHeader) {
            return new Response('Forbidden Headers', {
              status: 403,
              headers
            })
          }
        }

        const res = await body(req)
        if (!res) throw new Error('Response not specified')
        for (const [key, value] of Object.entries(headers)) {
          res.headers.set(key, value)
        }
        return res
      }
    } else if (body instanceof Response) {
      wrappedRoutes[path] = async () => {
        const newRes = new Response(null, {
          status: body.status,
          statusText: body.statusText,
          headers: new Headers(body.headers)
        })

        for (const [key, value] of Object.entries(staticCorsHeaders)) {
          newRes.headers.set(key, value)
        }

        return newRes
      }
    } else if (typeof body === 'object' && body !== null) {
      wrappedRoutes[path] = {}

      for (const [method, handler] of Object.entries(body)) {
        if (allowedMethods.has(method as HttpMethod)) {
          const typedMethod = method as HttpMethod
          wrappedRoutes[path][typedMethod] = async (req: Bun.BunRequest<string>) => {
            const headers = getCorsHeadersForRequest(req, options)
            if (
              options.methods &&
              typedMethod !== 'OPTIONS' &&
              !options.methods.includes(typedMethod)
            ) {
              return new Response('Method Not Allowed', {
                status: 405,
                headers
              })
            }

            if (options.headers && req.headers.has('access-control-request-headers')) {
              const requestedHeaders =
                req.headers
                  .get('access-control-request-headers')
                  ?.split(',')
                  .map(h => h.trim().toLowerCase()) || []
              const allowedHeaders = options.headers.map(h => h.toLowerCase())

              const hasDisallowedHeader = requestedHeaders.some(
                header => !allowedHeaders.includes(header)
              )

              if (hasDisallowedHeader) {
                return new Response('Forbidden Headers', {
                  status: 403,
                  headers
                })
              }
            }

            const res = await handler!(req)
            if (!res) throw new Error('Response not specified')
            for (const [key, value] of Object.entries(headers)) {
              res.headers.set(key, value)
            }
            return res
          }
        }
      }

      const route = wrappedRoutes[path]
      if (typeof route === 'object' && route !== null && !route['OPTIONS']) {
        route['OPTIONS'] = async (req: Bun.BunRequest<string>) =>
          new Response(null, {
            status: 204,
            headers: getCorsHeadersForRequest(req, options)
          })
      }
    }
  }

  return wrappedRoutes
}
