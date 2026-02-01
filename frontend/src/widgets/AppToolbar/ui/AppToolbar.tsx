import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator
} from '@/shared/ui'
import { Link, useMatches } from 'react-router-dom'
import { ReactNode } from 'react'

interface BreadcrumbHandle {
  breadcrumb: string
}

interface AppToolbarProps {
  sidebarTrigger?: ReactNode
}

export const AppToolbar = ({ sidebarTrigger }: AppToolbarProps) => {
  const matches = useMatches()

  const breadcrumbs = matches
    .filter(match => Boolean((match.handle as BreadcrumbHandle)?.breadcrumb))
    .map(match => ({
      label: (match.handle as BreadcrumbHandle).breadcrumb,
      pathname: match.pathname
    }))

  return (
    <header className='flex h-[48px] shrink-0 items-center gap-2 border-b px-4'>
      {sidebarTrigger}

      <Separator orientation='vertical' className='mr-2 h-2' />

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1

            return (
              <div key={item.pathname} className='contents'>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={item.pathname}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator />}
              </div>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
