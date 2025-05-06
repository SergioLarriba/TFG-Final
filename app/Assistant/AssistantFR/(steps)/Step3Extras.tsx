import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, memo, SetStateAction, useCallback } from 'react'
import { AssistantRecipeErrors, AssistantRecipesForm } from '../AssistantRecipes'
import StyledText from '@/components/Styled/StyledText'
import DayMoment from '@/components/Assistant/Forms/DayMoment'
import SelectedSkills from '@/components/Assistant/Forms/SelectedSkills'
import DietOptions from '@/components/Assistant/Forms/DietOptions'
import CuisineTypes from '@/components/Assistant/Forms/CuisineTypes'
import CookingTime from '@/components/Assistant/Forms/CookingTime'
import SpicenessLevel from '@/components/Assistant/Forms/SpicenessLevel'
import { SectionTitle } from '@/components/Assistant/Assistant'
import { TextInput } from 'react-native-gesture-handler'
import theme from '@/constants/Theme'
import Allergies from '@/components/Assistant/Forms/Allergies'
import { useTranslation } from 'react-i18next'

const MemoizedCuisineTypes = memo(CuisineTypes)

export default memo(function Step3Extras({
	formData, 
	setFormData, 
	errors
} : {
	formData: AssistantRecipesForm, 
	setFormData: Dispatch<SetStateAction<AssistantRecipesForm>>, 
	errors: AssistantRecipeErrors | undefined, 
}) {
	const { t } = useTranslation(); 

	const handleToggleCuisine = useCallback((item: string) => {
		setFormData(prev => {
			const isSelected = prev.cuisineTypes.includes(item)
			const newSelection = isSelected
				? prev.cuisineTypes.filter(i => i !== item)
				: [...prev.cuisineTypes, item]
	
			return {
				...prev,
				cuisineTypes: newSelection
			}
		})
	}, [])

	const handleToggleAllergies = useCallback((item: string) => {
		setFormData(prev => {
			const isSelected = prev.allergies.includes(item)
			const newSelection = isSelected
				? prev.allergies.filter(i => i !== item)
				: [...prev.allergies, item]
	
			return {
				...prev,
				allergies: newSelection
			}
		})
	}, [])
	
	const handleChangeAdditionalNotes = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, additionalNotes: value}))
	}, [])
	
	return (
		<View>
			{/* Preferencias culinarias */}
			<MemoizedCuisineTypes
				selected={formData.cuisineTypes}
				toggleItem={handleToggleCuisine}
			/>
			{/* Alergias */}
			<Allergies 
				selected={formData.allergies}
				toggleItem={handleToggleAllergies}
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
})

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
	/* Input numérico */
  numInput: {
    borderWidth: 0.5,
    borderColor: theme.colors.white,
    borderRadius: 12,
    color: theme.colors.grey,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
})