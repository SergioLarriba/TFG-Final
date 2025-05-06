import { StyleSheet, Linking, TouchableOpacity, View, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import theme from '@/constants/Theme';
import { ArrowBackIcon, DrawerIcon, ProfileIcon } from '@/components/Styled/HeaderIcons';
import ComponentLayout from '@/layout/ComponentLayout';
import StyledText from '@/components/Styled/StyledText';
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
	const [body, setBody] = useState<string>('')
	const [subject, setSubject] = useState<string>('')
	const navigation = useNavigation(); 
	const { t } = useTranslation(); 

	const handleSendEmail = () => {
		if (!subject.trim() || !body.trim()) {
			Alert.alert('Error', 'Rellene ambos campos antes de enviar el email');
			return;
		}
	
		Toast.show({
			type: 'success',
			text1: 'Correo preparado',
			text2: 'Redirigiendo al cliente de correo... 📬',
		});
	
		// Espera 2 segundos antes de abrir el cliente de correo
		setTimeout(() => {
			const email = "sergioapptfg@gmail.com";
			const finalSubject = `[TFG] Sugerencia: ${subject}`;
			const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(body)}`;
	
			Linking.openURL(mailtoUrl)
				.then(() => {
					setSubject('');
					setBody('');
				})
				.catch(err => {
					console.error('No se pudo abrir el cliente de correo: ', err);
					Alert.alert('Error', 'No se pudo abrir el cliente de correo. Intenta nuevamente.');
				});
		}, 2000); // 2 segundos = 2000 milisegundos
	};	

	/* Personalización del header */
	useLayoutEffect(() => {
		navigation.setOptions({
      headerShown: true,
      headerTitle: t('Drawer.header.contactUs'),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <>
          <ProfileIcon />
        </>
      ),
			headerLeft: () => (
				<>
					<DrawerIcon />
				</>
			)
    });
	}, [])

	return (
		<ComponentLayout>
			<StyledText fontSize='primary' fontWeight='bold'>{t('ContactUs.header')}</StyledText>
			<StyledText fontWeight='bold' marginBottom={10} marginTop={10}>{t('ContactUs.subHeading')}</StyledText>
			{/* Subject */}
			<TextInput
				style={styles.input}
				placeholder={t('ContactUs.mail1')}
				value={subject}
				onChangeText={setSubject}
				placeholderTextColor="#9C9C9C"
			/>
			{/* Descripcion */}
			<TextInput 
				value={body}
				onChangeText={setBody}
				placeholder={t('ContactUs.placeholder')}
				placeholderTextColor='#9C9C9C'
				style={[styles.input, styles.description]}
				multiline
			/>

			{/* Boton de enviar */}
			<TouchableOpacity style={styles.submit} onPress={handleSendEmail}>
				<StyledText fontSize="secundary" fontWeight="bold" color="primary">
					{t('ContactUs.sendBtn')}
				</StyledText>
			</TouchableOpacity>
		</ComponentLayout>
	)
}

const styles = StyleSheet.create({
	input: {
		color: theme.colors.white,
		backgroundColor: theme.colors.secundary,
		borderRadius: 15,
		padding: 15,
		marginBottom: 10,
		fontSize: 12,
		marginVertical: 15, 
	},
	description: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
	submit: {
		backgroundColor: theme.colors.green,
		borderRadius: 15,
		paddingVertical: 10, 
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-end', 
		marginVertical: 15, 
	},
})