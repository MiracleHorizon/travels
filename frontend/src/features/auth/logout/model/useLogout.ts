import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../api/useLogoutMutation'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logout, isPending } = useLogoutMutation({
    onSuccess: () => {
      queryClient.clear()
      navigate('/login')
    },
    onError: () => {
      toast.error('Не удалось выйти из системы')
    }
  })

  return {
    logout: () => logout(),
    isPending
  }
}
