import { StyleSheet, Text, View, ScrollView, Dimensions, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ComponentLayout from '@/layout/ComponentLayout';
import { getRecipeById } from '@/api/recipes';
import StyledText from '@/components/Styled/StyledText';
import theme from '@/constants/Theme';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ProfileIcon } from '@/components/Styled/HeaderIcons';
import { useTranslation } from 'react-i18next';


type RecipeType = {
  recipe: {
    description: string; 
    difficulty: string;
    id: number; 
    image_url: string;
    name: string; 
    numpeople: number;
    time: number;
    tips?: string;
  }
  ingredients: string[];
  instructions: string[];
};

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>(); 
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation(); 
  const { t } = useTranslation(); 

  /* Peticion para obtener las recetas */
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
        console.log(recipe); 
      } catch (error) {
        setError('Error al cargar receta');
      } finally { 
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  /* Configuracion del header */
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: t('Recipes.header'),
			headerStyle: {
				backgroundColor: theme.colors.primary,
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontSize: 20,
			},
			headerRight: () => (
				<>
					<ProfileIcon />
				</>
			)
		})
	}, [navigation])


  if (loading) return <ComponentLayout><ActivityIndicator size="large" color={theme.colors.green} style={{ marginTop: 20 }} /></ComponentLayout>
  if (error || !recipe) return <Text style={styles.error}>{error || 'Receta no encontrada'}</Text>;

  return ( 
    <ComponentLayout>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
        {/* Imagen de la receta */} 
        <Image source={{ uri: recipe.recipe.image_url }} style={styles.image} />
        {/* Información de la receta */} 
        <StyledText fontSize='primary' fontWeight='bold' alignSelf='center' marginVertical={20}>{recipe.recipe.name}</StyledText>
        <View style={styles.recipeInfo}>
          <StyledText fontSize='medium' fontWeight='bold'>⏳ {recipe.recipe.time} min</StyledText>
          <StyledText fontSize='medium' fontWeight='bold'>⭐⭐ {recipe.recipe.difficulty}</StyledText>
          <StyledText fontSize='medium' fontWeight='bold'>👥 {recipe.recipe.numpeople} {t('Recipes.people')}</StyledText>
        </View>
        {/* Breve descripción */}
        <StyledText fontSize='medium'>{recipe.recipe.description}</StyledText>
        {/* Consejos */}
        {recipe.recipe.tips && (
          <>
            <StyledText fontSize='secundary' fontWeight='bold' marginTop={20} marginBottom={10}>{t('Recipes.tips')}</StyledText>
            <StyledText fontSize='medium'>{recipe.recipe.tips}</StyledText>
          </>
        )}
        {/* Ingredientes */}
        <StyledText fontSize='secundary' fontWeight='bold' marginTop={20} marginBottom={10}>{t('Recipes.ingredients')}</StyledText>
        <View style={styles.ingredientsContainer}>
          {recipe.ingredients.map((item, index) => (
            <StyledText key={index} paddingVertical={5}>• {item.ingredient}</StyledText>
          ))}
        </View>
        {/* Instrucciones */}
        <StyledText fontSize='secundary' fontWeight='bold' marginTop={20} marginBottom={10}>{t('Recipes.instructions')}</StyledText>
        <View style={styles.ingredientsContainer}>
          {recipe.instructions.map((item, index) => (
            <View key={index} style={styles.instructionItem}>
              <StyledText fontWeight='bold'>{index + 1}. </StyledText> 
              <StyledText>{item.instruction}</StyledText>
            </View>
          ))} 
        </View> 
      </ScrollView>
    </ComponentLayout>
  );
} 

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'flex-start',  
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  image: { 
    height: 150,
    borderRadius: 15,
    resizeMode: 'cover', 
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
  },
  ingredientsContainer: {
    borderColor: theme.colors.white, 
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 16,
    backgroundColor: theme.colors.secundary,
  },
  instructionItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    color: theme.colors.green,
    marginTop: 50,
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
