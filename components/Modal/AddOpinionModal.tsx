import theme from '@/constants/Theme';
import {
  BottomSheetModal,
  BottomSheetView,
	BottomSheetTextInput
} from '@gorhom/bottom-sheet';
import React, { ForwardedRef, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import StyledText from '../Styled/StyledText';
import { Switch } from 'react-native-gesture-handler';
import { postRestaurantOpinion } from '@/api/restaurants';
import { useAuth } from '@/providers/AuthProvider';

export default function AddOpinionModal({
  modalRef,
  restaurantId,
}: {
  modalRef: ForwardedRef<BottomSheetModal>;
  restaurantId: string;
}) {
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [environmentRating, setEnvironmentRating] = useState<number>(0);
  const [foodRating, setFoodRating] = useState<number>(0);
  const [gfOptions, setGfOptions] = useState<boolean>(false);
  const [opinion, setOpinion] = useState<string>('');
	const { session } = useAuth();

	const handleSubmit = async () => {
		try {
			const response = await postRestaurantOpinion({
				restaurant_id: Number(restaurantId), 
				user_id: session?.user.id!, 
				rating: 5, 
				service_rating: serviceRating,
				food_rating: foodRating,
				ambiance_rating: environmentRating,
				review_text: opinion,
				gluten_free_options: gfOptions, 
			});
			if (response) {
				Alert.alert('✅', 'Opinión subida correctamente')
			}
		} catch (error) {
			console.error('Error al subir la opinion:', error); 
		}
	};

  return (
    <BottomSheetModal
      ref={modalRef}
      enablePanDownToClose
      enableDismissOnClose
      backgroundStyle={styles.modalBackground}
    >
      <BottomSheetView style={styles.modalContainer}>
				<TextInput 
					style={styles.input} 
					placeholder="Introduce tu opinión"
					placeholderTextColor="#999"
					value={opinion}
					onChangeText={setOpinion}
				/>
        <RatingGroup
          label="Servicio"
          rating={serviceRating}
          setRating={setServiceRating}
        />
        <RatingGroup
          label="Ambiente"
          rating={environmentRating}
          setRating={setEnvironmentRating}
        />
        <RatingGroup
          label="Comida"
          rating={foodRating}
          setRating={setFoodRating}
        />
				<View>
					<StyledText fontSize='secundary' fontWeight='bold'>¿Disponen de un menú exclusivamente para celíacos?</StyledText>
					<Switch 
						value={gfOptions}
						onValueChange={() => setGfOptions(!gfOptions)}
						trackColor={{ false: theme.colors.white, true: theme.colors.green }}
						thumbColor={gfOptions ? theme.colors.green : theme.colors.white} 
					/>
				</View>
				<TouchableOpacity onPress={handleSubmit} style={styles.btn}>
					<StyledText color='primary' fontWeight='bold' fontSize='secundary'>Subir opinión</StyledText>
				</TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
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
  modalBackground: {
    backgroundColor: theme.colors.primary,
  },
  modalContainer: {
    padding: 16,
  },
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
});
