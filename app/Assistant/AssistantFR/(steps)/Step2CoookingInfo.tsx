import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, memo, SetStateAction, useCallback } from 'react'
import { AssistantRecipeErrors, AssistantRecipesForm } from '../AssistantRecipes'
import MealTimes from '@/components/Assistant/Forms/MealTimes'
import CookingFrequency from '@/components/Assistant/Forms/CookingFrequency'
import FlavourOptions from '@/components/Assistant/Forms/FlavourOptions'

const MemoizedMealTimes = memo(MealTimes)
const MemoizedFlavourOptions = memo(FlavourOptions)

export default function Step2CookingInfo({
	formData,  
	setFormData, 
	errors
} : {
	formData: AssistantRecipesForm, 
	setFormData: Dispatch<SetStateAction<AssistantRecipesForm>>, 
	errors: AssistantRecipeErrors | undefined, 
}) {
	const handleToggleMealTimes = useCallback((item: string) => {
		setFormData(prev => {
			const isSelected = prev.mealTimes.includes(item)
			const newSelection = isSelected
				? prev.mealTimes.filter(i => i !== item)
				: [...prev.mealTimes, item]
	
			return {
				...prev,
				mealTimes: newSelection
			}
		})
	}, [])

	const handleChangeCookingFrequency = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, cookingFrequency: value}))
	}, []); 
	
	const handleToggleFalvour = useCallback((item: string) => {
		setFormData(prev => {
			const isSelected = prev.flavourTypes.includes(item)
			const newSelection = isSelected
				? prev.flavourTypes.filter(i => i !== item)
				: [...prev.flavourTypes, item]
	
			return {
				...prev,
				flavourTypes: newSelection
			}
		})
	}, [])

	return (
		<View>
			{/* Momentos del dia */}
			<MemoizedMealTimes
				selected={formData.mealTimes}
				toggleItem={handleToggleMealTimes}
			/>
			{/* Cuantas veces sueles cocinar a la semana */}
			<CookingFrequency 
				item={formData.cookingFrequency}
				setItem={handleChangeCookingFrequency}
			/>
			{/* Preferencias de sabor */}
			<MemoizedFlavourOptions 
				selected={formData.flavourTypes}
				toggleItem={handleToggleFalvour}
			/>
		</View>
	)
}

const styles = StyleSheet.create({})