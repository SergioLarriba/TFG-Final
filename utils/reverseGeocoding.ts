import * as Location from 'expo-location'

export const getAddressFromCoords = async (latitude: number, longitude: number) => {
  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude })
    if (address) {
      const fullAddress = `${address.name}, ${address.street}, ${address.postalCode}, ${address.city}, ${address.country}`
      return fullAddress
    }
  } catch (error) {
    console.error('Error al obtener dirección:', error)
  }
}
