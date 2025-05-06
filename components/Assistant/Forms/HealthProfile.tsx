import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { SectionTitle } from '../Assistant';
import StyledText from '@/components/Styled/StyledText';
import theme from '@/constants/Theme';
import { useTranslation } from 'react-i18next';

const HEALTH_PROFILE = [
	'Celiaquía', 
	'Sensibilidad', 
	'Elección personal',
]

export default function HealthProfile({
	item, 
	setItem, 
} : {
	item: string, 
	setItem: (item: string) => void, 
}) {
	const { t } = useTranslation(); 

	const HEALTH_PROFILE = [
		t('Assistant.form.healthTypes.celiac'), 
		t('Assistant.form.healthTypes.sensitive'), 
		t('Assistant.form.healthTypes.personalChoice'), 
	]

	return (
		<View>
			<SectionTitle>{ t('Assistant.form.healthProfile') }</SectionTitle>
			{HEALTH_PROFILE.map((dayMoment, index) => (
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