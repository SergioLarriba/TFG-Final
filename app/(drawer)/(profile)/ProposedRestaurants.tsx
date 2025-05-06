import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { getProposedRestaurantsByUserId } from '@/api/restaurants';
import { useNavigation } from 'expo-router';
import { ArrowBackIcon } from '@/components/Styled/HeaderIcons';
import theme from '@/constants/Theme';
import ComponentLayout from '@/layout/ComponentLayout';
import RestaurantItem from '@/app/Restaurant/RestaurantItem';

export default function ProposedRestaurants() {
	const { session } = useAuth(); 
	const navigation = useNavigation(); 
	const [loading, setLoading] = useState<boolean>(false); 
	const [restaurantData, setRestaurantData] = useState([]); 

	/* Personalizar el header */
	useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Restaurantes propuestos',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.white,
      headerLeft: () => (
        <ArrowBackIcon />
      ),
    })
  }, [navigation])

	/* Obtener los restaurantes propuestos por el usuario */
	const fetchProposedRestaurants = async () => {
		setLoading(true)
		try {
			const restaurants = await getProposedRestaurantsByUserId({ userId: session?.user.id})
			if (restaurants) setRestaurantData(restaurants)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		fetchProposedRestaurants(); 
	}, [])

	return (
		<ComponentLayout>
			<ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
				{
					loading 
						? <ActivityIndicator size="large" color={theme.colors.green} style={{ marginTop: 20 }} />
						: restaurantData.length > 0 && restaurantData.map((restaurant, index) => (
							<RestaurantItem 
								key={index}
								restaurant={restaurant}
							/>
						))
				}
			</ScrollView>
		</ComponentLayout>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
    alignItems: 'center', 
    justifyContent: 'flex-start',
    gap: 16,
  },
})