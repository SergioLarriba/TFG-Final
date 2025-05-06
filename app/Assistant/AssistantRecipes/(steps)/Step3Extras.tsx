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
import { Switch, TextInput } from 'react-native-gesture-handler'
import theme from '@/constants/Theme'
import { useTranslation } from 'react-i18next'


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

	const handleChangeIngredients = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, ingredients: value}))
	}, [])

	const handleChangeIngredientsToAvoid = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, ingredientsToAvoid: value}))
	}, [])

	const handleChangeTakeAwayOptions = useCallback((value: boolean) => {
		setFormData(prev => ({ ...prev, takeAwayOptions: value}))
	}, [])

	const handleChangeNumPeople = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, numPeople: value}))
	}, [])

	const handleChangeAdditionalNotes = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, additionalNotes: value}))
	}, [])
	
	
	return (
		<View>
			{/* Ingredientes disponibles */}
			<SectionTitle>{t('Assistant.form.ingredientsKeyInput')}</SectionTitle>
			<TextInput
				style={styles.input}
				placeholder={t('Assistant.form.ingredientsKeyPlaceholder')}
				placeholderTextColor={theme.colors.grey}
				value={formData.ingredients}
				onChangeText={handleChangeIngredients}
				multiline
			/>

			{/* Ingredientes a evitar */}
			<SectionTitle>{t('Assistant.form.ingredientsAvoidInput')}</SectionTitle>
			<TextInput
				style={styles.input}
				placeholder={t('Assistant.form.ingredientsAvoidPlaceholder')}
				placeholderTextColor={theme.colors.grey}
				value={formData.ingredientsToAvoid}
				onChangeText={handleChangeIngredientsToAvoid}
				multiline
			/>
			{/* Switch -> Necesitas comidas con opciones fáciles para llevar (al trabajo por ejempo) */}
			<SectionTitle>{t('Assistant.form.takeAwayOptions')}</SectionTitle>
			<Switch 
				value={formData.takeAwayOptions}
				onValueChange={handleChangeTakeAwayOptions}
				trackColor={{ false: theme.colors.white, true: theme.colors.green }}
				thumbColor={formData.takeAwayOptions ? theme.colors.green : theme.colors.white} 
			/>

			{/* Para cuantas personas es la receta */}
			<SectionTitle>{t('Assistant.form.numPeople')}</SectionTitle>
			<TextInput 
				style={styles.numInput} 
				placeholderTextColor={theme.colors.grey + '77'}
				value={String(formData.numPeople)}
				onChangeText={handleChangeNumPeople}
				keyboardType='number-pad'
				placeholder='10'
				maxLength={2}
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