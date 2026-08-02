import { postgres } from '../../database'
import { fetchCountryNameByCoords, type GeoCoords } from '../../domains/geo'
import { withAuth } from '../../middlewares/with_auth'

interface UpdateTravelDto {
  name?: string
  description?: string
  startDate?: string
  endDate?: string
  tags?: string[]
  coords?: GeoCoords
}

export const updateTravelHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params
    const body = (await req.json()) as UpdateTravelDto

    const { lat, lng } = body.coords ?? {}
    const hasCoords = lat != null && lng != null && !isNaN(lat) && !isNaN(lng)
    const coordsProvided = body.coords !== undefined

    const countryName = hasCoords
      ? await fetchCountryNameByCoords({ lat: lat!, lng: lng! })
      : null

    const result = await postgres`
      UPDATE travels 
      SET 
        name = COALESCE(${body.name}, name), 
        description = COALESCE(${body.description}, description), 
        start_date = COALESCE(${body.startDate}, start_date), 
        end_date = COALESCE(${body.endDate}, end_date), 
        tags = COALESCE(${body.tags}, tags),
        lat = ${coordsProvided ? (hasCoords ? lat : null) : postgres`lat`},
        lng = ${coordsProvided ? (hasCoords ? lng : null) : postgres`lng`},
        country_name = ${coordsProvided ? countryName : postgres`country_name`},
        updated_at = NOW() 
      WHERE id = ${travelId} AND user_id = ${userId}
      RETURNING *
    `

    if (result.count === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found or access denied' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error updating travel:', error)

    return new Response(JSON.stringify({ error: 'Failed to update travel' }), {
      status: 500
    })
  }
})
