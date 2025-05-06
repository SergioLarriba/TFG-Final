import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { SectionTitle } from '../Assistant';
import StyledText from '@/components/Styled/StyledText';
import theme from '@/constants/Theme';
import { useTranslation } from 'react-i18next';

const SELECTED_SKILLS = [
	'Principiante', 
	'Intermedio', 
	'Avanzado', 
]; 

export default function SelectedSkills({
	item, 
	setItem, 
} : {
	item: string, 
	setItem: (item: string) => void, 
}) {
	const { t } = useTranslation(); 

	const SELECTED_SKILLS = [
		t('Assistant.form.skillTypes.beginner'), 
		t('Assistant.form.skillTypes.intermediate'),
		t('Assistant.form.skillTypes.advanced'), 
	]; 

	return (
		<View>
			<SectionTitle>{ t('Assistant.form.skillLevel') }</SectionTitle>
			{SELECTED_SKILLS.map((selectedSkill, index) => (
				<Pressable
					key={index}
					onPress={() => setItem(selectedSkill)}
					style={[styles.btn, item === selectedSkill && styles.btnPressed]}
				>
					<StyledText fontWeight='bold'>{ selectedSkill }</StyledText>
				</Pressable>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	btn: {
    backgroundColor: theme.colors.secundary, 
    padding: 10, 
    borderColor: theme.colors.white, 
    borderWidth: 0.5, 
    borderRadius: 12, 
    marginBottom: 10, 
  }, 
  btnPressed: {
    backgroundColor: theme.colors.primary, 
    borderColor: theme.colors.green, 
  }, 
})