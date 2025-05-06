import { StyleSheet, TextInput, View, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import ComponentLayout from '@/layout/ComponentLayout';
import StyledText from '@/components/Styled/StyledText';
import theme from '@/constants/Theme';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getIngredientsByCategory } from '@/api/ingredients';
import { Entypo } from '@expo/vector-icons';
import { getCategoryById } from '@/components/Styled/IngredientIcons';
import { useTranslation } from 'react-i18next';
import { ArrowBackIcon, ArrowBackIconWithoutPadding } from '@/components/Styled/HeaderIcons';

export default function IngredientsByCategory() {
  const navigation = useNavigation();
	const { categoryId } = useLocalSearchParams();
  const [headerCategory, setHeaderCategory] = useState<string>(); 
	const [ingredients,  setIngredients] = useState([]);
  const { t } = useTranslation(); 

  /* Personalizar el Header */
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: headerCategory,
			headerStyle: {
				backgroundColor: theme.colors.primary,
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontSize: 20,
			},
      headerLeft: () => <ArrowBackIconWithoutPadding />
		})
	}, [headerCategory])

	// Cargo los ingredientes de la categoria
	const fetchIngredients = async () => {
		const data = await getIngredientsByCategory(categoryId)
    setIngredients(data)
	}
	useEffect(() => {
		fetchIngredients()
    const category = getCategoryById(Number(categoryId), t)
    setHeaderCategory(category)
	}, [])
  
  return ( 
    <ComponentLayout>
      <ScrollView 
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
        {/* Mapeo los ingredientes */}
        {ingredients?.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <IngredientItem key={index} name={ingredient.name} />
          ))
        ) : (
          <ActivityIndicator size="large" color={theme.colors.green} style={{ marginTop: 20 }} />
        )}
      </ScrollView>
    </ComponentLayout>
  )
}  
 
function IngredientItem ({ name }: { name: string }) {
  if (!name) return

  return (
    <View style={styles.ingredientItem}>
      {/* Nombre del ingrediente */}
      <StyledText fontSize='medium'>{ name }</StyledText>
    </View>
  );
}


const styles = StyleSheet.create({
  ingredientItem: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderBottomWidth: 0.3,
		borderBottomColor: '#d3d3d3',
	},
  ingrWithRow: {
    borderColor: theme.colors.grey,
    borderBottomWidth: 0.5, 
  }, 
})