import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyledText from '@/components/Styled/StyledText'
import ComponentLayout from '@/layout/ComponentLayout'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { getAIResponse } from '@/services/googleAI'
import theme from '@/constants/Theme'
import { ProfileIcon } from '@/components/Styled/HeaderIcons'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'

export default function AssistantResponse() {
	const navigation = useNavigation(); 
	const { userPrompt } = useLocalSearchParams<{ userPrompt: string }>()
	const [loading, setLoading] = useState<boolean>(false)
	const [response, setResponse] = useState<string>('')
	const { t } = useTranslation(); 	

	/* Configuracion del header */
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Respuesta', 
      headerTintColor: theme.colors.white,
      headerStyle: {
        backgroundColor: theme.colors.primary,
			}, 
      headerRight: () => (<ProfileIcon />),
    })
  }, [])

	useEffect(() => {
		const fetchResponse = async () => {
			setLoading(true)
			try {
				const response = await getAIResponse(userPrompt)
				if (response) {
					setResponse(response)
				}
			} catch (error) {
				console.error('Error al obtener la respuesta del asistente:', error)
				Alert.alert('Error', t('Assistant.error'));
			} finally {
				setLoading(false)
			}
		}
		fetchResponse()
	}, [userPrompt])

	// 🔍 Parser básico para negrita y saltos de línea
	const renderFormattedText = (text: string) => {
		const lines = text.split('\n')
		return lines.map((line, index) => {
			const parts = line.split(/(\*\*[^*]+\*\*)/) // divide entre texto normal y texto entre **
			return (
				<Text key={index} style={styles.responseLine}>
					{parts.map((part, i) => {
						if (part.startsWith('**') && part.endsWith('**')) {
							return (
								<Text key={i} style={styles.bold}>
									{part.slice(2, -2)}
								</Text>
							)
						}
						return part
					})}
				</Text>
			)
		})
	}

	return (
		<ComponentLayout>
			<ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
				<StyledText fontSize="secundary" fontWeight="bold" marginBottom={20} alignSelf='center'>
					🧑‍🍳 Resultado del asistente culinario
				</StyledText>

				{loading ? (
					<ActivityIndicator size="large" color={theme.colors.green} style={{ marginTop: 20 }} />
				) : (
					<View style={styles.card}>
						{renderFormattedText(response)}
					</View>
				)}
			</ScrollView>
		</ComponentLayout>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
    alignContent: 'flex-start',
		paddingHorizontal: 10,
    paddingBottom: 95,
  },
	card: {
		backgroundColor: theme.colors.secundary,
		borderRadius: 20,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4,
	},
	responseLine: {
		color: theme.colors.white,
		fontSize: 14,
		lineHeight: 22,
		fontFamily: theme.fonts.main,
		marginBottom: 6,
	},
	bold: {
		fontWeight: 'bold',
		color: theme.colors.green,
	},
})
