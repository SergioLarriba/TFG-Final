import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useLayoutEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import FilteredIngredients from "@/components/Filtered/FilteredIngredients";
import FilteredRestaurants from "./Restaurant/FilteredRestaurants";
import theme from "@/constants/Theme";
import { useTranslation } from "react-i18next";


export default function SearchScreen() {
	const { searchType } = useLocalSearchParams();
	const [searchText, setSearchText] = useState<string>('');
	const { t } = useTranslation(); 
	const navigation = useNavigation(); 

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false, 
		})
	}, []) 

	const handleSubmit = (text: string) => {
		setSearchText(text);
	}

	return (
		<SafeAreaView style={styles.view}>
			<View style={styles.searchHeader}> 
				<TouchableOpacity onPress={() => router.back()}>
					<Entypo name='chevron-left' size={24} color='white' />
				</TouchableOpacity>
				{
					searchType === 'restaurant' ? 
						<SearchBar onSubmit={handleSubmit} placeholder={t('Restaurants.searchPlaceholder')} /> :
					searchType === 'ingredient' ?
						<SearchBar onSubmit={handleSubmit} placeholder={t('Products.searchIngredientsPlaceholder')} /> :
					<Text>Search type not found</Text>
				}
			</View>
			{
				searchType === 'restaurant' ? 
					<FilteredRestaurants searchText={searchText} /> :
				searchType === 'ingredient' ?
					<FilteredIngredients searchText={searchText} /> :
				<Text>Search type not found</Text>
			}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	view: {
		backgroundColor: theme.colors.primary, 
		flex: 1, 
	}, 
	searchHeader: {
		padding: 5, 
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	}
})