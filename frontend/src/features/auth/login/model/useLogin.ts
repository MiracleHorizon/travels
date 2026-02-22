import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { type LoginDto, useLoginMutation } from '../api/useLoginMutation'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const mutation = useLoginMutation()

  const mutate = useCallback(
    (payload: LoginDto) =>
      mutation.mutate(payload, {
        onSuccess: () => {
          navigate('/travels/planned', {
            replace: true
          })
        },
        onError: () => {
          toast.error(t('toast.auth.loginError'), {
            description: t('toast.tryAgain')
          })
          navigate('/login', { replace: true })
        }
      }),
    [mutation, navigate, t]
  )

  return {
    ...mutation,
    mutate
  }
}
