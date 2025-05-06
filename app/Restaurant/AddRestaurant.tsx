import { StyleSheet, TextInput, View, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import ComponentLayout from '@/layout/ComponentLayout';
import { useNavigation } from 'expo-router';
import theme from '@/constants/Theme';
import StyledText from '@/components/Styled/StyledText';
import { SectionTitle } from '@/components/Assistant/Assistant';
//import { postRestaurant } from '@/api/restaurants'; // Asegúrate de tener esta función
import { useAuth } from '@/providers/AuthProvider';
import RestaurantMapLocation from '@/components/Restaurant/RestaurantMapLocation';
import { getAddressFromCoords } from '@/utils/reverseGeocoding';
import { postRestaurant } from '@/api/restaurants';
import { ArrowBackIconWithoutPadding } from '@/components/Styled/HeaderIcons';
import { useTranslation } from 'react-i18next';

export default function AddRestaurant() {
	const navigation = useNavigation();
	const userId = useAuth().session?.user.id;
	const { t } = useTranslation(); 

	// Form state
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [delivery, setDelivery] = useState(false);
	const [takeOut, setTakeOut] = useState(false);
	const [reserve, setReserve] = useState(false);
	const [phone, setPhone] = useState('');
	const [webPage, setWebPage] = useState('');
	const [description, setDescription] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');

	// Horario
	const [monday, setMonday] = useState('');
	const [tuesday, setTuesday] = useState('');
	const [wednesday, setWednesday] = useState('');
	const [thursday, setThursday] = useState('');
	const [friday, setFriday] = useState('');
	const [saturday, setSaturday] = useState('');
	const [sunday, setSunday] = useState('');


	// Header personalizado
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: t('Restaurant.AddRestaurant.header'),
			headerStyle: {
				backgroundColor: theme.colors.primary,
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontSize: 20,
			},
			headerLeft: () => <ArrowBackIconWithoutPadding />
		});
	}, [navigation]);
	
	const handleSubmit = async () => {
		try {
			const lat = parseFloat(latitude);
			const lon = parseFloat(longitude);

			if (!name || !address || isNaN(lat) || isNaN(lon)) {
				Alert.alert('Faltan datos obligatorios o coordenadas inválidas');
				return;
			}

			const scheduleArray = [
				`Monday: ${monday}`,
				`Tuesday: ${tuesday}`,
				`Wednesday: ${wednesday}`,
				`Thursday: ${thursday}`,
				`Friday: ${friday}`,
				`Saturday: ${saturday}`,
				`Sunday: ${sunday}`,
			];			

			const response = await postRestaurant({
				name,
				address,
				delivery,
				take_out: takeOut,
				reserve,
				phone,
				web_page: webPage,
				description,
				latitude: lat,
				longitude: lon,
				schedule: scheduleArray, 
				proposed_by: userId, 
			});
 
			if (response) {
				Alert.alert('Restaurante añadido correctamente');
				navigation.goBack();
			}
		} catch (error) { 
			console.error(error);
			Alert.alert('Error al añadir restaurante');
		}
	};

	return ( 
		<ComponentLayout>
			<ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
				{/* Nombre */}
				<TextInput
					style={styles.input}
					placeholder={t('Restaurant.placeholder')}
					value={name}
					onChangeText={setName}
					placeholderTextColor="#9C9C9C"
				/>

				{/* El usuario selecciona la direccion en el mapa */}
				<View>
					<SectionTitle>{ t('Restaurant.AddRestaurant.direction') }</SectionTitle>
					<RestaurantMapLocation 
						restaurantLocation={{
							latitude: parseFloat(latitude) || 0,
							longitude: parseFloat(longitude) || 0,
						}}
						setRestaurantLocation={({ latitude, longitude }) => {
							setLatitude(latitude.toString());
							setLongitude(longitude.toString());
						}}
						setAddress={setAddress}
					/>
					<View>
						{address.length > 0 
							? <StyledText fontSize='medium' fontWeight='bold'>📍 {address}</StyledText>
							: <StyledText fontSize='medium' fontWeight='bold'>{ t('Restaurant.AddRestaurant.selectDirection') }</StyledText>
						}
					</View>
				</View>

				{/* Switches */}
				<View style={styles.switchGroup}>
					<SectionTitle>{ t('Restaurant.AddRestaurant.delivery') }</SectionTitle>
					<Switch value={delivery} onValueChange={setDelivery} />
				</View>
				<View style={styles.switchGroup}>
					<SectionTitle>{ t('Restaurant.AddRestaurant.takeOut') }</SectionTitle>
					<Switch value={takeOut} onValueChange={setTakeOut} />
				</View>
				<View style={styles.switchGroup}>
					<SectionTitle>{ t('Restaurant.AddRestaurant.reserve') }</SectionTitle>
					<Switch value={reserve} onValueChange={setReserve} />
				</View>

				{/* Teléfono */}
				<TextInput
					style={styles.input}
					placeholder={t('Restaurant.AddRestaurant.phonePlaceholder')}
					value={phone}
					onChangeText={setPhone}
					placeholderTextColor="#9C9C9C"
					keyboardType="phone-pad"
				/>

				{/* Página Web */}
				<TextInput
					style={styles.input}
					placeholder={t('Restaurant.AddRestaurant.webPlaceholder')}
					value={webPage}
					onChangeText={setWebPage}
					placeholderTextColor="#9C9C9C"
				/>

				{/* Descripción */}
				<SectionTitle>{t('Restaurant.AddRestaurant.description')}</SectionTitle>
				<TextInput
					style={[styles.input, styles.description]}
					placeholder={t('Restaurant.AddRestaurant.descriptionPlaceholder')}
					value={description}
					onChangeText={setDescription}
					placeholderTextColor="#9C9C9C"
					multiline
				/>

				{/* Horario */}
				<SectionTitle>{t('Restaurant.AddRestaurant.schedule')}</SectionTitle>
				<ScheduleItem day={t('Restaurant.AddRestaurant.days.Monday')} value={monday} setValue={setMonday} />
				<ScheduleItem day={t('Restaurant.AddRestaurant.days.Tuesday')} value={tuesday} setValue={setTuesday} />
				<ScheduleItem day={t('Restaurant.AddRestaurant.days.Wednesday')} value={wednesday} setValue={setWednesday} />
				<ScheduleItem day={t('Restaurant.AddRestaurant.days.Thursday')} value={thursday} setValue={setThursday} />
				<ScheduleItem day={t('Restaurant.AddRestaurant.days.Friday')} value={friday} setValue={setFriday} />
				<ScheduleItem day={t('Restaurant.AddRestaurant.days.Saturday')} value={saturday} setValue={setSaturday} />
				<ScheduleItem day={t('Restaurant.AddRestaurant.days.Sunday')} value={sunday} setValue={setSunday} />

				{/* Botón de enviar */}
				<View style={styles.submitContainer}>
					<TouchableOpacity style={styles.submit} onPress={handleSubmit}>
						<StyledText fontSize="secundary" fontWeight="bold" color="primary">
							{t('Restaurant.AddRestaurant.addRestaurant')}
						</StyledText>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</ComponentLayout>
	);
}

