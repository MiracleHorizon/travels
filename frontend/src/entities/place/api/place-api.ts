import type { Place, CreatePlaceDto, UpdatePlaceDto } from '../model/types'

const API_BASE_URL = 'http://localhost:4200/api'

export class PlaceApi {
  static async getByTravelId(travelId: string): Promise<Place[]> {
    const response = await fetch(`${API_BASE_URL}/travels/${travelId}/places`)
    if (!response.ok) {
      throw new Error('Failed to fetch places')
    }
    const data = await response.json()
    // Защита: если пришел объект вместо массива, оборачиваем в массив
    return Array.isArray(data) ? data : (data ? [data] : [])
  }

  static async getById(id: string): Promise<Place> {
    const response = await fetch(`${API_BASE_URL}/places/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch place')
    }
    return response.json()
  }

  static async create(data: CreatePlaceDto): Promise<Place> {
    const response = await fetch(`${API_BASE_URL}/places`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to create place')
    }
    return response.json()
  }

  static async update(id: string, data: UpdatePlaceDto): Promise<Place> {
    const response = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Failed to update place')
    }
    return response.json()
  }

  static async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/places/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete place')
    }
  }

  // Загрузка фотографии
  static async uploadPhoto(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('photo', file)

    const response = await fetch(`${API_BASE_URL}/places/upload-photo`, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Failed to upload photo')
    }
    
    const data = await response.json()
    return data.url
  }
}
