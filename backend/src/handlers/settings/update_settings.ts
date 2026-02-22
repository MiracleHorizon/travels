import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

const MEASUREMENT_UNITS = ['metric', 'imperial'] as const
const TIME_FORMATS = ['24h', '12h'] as const

interface UpdateSettingsDto {
  measurementUnit?: (typeof MEASUREMENT_UNITS)[number]
  timeFormat?: (typeof TIME_FORMATS)[number]
}

export const updateSettingsHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const body = (await req.json()) as UpdateSettingsDto

    const measurementUnit =
      body.measurementUnit && MEASUREMENT_UNITS.includes(body.measurementUnit)
        ? body.measurementUnit
        : undefined
    const timeFormat =
      body.timeFormat && TIME_FORMATS.includes(body.timeFormat) ? body.timeFormat : undefined

    if (measurementUnit === undefined && timeFormat === undefined) {
      return new Response(
        JSON.stringify({
          error: 'Provide at least one of measurementUnit or timeFormat'
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
      SELECT measurement_unit, time_format FROM user_settings WHERE user_id = ${userId} LIMIT 1
    `

    const current = existing[0]
    const newMeasurementUnit = measurementUnit ?? (current?.measurement_unit as string) ?? 'metric'
    const newTimeFormat = timeFormat ?? (current?.time_format as string) ?? '24h'

    const result = await postgres`
      INSERT INTO user_settings (user_id, measurement_unit, time_format, created_at, updated_at)
      VALUES (${userId}, ${newMeasurementUnit}, ${newTimeFormat}, NOW(), NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        measurement_unit = ${newMeasurementUnit},
        time_format = ${newTimeFormat},
        updated_at = NOW()
      RETURNING measurement_unit, time_format
    `

    const row = result[0]
    return new Response(
      JSON.stringify({
        measurementUnit: row.measurement_unit as string,
        timeFormat: row.time_format as string
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