const ScheduleItem = ({ day, value, setValue }: any) => {
	const { t } = useTranslation(); 

	return (
		<View style={styles.scheduleItem}>
			<StyledText style={styles.scheduleDay} fontSize="medium" fontWeight="bold">
				{day}
			</StyledText>
			<TextInput
				style={styles.scheduleInput}
				value={value}
				onChangeText={setValue}
				placeholder={t('Restaurant.AddRestaurant.scheduleItemPlaceholder')}
				placeholderTextColor="#9C9C9C"
			/>
		</View>
	);
}


const styles = StyleSheet.create({
	scrollContainer: {
		paddingBottom: 65,
	},
	input: {
		color: theme.colors.white,
		backgroundColor: theme.colors.secundary,
		borderRadius: 15,
		padding: 15,
		marginBottom: 10,
		fontSize: 12,
	},
	description: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
	switchGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	submitContainer: {
		marginTop: 20,
		marginBottom: 30,
	},
	submit: {
		backgroundColor: theme.colors.green,
		borderRadius: 15,
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scheduleItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},

	scheduleDay: {
		width: 90, // Fijate si este ancho te funciona bien con tus textos
		color: theme.colors.white,
	},

	scheduleInput: {
		flex: 1,
		color: theme.colors.white,
		backgroundColor: theme.colors.secundary,
		borderRadius: 15,
		padding: 10,
		fontSize: 12,
	},

});