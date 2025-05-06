import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import theme from '@/constants/Theme';
import ComponentLayout from '@/layout/ComponentLayout';
import { AddProductIcon, ArrowBackIconWithoutPadding, ProfileIcon } from '@/components/Styled/HeaderIcons';
import StyledText from '@/components/Styled/StyledText';
import { useTranslation } from 'react-i18next';

export default function Products() {
	const navigation = useNavigation(); 
	const { t } = useTranslation(); 

	/* Configuración del header */
	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
      headerTitle: 'Productos Sin Gluten',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 20,
      },
			headerLeft: () => <ArrowBackIconWithoutPadding />
		})
	}, [navigation])

	return (
		<ComponentLayout>
			<StyledText fontSize='medium' fontWeight='bold'>
				{t('Products.productsText')}
			</StyledText>
		</ComponentLayout>
	)
}

const styles = StyleSheet.create({})