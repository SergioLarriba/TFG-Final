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

const MemoizedCuisineTypes = memo(CuisineTypes)

export default memo(function Step2CookingInfo({
	formData, 
	setFormData, 
	errors
} : {
	formData: AssistantRecipesForm, 
	setFormData: Dispatch<SetStateAction<AssistantRecipesForm>>, 
	errors: AssistantRecipeErrors | undefined, 
}) {

	const handleChangeCookingTime = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, cookingTime: value}))
	}, [])

	const handleChangeSpicenessLevel = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, spicy: value}))
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
			{/* Preferencias culinarias */}
			<MemoizedCuisineTypes
				selected={formData.cuisineTypes}
				toggleItem={handleToggleCuisine}
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
		</View>
	)
})

const styles = StyleSheet.create({})