import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { useNavigation } from 'expo-router';
import { ArrowBackIcon } from '@/components/Styled/HeaderIcons';
import theme from '@/constants/Theme';
import { getProposedRecipes } from '@/api/recipes';
import ComponentLayout from '@/layout/ComponentLayout';
import { RecipesItem } from '../(tabs)/Recipes';

export default function ProposedRecipes() {
	const { session } = useAuth(); 
	const navigation = useNavigation(); 
	const [loading, setLoading] = useState<boolean>(false); 
	const [recipesData, setRecipesData] = useState([]); 

	/* Personalizar el header */
	useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Recetas propuestas',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.white,
      headerLeft: () => (
        <ArrowBackIcon />
      ),
    })
  }, [navigation])

	/* Obtener las recetas propuestas por el usuario */
	const fetchProposedRecipes = async () => {
		setLoading(true); 
		try {
			const recipes = await getProposedRecipes(session?.user.id)
			if (recipes) setRecipesData(recipes); 
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false); 
		}
	}
	useEffect(() => {
		fetchProposedRecipes(); 
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
					: recipesData.length > 0 && recipesData.map((recipe, index) => (
						<RecipesItem  
							key={index}
							id={recipe.id}
							name={recipe.name}
							image_url={recipe.image_url}
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