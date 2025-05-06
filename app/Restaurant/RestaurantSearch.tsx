import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import SearchBar from '@/components/SearchBar';
import FilteredRestaurants from './FilteredRestaurants';
import { useTranslation } from 'react-i18next';


export default function RestaurantsSearch() {
	const [searchText, setSearchText] = useState<string>('')
	const { t } = useTranslation(); 

	const handleSubmit = (text: string) => {
		setSearchText(text)
	}

	return (
		<SafeAreaView>
			<View style={styles.searchHeader}>
				<TouchableOpacity onPress={() => router.back()}>
					<Entypo name='chevron-left' size={24} color='black' />
				</TouchableOpacity>
				<SearchBar onSubmit={handleSubmit} placeholder={t('Home.restaurantPlaceholder')} />
			</View>
			<FilteredRestaurants searchText={searchText} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	searchHeader: {
		padding: 5, 
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	}
})