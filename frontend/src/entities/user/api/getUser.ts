import { API_BASE_URL } from '@/shared/api'

export const getUser = async () => {
  const response = await fetch(`${API_BASE_URL}/user/me`, {
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error(response.status === 401 ? 'Unauthorized' : 'Failed to fetch user')
  }

  return response.json()
}
