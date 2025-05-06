import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useLocation } from '@/providers/LocationProvider'
import { getAddressFromCoords } from '@/utils/reverseGeocoding'

export default function RestaurantMapLocation({
	restaurantLocation, 
	setRestaurantLocation,
	setAddress, 
} : {
	restaurantLocation: {
		latitude: number,
		longitude: number,
	},
	setRestaurantLocation: React.Dispatch<React.SetStateAction<{
		latitude: number,
		longitude: number,
	}>>, 
	setAddress: React.Dispatch<React.SetStateAction<string>>,
}) {
	const { location } = useLocation(); 
	/*const location = {
		latitude: 40.4167,
		longitude: -3.7033,
	}*/

	/* Obtener la direccion en cuanto el usuario seleccione las coordenadas */
	useEffect(() => {
		if (restaurantLocation) {
			const fetchAddress = async () => {
				const address = await getAddressFromCoords(restaurantLocation.latitude, restaurantLocation.longitude);
				if (address) setAddress(address);
			}
			fetchAddress();
		}	
	}, [restaurantLocation]);

	return (
		<View style={{ height: 300, borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
			<MapView
				style={{ flex: 1 }}
				//provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.09,
					longitudeDelta: 0.01,
				}}
				onPress={(e) => {
					const { latitude, longitude } = e.nativeEvent.coordinate;
					setRestaurantLocation({ latitude, longitude });
				}}
			>
				{/* Marker del usuario */}
				<Marker
					coordinate={location}
					title="Estás aquí"
					pinColor="blue"
				/>

				{/* Marker del restaurante seleccionado */}
				{restaurantLocation && (
					<Marker
						coordinate={restaurantLocation}
						title="Ubicación del restaurante"
						description="Aquí se añadirá el restaurante"
						pinColor="red"
					/>
				)}
			</MapView>


		</View>
	)
}

const styles = StyleSheet.create({})


/**
 * <MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: location?.latitude || 0,
    longitude: location?.longitude || 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
  onPress={(e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  }}
>
  {location && (
    <Marker
      coordinate={location}
      draggable
      onDragEnd={(e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setLocation({ latitude, longitude });
      }}
    />
  )}
</MapView>

 */