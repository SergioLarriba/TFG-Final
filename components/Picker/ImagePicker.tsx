import { StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { AddPhoto } from '../Styled/Icons';
import theme from '@/constants/Theme';

interface ImagePickerProps {
	image: string | null
	setImage: React.Dispatch<React.SetStateAction<string | null>>
}

export default function PickImage ({ image, setImage }: ImagePickerProps) {
	/* No se necesitan permisos para mostrar la geleria */
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'], 
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		})
		if (!result.canceled) {
			setImage(result.assets[0].uri)
		}
	}

	return (
		<TouchableOpacity
			style={{ backgroundColor: theme.colors.green, padding: 5, borderRadius: 5 }}
			onPress={pickImage}
		>
			{!image && <AddPhoto props={null}/>}	
			{image && <Image source={{ uri: image }} style={styles.image} />}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 200,
	},
})