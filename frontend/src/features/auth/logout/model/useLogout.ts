import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../api/useLogoutMutation'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

export const useLogout = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useLogoutMutation()

  return {
    isPending,
    logout: () =>
      mutate(undefined, {
        onSuccess: () => {
          queryClient.clear()
          navigate('/login')
        },
        onError: () => {
          toast.error(t('toast.auth.logoutError'))
        }
      })
  }
}
