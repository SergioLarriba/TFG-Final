import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { SectionTitle } from '../Assistant'
import theme from '@/constants/Theme'
import { useTranslation } from 'react-i18next'

const MEAL_TIMES_OPTIONS = [
	'Desayuno', 
	'Almuerzo', 
	'Merienda', 
	'Cena', 
	'Post-entrenamiento', 
	'Snacks'
]

export default function MealTimes({
  selected,
  toggleItem,
}: {
  selected: string[],
  toggleItem: (item: string) => void,
}) {
  const { t } = useTranslation(); 

  const MEAL_TIMES_OPTIONS = [
    t('Assistant.form.mealTimeTypes.breakfast'), 
    t('Assistant.form.mealTimeTypes.lunch'), 
    t('Assistant.form.mealTimeTypes.snack'), 
    t('Assistant.form.mealTimeTypes.dinner'), 
    t('Assistant.form.mealTimeTypes.postWorkout'), 
    t('Assistant.form.mealTimeTypes.snacks'), 
  ]

  return (
    <View>
      <SectionTitle>{ t('Assistant.form.mealTimes') }</SectionTitle>
      {MEAL_TIMES_OPTIONS.map((option, index) => {
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
