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
import FlavourOptions from '@/components/Assistant/Forms/FlavourOptions'
import MealComplexity from '@/components/Assistant/Forms/MealComplexity'

const MemoizedFlavourOptions = memo(FlavourOptions)

export default memo(function Step2CookingInfo({
	formData, 
	setFormData, 
	errors
} : {
	formData: AssistantRecipesForm, 
	setFormData: Dispatch<SetStateAction<AssistantRecipesForm>>, 
	errors: AssistantRecipeErrors | undefined, 
}) {

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
	
	const handleChangeCookingTime = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, cookingTime: value}))
	}, [])

	const handleChangeSpicenessLevel = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, spicy: value}))
	}, [])

	const handleChangeMealComplexity = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, mealComplexity: value}))
	}, [])

	
	return (
		<View>
			{/* Preferencias de sabor */}
			<MemoizedFlavourOptions 
				selected={formData.flavourTypes}
				toggleItem={handleToggleFalvour}
			/>
			{/* Tiempo disponible para cocinar */}
			<CookingTime 
				item={formData.cookingTime}
				setItem={handleChangeCookingTime}
			/>
			{/* Nivel de picante */}
			<SpicenessLevel 
				item={formData.spicy}
				setItem={handleChangeSpicenessLevel}
			/>
			{/* Complejidad de las recetas */}
			<MealComplexity 
				item={formData.mealComplexity}
				setItem={handleChangeMealComplexity}
			/>
		</View>
	)
})

const styles = StyleSheet.create({})