import { StyleSheet, ScrollView, View, Pressable, Image, Platform, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import ComponentLayout from '@/layout/ComponentLayout';
import theme from '@/constants/Theme';
import StyledText from '@/components/Styled/StyledText';
import { useNavigation } from '@react-navigation/native';
import { ProfileIcon, AddRecipeIcon, DrawerIcon } from '@/components/Styled/HeaderIcons';
import { getRecipes } from '@/api/recipes';
import { Recipe } from '@/api/types';
import { router } from 'expo-router';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export default function Receips() {
  const navigation = useNavigation()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  /* Petición para obtener las recetas */
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getRecipes()
        setRecipes(recipesData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      } 
    }
    fetchRecipes();
  }, [recipes])

  /* Configuración del header */
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: Platform.OS === 'ios' ? 16 : 0, flexDirection: 'row', alignItems: 'center'}}>
          <AddRecipeIcon />
          <ProfileIcon />
        </View>
      ), 
      headerLeft: () => (<DrawerIcon />),
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
        {
          loading 
            ? <ActivityIndicator size="large" color={theme.colors.green} style={{ marginTop: 20 }} />
            : recipes?.map((recipe) => (
                <RecipesItem 
                  key={recipe.id}
                  id={recipe.id}
                  name={recipe.name}
                  image_url={recipe.image_url}
                />
          ))
        }
      </ScrollView>
    </ComponentLayout>
  );
};

export const RecipesItem = ({ id, name, time, numPeople, description, difficulty, tips, image_url }: Recipe) => {
  return (
    <Pressable style={styles.item}
      onPress={() => router.push(`/Recipes/${id}`)}
    >
      <View><Image source={{ uri: image_url }} style={styles.img}/></View>
      <View>
        <StyledText fontWeight='bold' fontSize='secundary' padding={10}>{name}</StyledText>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center', 
    justifyContent: 'flex-start',
    gap: 16,
  },
  img: {
    resizeMode: 'cover',
    width: screenWidth - 34, 
    height: 150,
    borderTopRightRadius: 15, 
    borderTopLeftRadius: 15, 
  },
  item: {
    borderWidth: 0.5, 
    borderColor: theme.colors.white, 
    alignItems: 'center',
    borderRadius: 15, 
    backgroundColor: theme.colors.secundary, 
  },
});
  
 