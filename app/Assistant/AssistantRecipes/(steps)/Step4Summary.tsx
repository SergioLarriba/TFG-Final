import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { AssistantRecipeErrors, AssistantRecipesForm } from '../AssistantRecipes'

export default function Step4Summary({
	formData, 
	setFormData, 
	errors
} : {
	formData: AssistantRecipesForm, 
	setFormData: Dispatch<SetStateAction<AssistantRecipesForm>>, 
	errors: AssistantRecipeErrors, 
}) {
	return (
		<View>
			<Text>Step4Summary</Text>
		</View>
	)
}

const styles = StyleSheet.create({})