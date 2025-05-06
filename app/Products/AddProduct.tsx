import { StyleSheet, ScrollView, View, TextInput, Button, ActivityIndicator, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ComponentLayout from '@/layout/ComponentLayout'
import { useNavigation } from '@react-navigation/native'
import { ProfileIcon } from '@/components/Styled/HeaderIcons'
import theme from '@/constants/Theme'
import { SectionTitle } from '@/components/Assistant/Assistant'
import { useAuth } from '@/providers/AuthProvider'
/* Librerías para las imagenes del producto */
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/lib/supabase'
import { PRODUCTS_BUCKET } from '@/api/config'
import { decode } from 'base64-arraybuffer'
import { CameraIcon } from '@/components/Styled/Icons'
import BarcodeScanner from '@/components/Scanner/BarcodeScanner'

export default function AddProduct() {
	const userId = useAuth().session?.user.id; 
	const navigation = useNavigation()
	const [productName, setProductName] = useState('')
	/* Imagen del producto */
	const [image, setImage] = useState<string>('')
	const [loadingImage, setLoadingImage] = useState<boolean>(false); 

	/* Configuración del Header */
  useEffect(() => {
		navigation.setOptions({
			headerShown: true,
      headerTitle: 'Añade un producto',
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 20,
      },
		})
	}, [navigation])

	/* Escoger imagen */
	const pickImage = useCallback(async () => {
		/* El usuario escoge una imagen */
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
		})
		/* Si no cancela la selección de la imagen */
		if (!result.canceled) {
			setLoadingImage(true); 
			const img = result.assets[0]; 
			const localUri = img.uri; 
			console.log(img)
			/* Convertir la imagen a base64 */
			const base64 = await FileSystem.readAsStringAsync(localUri, {
				encoding: 'base64', 
			}); 
			/* Genero el path de la imagen */
			const filePath = `${userId}/${new Date().getTime()}.${localUri.split('.').pop()}`; 
			const contentType = img.mimeType; 
			/* Subir imagen al bucket de supabase */
			const { data, error } = await supabase
				.storage 
				.from(PRODUCTS_BUCKET)
				.upload(filePath, decode(base64), {
					contentType: contentType,
				}); 
			if (error) throw error;
			/* Descargar la imagen recien subida */
			const { data: downloadedImg, error: downloadedError } = await supabase 
        .storage
        .from(PRODUCTS_BUCKET)
        .createSignedUrl(filePath, 60 * 60 * 24 * 7* 4* 12 * 4); // La URL es válida para 4 años
      if (downloadedError) throw downloadedError;
			/* Guardar la imagen */
			if (downloadedImg?.signedUrl) {
				setImage(downloadedImg.signedUrl); 
			}
			setLoadingImage(false);
		}
	}, [])

	
	return (
		
		<ComponentLayout>
			<ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
				<BarcodeScanner />
				{/* Nombre del producto */}
				<TextInput
					style={styles.inputStyles}
					placeholder="Nombre del producto"
					placeholderTextColor="#9C9C9C"
					value={productName}
					onChangeText={setProductName}
					multiline
				/>
				{/* Marca del producto -> Autocompletado */}

				{/* Foto del producto */}
				<SectionTitle>📸 Foto del producto: </SectionTitle>
				<View style={styles.containerFoto}>
					{loadingImage 
						? <ActivityIndicator size="large" color={theme.colors.grey} />
						: 
						(
							image 
							?	<Image source={{ uri: image }} style={{ width: "100%", height: "100%", borderRadius: 20 }} />
							: <Pressable onPress={pickImage} style={styles.cameraWrapper}>
									<CameraIcon size={30} />
								</Pressable>
						) 
					}
				</View>

				<View style={styles.containerFoto}>

        </View>
			</ScrollView>
		</ComponentLayout>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
    paddingBottom: 20,
  },
	/* Input */	
	inputStyles: {
    color: theme.colors.white,
    borderRadius: 15,
    padding: 15,
    textAlignVertical: "top",
    backgroundColor: theme.colors.secundary, 
    fontSize: 12,
    marginBottom: 10,
  },
	/* Foto */
	containerFoto: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    borderRadius: 20,
    marginVertical: 15,
    backgroundColor: theme.colors.secundary,
  },
	cameraWrapper: {
    backgroundColor: theme.colors.green,
    borderRadius: 15,
    padding: 7,
  }, 
})