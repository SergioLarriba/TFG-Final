import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useLocation } from '@/providers/LocationProvider';

export default function RestaurantMap({ name, address, latitude, longitude } : { name: string, address: string, latitude: number, longitude: number }) {
	const { location } = useLocation(); 
	/*const location = {
		latitude: 40.4167,
		longitude: -3.7033,
	}*/

	return (
		<View style={{ flex: 1, height: 300, borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
			<MapView
				style={{ flex: 1 }}
				//provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: 0.09,
					longitudeDelta: 0.01,
				}}
			>
				{/* Marker del usuario */}
				<Marker
					coordinate={location}
					title="Estás aquí"
					pinColor="blue"
				/>
				{/* Marker del restaurante */}
				<Marker
					coordinate={{ latitude, longitude }}
					title={name}
					description={address}
					pinColor="red"
				/>
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({})