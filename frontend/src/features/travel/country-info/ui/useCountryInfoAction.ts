import { useShowModal } from '@/shared/lib/modal'
import { countryInfoModalDefinition } from './CountryInfoDialog'

export const useCountryInfoAction = () => {
  const showModal = useShowModal()

  return (countryName: string | null | undefined) => {
    showModal(countryInfoModalDefinition, { countryName })
  }
}
