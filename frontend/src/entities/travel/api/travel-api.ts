import type { Travel, CreateTravelDto, UpdateTravelDto } from '../model/types'

const API_BASE_URL = 'http://localhost:4200/api'

export class TravelApi {
  static async getAll(): Promise<Travel[]> {
    const response = await fetch(`${API_BASE_URL}/travels`)
    if (!response.ok) {
      throw new Error('Failed to fetch travels')
    }
    return response.json()
  }

  static async getById(id: string): Promise<Travel> {
    const response = await fetch(`${API_BASE_URL}/travels/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch travel')
    }
    return response.json()
  }

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

  static async update(id: string, data: UpdateTravelDto): Promise<Travel> {
    const response = await fetch(`${API_BASE_URL}/travels/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to update travel')
    }
    return response.json()
  }

  static async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/travels/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete travel')
    }
  }

  static async archive(id: string): Promise<Travel> {
    return this.update(id, { isArchived: true })
  }

  static async unarchive(id: string): Promise<Travel> {
    return this.update(id, { isArchived: false })
  }
}
