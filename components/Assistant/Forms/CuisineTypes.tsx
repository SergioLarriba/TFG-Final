import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { SectionTitle } from '../Assistant'
import theme from '@/constants/Theme'
import { useTranslation } from 'react-i18next'

const DIET_OPTIONS = [
	'Internacional', 
	'Mexicana', 
	'Asiática', 
	'Mediterránea', 
	'Fusión'
]

export default function CuisineTypes({
  selected,
  toggleItem,
}: {
  selected: string[],
  toggleItem: (item: string) => void,
}) {
  const { t } = useTranslation(); 

  const DIET_OPTIONS = [
    t('Assistant.form.cuisineTypes.international'), 
    t('Assistant.form.cuisineTypes.mexican'), 
    t('Assistant.form.cuisineTypes.asian'), 
    t('Assistant.form.cuisineTypes.mediterranean'), 
    t('Assistant.form.cuisineTypes.fusion')
  ]

  return (
    <View>
      <SectionTitle>{ t('Assistant.form.cuisinePreferences') }</SectionTitle>
      {DIET_OPTIONS.map((option, index) => {
        const isChecked = selected.includes(option)
        return (
          <Pressable
            key={index}
            onPress={() => toggleItem(option)}
            style={[styles.option, isChecked && styles.optionChecked]}
          >
            <Text style={styles.optionText}>
              {isChecked ? '✅ ' : '⬜ '} {option}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}


const styles = StyleSheet.create({
  option: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderColor: theme.colors.white, 
    backgroundColor: theme.colors.secundary,
    borderWidth: 0.5, 
  },
  optionChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.green
  },
  optionText: {
    color: theme.colors.white,
    fontSize: 14,
  },
})
