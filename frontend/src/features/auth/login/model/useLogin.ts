import { useCallback } from 'react'
import { toast } from 'sonner'
import { type LoginDto, useLoginMutation } from '../api/useLoginMutation'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
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
          toast.error('Не удалось войти', {
            description: 'Пожалуйста, попробуйте еще раз'
          })
          navigate('/login', { replace: true })
        }
      }),
    [mutation, navigate]
  )

  return {
    ...mutation,
    mutate
  }
}
