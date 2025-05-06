import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, memo, SetStateAction, useCallback } from 'react'
import { AssistantRecipeErrors, AssistantRecipesForm } from '../AssistantRecipes'
import DayMoment from '@/components/Assistant/Forms/DayMoment'
import SelectedSkills from '@/components/Assistant/Forms/SelectedSkills'
import DietOptions from '@/components/Assistant/Forms/DietOptions'

const MemoizedDietOptions = memo(DietOptions)

export default function Step1BasicInfo({
	formData, 
	setFormData, 
	errors
} : {
	formData: AssistantRecipesForm, 
	setFormData: Dispatch<SetStateAction<AssistantRecipesForm>>, 
	errors: AssistantRecipeErrors | undefined, 
}) {

	const handleChangeSelectedMeal = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, selectedMealTime: value}))
	}, []); 

	const handleChangeSelectedSkill = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, selectedSkill: value}))
	}, []); 

	const handleToggleDiet = useCallback((item: string) => {
		setFormData(prev => {
			const isSelected = prev.dietaryPreferences.includes(item)
			const newSelection = isSelected
				? prev.dietaryPreferences.filter(i => i !== item)
				: [...prev.dietaryPreferences, item]
	
			return {
				...prev,
				dietaryPreferences: newSelection
			}
		})
	}, [])
	
	
	return (
		<View>
			{/* Preferencias específicas */}
			<MemoizedDietOptions
				selected={formData.dietaryPreferences}
				toggleItem={handleToggleDiet}
			/>
			{/* Momento del dia */}
			<DayMoment 
				item={formData.selectedMealTime}
				setItem={handleChangeSelectedMeal}
			/>
			{/* Nivel de cocina */}
			<SelectedSkills 
				item={formData.selectedSkill}
				setItem={handleChangeSelectedSkill}
			/>
		</View>
	)
}

const styles = StyleSheet.create({})