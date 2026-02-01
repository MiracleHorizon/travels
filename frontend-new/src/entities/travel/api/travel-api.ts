import type { Travel, CreateTravelDto } from '../model/types'

const API_BASE_URL = 'http://localhost:4200/api'

export class TravelApi {
  static async create(data: CreateTravelDto): Promise<Travel> {
    const response = await fetch(`${API_BASE_URL}/travels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to create travel')
    }
    return response.json()
  }
}
