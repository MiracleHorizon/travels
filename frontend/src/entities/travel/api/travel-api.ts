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

  static async getAll(): Promise<Travel[]> {
    const response = await fetch(`${API_BASE_URL}/travels`)
    if (!response.ok) {
      throw new Error('Failed to fetch travels')
    }
    return response.json()
  }

  static async getPlanned(): Promise<Travel[]> {
    const response = await fetch(`${API_BASE_URL}/travels/planned`)
    if (!response.ok) {
      throw new Error('Failed to fetch planned travels')
    }
    return response.json()
  }

  static async getPast(): Promise<Travel[]> {
    const response = await fetch(`${API_BASE_URL}/travels/past`)
    if (!response.ok) {
      throw new Error('Failed to fetch past travels')
    }
    return response.json()
  }

  static async getArchived(): Promise<Travel[]> {
    const response = await fetch(`${API_BASE_URL}/travels/archived`)
    if (!response.ok) {
      throw new Error('Failed to fetch archived travels')
    }
    return response.json()
  }
}
