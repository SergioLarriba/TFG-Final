import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getFilteredIngredients } from '@/api/ingredients'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '@/constants/Theme'
import { router } from 'expo-router';
import { getIconByCategory } from '../Styled/IngredientIcons';

export default function FilteredIngredients({ searchText }: { searchText: string }) {
	const { data: filteredIngredients} = useQuery({
		queryKey: ['ingredients', searchText],
		queryFn: () => getFilteredIngredients(searchText), 
		enabled: searchText.length > 0,
	})

	/* Navegar a la pantalla del ingrediente */
	// Ingredient: {"category_id": 3, "id": 28, "name": "Brócoli"}
	const handleIngredientPress = (ingredient: any) => {
		if (!ingredient) return;  
 
		router.push(`/Products/Ingredients/${ingredient.name}/${ingredient.category_id}`)
	}
 
	return (
		<FlatList 
			data={filteredIngredients}
			renderItem={({ item }) => 
			<IngredientItem 
				ingredient={item} 
				categoryId={item.category_id}
				onPress={() => handleIngredientPress(item)}
			/>}
			keyExtractor={item => item.id}
			contentContainerStyle={styles.listContainer}
		/>
	)
}

const IngredientItem = ({ ingredient, categoryId, onPress }: any) => {
  return (
    <TouchableOpacity 
      style={styles.ingredientItem}
      activeOpacity={0.7}
			onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {getIconByCategory(categoryId)}
      </View>
      <Text 
        style={styles.ingredientItemText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {ingredient.name}
      </Text>
      <Icon 
        name="chevron-right" 
        size={24} 
        color={theme.colors.grey} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
	listContainer: {
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 8,
	},
	ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
	iconContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: 'rgba(0, 254, 135, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	ingredientItemText: {
		flex: 1,
		color: theme.colors.white,
		fontSize: theme.fontSizes.medium,
		fontFamily: theme.fonts.main,
		fontWeight: theme.fontWeight.regular,
	},
	separator: {
		height: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		marginVertical: 8,
	},
})