import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, memo, SetStateAction, useCallback } from 'react'
import { AssistantRecipeErrors, AssistantRecipesForm } from '../AssistantRecipes'
import DayMoment from '@/components/Assistant/Forms/DayMoment'
import SelectedSkills from '@/components/Assistant/Forms/SelectedSkills'
import DietOptions from '@/components/Assistant/Forms/DietOptions'
import HealthProfile from '@/components/Assistant/Forms/HealthProfile'
import MainConcerns from '@/components/Assistant/Forms/MainConcerns'
import ExperienceLevel from '@/components/Assistant/Forms/ExperienceLevel'
import SpecificTopics from '@/components/Assistant/Forms/SpecificTopics'
import { SectionTitle } from '@/components/Assistant/Assistant'
import { TextInput } from 'react-native-gesture-handler'
import theme from '@/constants/Theme'
import { useTranslation } from 'react-i18next'

const MemoizedMainConcerns = memo(MainConcerns)

export default function Step2({
	formData, 
	setFormData, 
	errors
} : {
	formData: AssistantRecipesForm, 
	setFormData: Dispatch<SetStateAction<AssistantRecipesForm>>, 
	errors: AssistantRecipeErrors | undefined, 
}) {
	const { t } = useTranslation(); 

	const handleToggleSpecificTopics = useCallback((item: string) => {
		setFormData(prev => {
			const isSelected = prev.specificTopics.includes(item)
			const newSelection = isSelected
				? prev.specificTopics.filter(i => i !== item)
				: [...prev.specificTopics, item]
	
			return {
				...prev,
				specificTopics: newSelection
			}
		})
	}, [])
	
	const handleChangeAdditionalNotes = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, additionalNotes: value}))
	}, [])
	
	return (
		<View>
			{/* Temas específicos */}
			<SpecificTopics 
				selected={formData.specificTopics}
				toggleItem={handleToggleSpecificTopics}
			/>
			{/* Notas adicionales */}
			<SectionTitle>{t('Assistant.form.additionalNotesInput')}</SectionTitle>
			<TextInput
				style={styles.input}
				placeholder={t('Assistant.form.additionalNotesPlaceholder')}
				placeholderTextColor={theme.colors.grey}
				value={formData.additionalNotes}
				onChangeText={handleChangeAdditionalNotes}
				multiline
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
    color: theme.colors.grey,
    borderRadius: 15,
    padding: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 0.5,
    borderColor: theme.colors.grey,
    fontSize: 12,
    marginBottom: 20
  },
})