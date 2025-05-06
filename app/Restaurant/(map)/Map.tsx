import React, { useEffect, useLayoutEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useLocation } from '@/providers/LocationProvider';
import { getNearbyRestaurants } from '@/api/restaurants';
import theme from '@/constants/Theme';
import { router, useNavigation } from 'expo-router';

export default function Map() {
	const navigation = useNavigation();
	const { location } = useLocation();
	const [loading, setLoading] = useState<boolean>(true);
	const [restaurants, setRestaurants] = useState([]);
	const [hasLocation, setHasLocation] = useState(false);

	useEffect(() => {
		if (location) setHasLocation(true);
	}, [location]);

	useEffect(() => {
		const fetchRestaurants = async () => {
			if (!location) return;

			setLoading(true);
			try { 
				const restaurantData = await getNearbyRestaurants(location.latitude, location.longitude);
				if (restaurantData) setRestaurants(restaurantData);
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false);
			}
		}; 

		fetchRestaurants();
	}, [hasLocation]);

	const handlePress = (restaurant: any) => {
		router.push(`/Restaurant/${restaurant.id}`); 
	}

	if (!hasLocation) {
		return <Text>Obteniendo localización...</Text>
	}

	return (
		<View style={styles.container}>
			{loading && <ActivityIndicator size='large' color={theme.colors.green} />}
			<View style={styles.mapContainer}>
				<MapView 
					style={styles.map} 
					initialRegion={{
						latitude: location?.latitude!, 
						longitude: location?.longitude!, 
						latitudeDelta: 0.01,  
						longitudeDelta: 0.1,
					}}
				>
					<Marker
						coordinate={location}
						title="Estás aquí"
						pinColor="blue"
					/>
					{restaurants.map((restaurant: any) => (
						<Marker 
							key={restaurant.id}
							coordinate={{
								latitude: restaurant.latitude,
								longitude: restaurant.longitude,
							}}
							title={restaurant.name}
							description={restaurant.address}
							onCalloutPress={() => handlePress(restaurant)}
						/>
					))}
				</MapView>
			</View>	
		</View>
	);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1, 
  },
	mapContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
});
