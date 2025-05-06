import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, memo, SetStateAction, useCallback } from 'react'
import { AssistantRecipeErrors, AssistantRecipesForm } from '../AssistantRecipes'
import StyledText from '@/components/Styled/StyledText'
import DayMoment from '@/components/Assistant/Forms/DayMoment'
import SelectedSkills from '@/components/Assistant/Forms/SelectedSkills'
import DietOptions from '@/components/Assistant/Forms/DietOptions'
import Availability from '@/components/Assistant/Forms/Availability'
import Budget from '@/components/Assistant/Forms/Budget'

const MemoizedDietOptions = memo(DietOptions)
const MeomizedAvailability = memo(Availability)

export default function Step1BasicInfo({
	formData, 
	setFormData, 
	errors
} : {
	formData: AssistantRecipesForm, 
	setFormData: Dispatch<SetStateAction<AssistantRecipesForm>>, 
	errors: AssistantRecipeErrors | undefined, 
}) {
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

	const handleChangeBudget = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, budget: value}))
	}, []); 
	
	const handleToggleAvailability = useCallback((item: string) => {
		setFormData(prev => {
			const isSelected = prev.availability.includes(item)
			const newSelection = isSelected
				? prev.availability.filter(i => i !== item)
				: [...prev.availability, item]
	
			return {
				...prev,
				availability: newSelection
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
			{/* Precio */}
			<Budget 
				item={formData.budget}
				setItem={handleChangeBudget}
			/>
			{/* Donde suele comprar el usuario */}
			<MeomizedAvailability
				selected={formData.availability}
				toggleItem={handleToggleAvailability}
			/>
		</View>
	)
}

const styles = StyleSheet.create({})