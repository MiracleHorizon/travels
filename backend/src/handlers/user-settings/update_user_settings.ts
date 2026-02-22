import { postgres } from '../../database'
import {
  MEASUREMENT_UNITS,
  TIME_FORMATS,
  LOCALES,
  type MeasurementUnit,
  type TimeFormat,
  type Locale
} from '../../domains/user-settings'
import { withAuth } from '../../middlewares/with_auth'

interface UpdateUserSettingsDto {
  measurementUnit?: MeasurementUnit
  timeFormat?: TimeFormat
  locale?: Locale
}

export const updateUserSettingsHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const body = (await req.json()) as UpdateUserSettingsDto

    const measurementUnit =
      body.measurementUnit && MEASUREMENT_UNITS.includes(body.measurementUnit)
        ? body.measurementUnit
        : undefined
    const timeFormat =
      body.timeFormat && TIME_FORMATS.includes(body.timeFormat) ? body.timeFormat : undefined
    const locale =
      body.locale && LOCALES.includes(body.locale) ? body.locale : undefined

    if (measurementUnit === undefined && timeFormat === undefined && locale === undefined) {
      return new Response(
        JSON.stringify({
          error: 'Provide at least one of measurementUnit, timeFormat or locale'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    const existing = await postgres`
      SELECT measurement_unit, time_format, locale FROM user_settings WHERE user_id = ${userId} LIMIT 1
    `

    const current = existing[0]
    const newMeasurementUnit = measurementUnit ?? (current?.measurement_unit as string) ?? 'metric'
    const newTimeFormat = timeFormat ?? (current?.time_format as string) ?? '24h'
    const newLocale = locale ?? (current?.locale as string) ?? 'ru'

    const result = await postgres`
      INSERT INTO user_settings (user_id, measurement_unit, time_format, locale, created_at, updated_at)
      VALUES (${userId}, ${newMeasurementUnit}, ${newTimeFormat}, ${newLocale}, NOW(), NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        measurement_unit = ${newMeasurementUnit},
        time_format = ${newTimeFormat},
        locale = ${newLocale},
        updated_at = NOW()
      RETURNING measurement_unit, time_format, locale
    `

    const row = result[0]
    return new Response(
      JSON.stringify({
        measurementUnit: row.measurement_unit as string,
        timeFormat: row.time_format as string,
        locale: row.locale as string
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Update settings error:', error)
    return new Response(
      JSON.stringify({
        error: 'Internal server error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
