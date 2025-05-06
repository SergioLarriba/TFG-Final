import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, memo, SetStateAction, useCallback } from 'react'
import { AssistantRecipeErrors, AssistantRecipesForm } from '../AssistantRecipes'
import DayMoment from '@/components/Assistant/Forms/DayMoment'
import SelectedSkills from '@/components/Assistant/Forms/SelectedSkills'
import DietOptions from '@/components/Assistant/Forms/DietOptions'
import HealthProfile from '@/components/Assistant/Forms/HealthProfile'
import MainConcerns from '@/components/Assistant/Forms/MainConcerns'
import ExperienceLevel from '@/components/Assistant/Forms/ExperienceLevel'

const MemoizedMainConcerns = memo(MainConcerns)

export default function Step1({
	formData, 
	setFormData, 
	errors
} : {
	formData: AssistantRecipesForm, 
	setFormData: Dispatch<SetStateAction<AssistantRecipesForm>>, 
	errors: AssistantRecipeErrors | undefined, 
}) {

	const handleChangehealthProfile = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, healthProfile: value}))
	}, []); 

	const handleChangeExperienceLevel = useCallback((value: string) => {
		setFormData(prev => ({ ...prev, experienceLevel: value}))
	}, []); 

	const handleToggleMainConcerns = useCallback((item: string) => {
		setFormData(prev => {
			const isSelected = prev.mainConcerns.includes(item)
			const newSelection = isSelected
				? prev.mainConcerns.filter(i => i !== item)
				: [...prev.mainConcerns, item]
	
			return {
				...prev,
				mainConcerns: newSelection
			}
		})
	}, [])
	
	
	return (
		<View>
			{/* Situacion actual */}
			<HealthProfile 
				item={formData.healthProfile}
				setItem={handleChangehealthProfile}
			/>
			{/* Momento del dia */}
			<MemoizedMainConcerns 
				selected={formData.mainConcerns}
				toggleItem={handleToggleMainConcerns}
			/>
			{/* Nivel de experiencia */}
			<ExperienceLevel 
				item={formData.experienceLevel}
				setItem={handleChangeExperienceLevel}
			/>
		</View>
	)
}

const styles = StyleSheet.create({})