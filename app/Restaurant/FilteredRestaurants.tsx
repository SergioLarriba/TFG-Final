import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFilteredRestaurants } from '@/api/restaurants'
import StyledText from '@/components/Styled/StyledText'
import { SearchIcon } from '@/components/Styled/Icons'
import theme from '@/constants/Theme'
import { router } from 'expo-router'

export default function FilteredRestaurants({ searchText }: { searchText: string }) {
	const { data: filteredRestaurants} = useQuery({
		queryKey: ['restaurants', searchText], 
		queryFn: () => getFilteredRestaurants(searchText), 
		enabled: searchText.length > 0,
	})

	/* Navegar a la pantalla de un restaurante */
	const handleRestaurantPress = (id: string) => {
		if (!id) return; 

		router.push(`/Restaurant/${id}`); 
	}

	return (
		<FlatList 
			data={filteredRestaurants}
			keyExtractor={item => item.id}
			renderItem={({ item }) => 
			<RestaurantItem 
				restaurant={item} 
				onPress={() => handleRestaurantPress(item.id)} 
			/>}
		/>
	)
}

const RestaurantItem = ({ restaurant, onPress }: any) => {
	if (!restaurant) return null 

	return (
		<TouchableOpacity 
			style={styles.suggestionItem}
			onPress={onPress}
		>
			{/* Icono de la Lupa */}
			<SearchIcon color='white' />   
			{/* Nombre + Direccion */}
			<View style={styles.nameAndAddress}>
				{ restaurant.name && <StyledText fontSize='secundary'>{ restaurant.name }</StyledText>}
				{ restaurant.address && <StyledText textAlign='left' color='grey'>{ restaurant.address }</StyledText>}
			</View>
			{/* Icono de ubicacion */} 
			{
				
			}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
  },
	input: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    paddingVertical: 0,
  },
  suggestionItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 16,
		marginHorizontal: 16, 
  }, 
	nameAndAddress: {
    paddingHorizontal: 16,
    flex: 1,
  }, 
  distance: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
})