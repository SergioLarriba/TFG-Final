import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { SectionTitle } from '../Assistant'
import theme from '@/constants/Theme'
import { useTranslation } from 'react-i18next'

const CONCERNS_OPTIONS = [
	'Lectura de etiquetas',
	'Contaminación cruzada',
	'Comer fuera de casa',
	'Síntomas digestivos',
	'Alternativas de alimentos',
	'Nutrición balanceada'
]

export default function MainConcerns({
  selected,
  toggleItem,
}: {
  selected: string[],
  toggleItem: (item: string) => void,
}) {
  const { t } = useTranslation(); 

  const CONCERNS_OPTIONS = [
    t('Assistant.form.concernTypes.labelReading'), 
    t('Assistant.form.concernTypes.crossContamination'), 
    t('Assistant.form.concernTypes.eatingOut'), 
    t('Assistant.form.concernTypes.digestiveSymptoms'), 
    t('Assistant.form.concernTypes.foodAlternatives'), 
    t('Assistant.form.concernTypes.balancedNutrition'), 
  ]

  return (
    <View>
      <SectionTitle>{ t('Assistant.form.concerns') }</SectionTitle>
      {CONCERNS_OPTIONS.map((option, index) => {
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
