import { Pressable, StyleSheet, View, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import StyledText from '@/components/Styled/StyledText'
import theme from '@/constants/Theme'

interface Props {
  imgSrc: ImageSourcePropType
  text: string
  goTo: string
}

export default function AssistantItem({ imgSrc, text, goTo }: Props) {
  return (
    <Pressable
      onPress={() => router.push(`/Assistant/${goTo}`)}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedEffect
      ]}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={imgSrc} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <StyledText 
          fontWeight='bold' 
          fontSize='secundary'
          numberOfLines={3}
        >
          {text}
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
    paddingBottom: 15, 
  },
  pressedEffect: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
    backgroundColor: theme.colors.secundary + 'CC', // 80% opacity
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
  text: {
    textAlign: 'center',
    color: theme.colors.white,
  },
})