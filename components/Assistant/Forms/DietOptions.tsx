import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { SectionTitle } from '../Assistant'
import theme from '@/constants/Theme'
import { useTranslation } from 'react-i18next'

const DIET_OPTIONS = [
  'Vegana',
  'Sin lácteos',
  'Alta proteína',
  'Bajo en carbohidratos'
]

export default function DietOptions({
  selected,
  toggleItem,
}: {
  selected: string[],
  toggleItem: (item: string) => void,
}) {
  const { t } = useTranslation(); 

  const DIET_OPTIONS = [
    t('Assistant.form.dietTypes.vegan'),
    t('Assistant.form.dietTypes.dairyFree'),
    t('Assistant.form.dietTypes.highProtein'),
    t('Assistant.form.dietTypes.lowCarb'),
  ]
  
  return (
    <View>
      <SectionTitle>{ t('Assistant.form.dietPreferences') }</SectionTitle>
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
