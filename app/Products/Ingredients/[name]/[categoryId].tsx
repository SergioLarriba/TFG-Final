import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { getIngredientsByCategory } from '@/api/ingredients';
import ComponentLayout from '@/layout/ComponentLayout';
import StyledText from '@/components/Styled/StyledText';
import { getIconByCategory } from '@/components/Styled/IngredientIcons';
import theme from '@/constants/Theme';
import { ScrollView } from 'react-native-gesture-handler';

export default function SimilarIngredients() {
	const { name, categoryId } = useLocalSearchParams<{
		name: string; 
		categoryId: string;
	}>(); 
	const navigation = useNavigation(); 
	const [ingredients, setIngredients] = useState([]) 

	/* Cargo los ingredientes de la categoría */
	useEffect(() => {
		const fetchIngredients = async () => {
			const data = await getIngredientsByCategory(categoryId)
			if (data) setIngredients(data)
		}
		fetchIngredients(); 
	}, []); 

	/* Personalizar el Header */
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: 'Ingredientes',
			headerStyle: {
				backgroundColor: theme.colors.primary,
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontSize: 20,
			},
		})
	}, [navigation])


	return (
		<ComponentLayout>
			<ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
				{/* Ingrediente que ha pulsado el usuario */}
				<IngredientItem 
					ingredient={name}
					categoryId={categoryId}
				/>
				{/* Ingredientes similares */}
				<StyledText fontSize='primary' fontWeight='bold' marginVertical={15}>
					Más ingredientes similares sin gluten: 
				</StyledText>
				{/* Mapeo los ingredientes */}
				{
					ingredients.length > 0 &&
					ingredients.map((ingredient, index) => {
						if (ingredient.name === name) return null; 
						
						return (
							<IngredientItem 
								key={index} 
								ingredient={ingredient.name} 
								categoryId={categoryId}
							/>
						)
					})
				}
			</ScrollView>
		</ComponentLayout>
	)
}

interface IngredientItemProps {
	ingredient: string, 
	categoryId: string,
}

const IngredientItem = ({ ingredient, categoryId }: IngredientItemProps) => {
	if (!ingredient || !categoryId) return null; 

	return (
		<View style={styles.ingredientItem}>
			<View style={styles.iconContainer}>
				{getIconByCategory(Number(categoryId))}
			</View>
			<StyledText fontSize='medium'>{ ingredient }</StyledText>
		</View>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
    alignItems: 'stretch',  // Aseguramos que todos los elementos ocupen el mismo ancho
    justifyContent: 'flex-start',
		paddingBottom: 100,
  },
	ingredientItem: {
		flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
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
})