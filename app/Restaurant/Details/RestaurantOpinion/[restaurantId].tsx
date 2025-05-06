import { StyleSheet, Text, View, Pressable, TextInput, Modal, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ComponentLayout from '@/layout/ComponentLayout'
import StarRating from 'react-native-star-rating-widget'
import StyledText from '@/components/Styled/StyledText';
import theme from '@/constants/Theme';
import { postRestaurantOpinion } from '@/api/restaurants';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating } from 'react-native-ratings';
import { Switch } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

export default function RestaurantOpinion() {
	const navigation = useNavigation(); 
	const { session } = useAuth();
	const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
	const [serviceRating, setServiceRating] = useState<number>(0); 
	const [environmentRating, setEnvironmentRating] = useState<number>(0);
	const [foodRating, setFoodRating] = useState<number>(0);
	const [gfOptions, setGfOptions] = useState<boolean>(true); 
	const [opinion, setOpinion] = React.useState('');
	const { t } = useTranslation(); 

	/* Configuración del header */
	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: t('Restaurant.opinion'),
			headerStyle: {
				backgroundColor: theme.colors.primary,
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontSize: 20,
				fontWeight: '600', // Slightly bolder for header
			},
		});
	}, [navigation]);

	const handleSubmit = async () => {
		try {
			const response = await postRestaurantOpinion({
				restaurant_id: Number(restaurantId), 
				user_id: session?.user.id!, 
				rating: (serviceRating + foodRating + environmentRating) / 3, 
				service_rating: serviceRating,
				food_rating: foodRating,
				ambiance_rating: environmentRating,
				review_text: opinion,
				gluten_free_options: gfOptions, 
			});
			if (response) {
				Alert.alert(t('Restaurant.opinionScreen.alertTitle'), t('Restaurant.opinionScreen.alert'))
				navigation.goBack(); 
			}
		} catch (error) {
			console.error('Error al subir la opinion:', error); 
		}
	};

	return (
		<ComponentLayout>
			<TextInput 
				style={styles.input} 
				placeholder={t('Restaurant.opinionScreen.opinionInput')}
				placeholderTextColor="#999"
				value={opinion}
				onChangeText={setOpinion}
			/>
			<RatingGroup
				label={t('Restaurant.opinionScreen.service')}
				rating={serviceRating}
				setRating={setServiceRating}
			/>
			<RatingGroup
				label={t('Restaurant.opinionScreen.ambiance')}
				rating={environmentRating}
				setRating={setEnvironmentRating}
			/>
			<RatingGroup
				label={t('Restaurant.opinionScreen.food')}
				rating={foodRating}
				setRating={setFoodRating}
			/>
			<View>
				<StyledText fontSize='secundary' fontWeight='bold'>{t('Restaurant.opinionScreen.gfOptions')}</StyledText>
				<Switch 
					value={gfOptions}
					onValueChange={() => setGfOptions(!gfOptions)}
					trackColor={{ false: theme.colors.white, true: theme.colors.green }}
					thumbColor={gfOptions ? theme.colors.green : theme.colors.white} 
				/>
			</View>
			<TouchableOpacity onPress={handleSubmit} style={styles.btn}>
				<StyledText color='primary' fontWeight='bold' fontSize='secundary'>{t('Restaurant.opinionScreen.submitOpinion')}</StyledText>
			</TouchableOpacity>
		</ComponentLayout>
	)
}

type RatingGroupProps = {
  label: string;
  rating: number;
  setRating: (rating: number) => void;
};

function RatingGroup({ label, rating, setRating }: RatingGroupProps) {
  return (
    <View style={styles.ratingGroup}>
      <Text style={styles.label}>{label}</Text>
      <Rating
				showRating
        type="custom"
        ratingCount={5}
        imageSize={25}
        startingValue={rating}
        onFinishRating={setRating}
        tintColor={theme.colors.primary}
        ratingBackgroundColor="#ccc"
        style={{ paddingVertical: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
	ratingGroup: {
    marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderColor: theme.colors.white, 
		borderWidth: 0.5, 
		borderRadius: 12, 
		paddingHorizontal: 10, 
	},
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
    marginBottom: 6,
  },
	input: {
		borderRadius: 12, 
		borderColor: theme.colors.white, 
		borderWidth: 0.5,
		height: 100, // More space for text
		textAlignVertical: 'top',
		padding: 12,
		marginBottom: 18,
		color: theme.colors.white,
		fontSize: 16, // Increased font size
	},
	btn: {
		backgroundColor: theme.colors.green, 
		padding: 10, 
		borderRadius: 12, 
		justifyContent: 'center', 
		alignItems: 'center', 
		marginTop: 8, 
	}
})

