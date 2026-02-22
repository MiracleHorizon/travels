import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

const DEFAULT_MEASUREMENT_UNIT = 'metric'
const DEFAULT_TIME_FORMAT = '24h'

export const getSettingsHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const rows = await postgres`
      SELECT measurement_unit, time_format
      FROM user_settings
      WHERE user_id = ${userId}
      LIMIT 1
    `

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({
          measurementUnit: DEFAULT_MEASUREMENT_UNIT,
          timeFormat: DEFAULT_TIME_FORMAT
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const row = rows[0]
    return new Response(
      JSON.stringify({
        measurementUnit: (row.measurement_unit as string) ?? DEFAULT_MEASUREMENT_UNIT,
        timeFormat: (row.time_format as string) ?? DEFAULT_TIME_FORMAT
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Get settings error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
