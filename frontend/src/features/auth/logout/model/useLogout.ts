import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../api/useLogoutMutation'
import { toast } from 'sonner'

export const useLogout = () => {
  const navigate = useNavigate()

  const { mutate: logout, isPending } = useLogoutMutation({
    onSuccess: () => {
      toast.success('Вы успешно вышли из системы')
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
