import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Recipe } from '@/api/types'
import StyledText from '@/components/Styled/StyledText'
import theme from '@/constants/Theme'
import { router } from 'expo-router'

interface Props {
  recipe: Recipe
}

export default function HomeRecipesItem({ recipe }: Props) {
  return (
    <Pressable style={styles.container} onPress={() => router.push(`/Recipes/${recipe.id}`)}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.image_url }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <StyledText 
          fontSize='secundary' 
          fontWeight='bold' 
          numberOfLines={3}
        >
          {recipe.name}
        </StyledText>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 200,
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
    overflow: 'hidden',
		borderColor: theme.colors.white,
		borderWidth: 0.5, 
    paddingBottom: 20, 
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 12,
    width: '100%',
  },
  title: {
    color: theme.colors.primary,
    marginBottom: 4,
  },
})