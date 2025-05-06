import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { SectionTitle } from '../Assistant'
import theme from '@/constants/Theme'
import { useTranslation } from 'react-i18next'

const SPECIFIC_TOPICS = [
	'Diagnóstico reciente', 
	'Alimentos inesperados con gluten', 
	'Medicación y suplementos', 
	'Viajes y vida social', 
	'Niños y escuela',
]

export default function SpecificTopics({
  selected,
  toggleItem,
}: {
  selected: string[],
  toggleItem: (item: string) => void,
}) {
  const { t } = useTranslation(); 

  const SPECIFIC_TOPICS = [
    t('Assistant.form.topicTypes.recentDiagnosis'), 
    t('Assistant.form.topicTypes.hiddenGluten'), 
    t('Assistant.form.topicTypes.medications'), 
    t('Assistant.form.topicTypes.travelAndSocial'), 
    t('Assistant.form.topicTypes.kidsAndSchool'),
  ]

  return (
    <View>
      <SectionTitle>{t('Assistant.form.topics')}</SectionTitle>
      {SPECIFIC_TOPICS.map((option, index) => {
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
