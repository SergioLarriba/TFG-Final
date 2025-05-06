import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, memo, SetStateAction, useCallback } from 'react'
import { AssistantRecipeErrors, AssistantRecipesForm } from '../AssistantRecipes'
import DayMoment from '@/components/Assistant/Forms/DayMoment'
import SelectedSkills from '@/components/Assistant/Forms/SelectedSkills'
import DietOptions from '@/components/Assistant/Forms/DietOptions'
import Allergies from '@/components/Assistant/Forms/Allergies'
import CuisineTypes from '@/components/Assistant/Forms/CuisineTypes'

const MemoizedDietOptions = memo(DietOptions)
const MemoizedAllergies = memo(Allergies)
const MemoizedCuisineTypes = memo(CuisineTypes)

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
	
	
	return (
		<View>
			{/* Preferencias específicas */}
			<MemoizedDietOptions
				selected={formData.dietaryPreferences}
				toggleItem={handleToggleDiet}
			/>
			{/* Allergias */}
			<MemoizedAllergies 
				selected={formData.allergies}
				toggleItem={handleToggleAllergies}
			/>
			{/* Preferencias culinarias */}
			<MemoizedCuisineTypes
				selected={formData.cuisineTypes}
				toggleItem={handleToggleCuisine}
			/>
		</View>
	)
}

const styles = StyleSheet.create({})