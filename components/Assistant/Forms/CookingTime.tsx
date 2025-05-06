import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { SectionTitle } from '../Assistant';
import StyledText from '@/components/Styled/StyledText';
import theme from '@/constants/Theme';
import { useTranslation } from 'react-i18next';

const COOKING_TIME = [
	'Menos de 15 min', 
	'15-30 min', 
	'Mas de 30 min'
]

export default function CookingTime({
	item, 
	setItem, 
} : {
	item: string, 
	setItem: (item: string) => void, 
}) {
	const { t } = useTranslation(); 

	const COOKING_TIME = [
		t('Assistant.form.cookingTimeTypes.short'), 
		t('Assistant.form.cookingTimeTypes.medium'),
		t('Assistant.form.cookingTimeTypes.long'),
	]

	return (
		<View>
			<SectionTitle>{ t('Assistant.form.cookingTime') }</SectionTitle>
			{COOKING_TIME.map((dayMoment, index) => (
				<Pressable
					key={index}
					onPress={() => setItem(dayMoment)}
					style={[styles.btn, item === dayMoment && styles.btnPressed]}
				>
					<StyledText fontWeight='bold'>{ dayMoment }</StyledText>
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