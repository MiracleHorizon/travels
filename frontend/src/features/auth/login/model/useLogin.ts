import { toast } from 'sonner'
import { type LoginDto, useLoginMutation } from '../api/useLoginMutation'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()
  const mutation = useLoginMutation()

  return {
    ...mutation,
    mutate: (payload: LoginDto) =>
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
        }
      })
  }
}
