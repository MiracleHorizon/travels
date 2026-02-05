import React from 'react'
import ReactDOM from 'react-dom'

import { YMaps3Type } from '../context/YmapsContext'

const createNewScript = (src: string) => {
  const script = document.createElement('script')

  script.async = true
  script.src = src
  script.type = 'text/javascript'

  document.body.appendChild(script)

  return script
}

export const initYmaps3 = async (apiKey: string): Promise<YMaps3Type> =>
  new Promise((resolve, reject) => {
    if (window.ymaps3) {
      const ymaps = window.ymaps3

      ymaps.ready
        .then(() => {
          return ymaps.import('@yandex/ymaps3-reactify')
        })
        .then(reactifyThen => {
          const reactify = reactifyThen.reactify.bindTo(React, ReactDOM)

          resolve({
            ymaps,
            reactify
          })
        })
        .catch(reject)
    } else {
      const src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`
      const script =
        document.querySelector<HTMLScriptElement>(`script[src="${src}"]`) || createNewScript(src)

      script.onload = async () => {
        try {
          if (window.ymaps3) {
            const ymaps: typeof ymaps3 = window.ymaps3

            await ymaps.ready
            const ymaps3Reactify = await ymaps.import('@yandex/ymaps3-reactify')
            const controls = await ymaps.import('@yandex/ymaps3-controls@0.0.1')
            const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM)
            const controlsModule = reactify.module(controls)

            resolve({
              ymaps,
              reactify,
              controlsModule
            })
          } else {
            reject(new Error('ymaps3 не загружен после загрузки скрипта'))
          }
        } catch (err) {
          reject(err)
        }
      }

      script.onerror = () => {
        reject(new Error('Ошибка загрузки скрипта Яндекс.Карт'))
      }
    }
  })
