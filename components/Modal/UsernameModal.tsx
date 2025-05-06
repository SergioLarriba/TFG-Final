import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { ForwardedRef, useCallback, useEffect, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import theme from '@/constants/Theme';
import StyledText from '../Styled/StyledText';

export default function UsernameModal({
	onUsernameSubmit, 
	modalRef, 
} : {
	onUsernameSubmit: (username: string) => void, 
	modalRef: ForwardedRef<BottomSheetModal>,
}) {
	const [isValid, setIsValid] = useState<boolean>(false);
	const usernameRef = useRef<string>(''); 

	/* On submit */
	const handleSubmit = () => {
		const value = usernameRef.current.trim();
		if (value.length < 5 || value.length > 20) {
			setIsValid(false)
		} else {
			setIsValid(true)
			onUsernameSubmit(value)
		}
	}

	const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
		<BottomSheetBackdrop 
			{...props}
			pressBehavior={'close'} // Si toco el backdrop la modal se cierra
			appearsOnIndex={0} // En cuanto se abre la modal, se muestra el backdrop
			disappearsOnIndex={-1} // Si la modal se cierra, el backdrop desaparece
		/>
	), [])

	return (
		<BottomSheetModal
			enableDynamicSizing={false}
			snapPoints={['50%']}
			ref={modalRef}
			backdropComponent={renderBackdrop}
			enablePanDownToClose
			enableDismissOnClose
			backgroundStyle={styles.backgroundModal}
		>
			<BottomSheetView style={styles.contentContainer}>
				<StyledText fontWeight='bold' fontSize='secundary'>Introduce tu nuevo nombre de usuario: </StyledText>
				<TextInput 
					style={styles.input}
					placeholder='Nuevo nombre de usuario'
					placeholderTextColor="#999"
					autoCapitalize='words'
					autoFocus
					onSubmitEditing={handleSubmit}
					onChangeText={(text) => { usernameRef.current = text }}
				/>
				{
					!isValid && <StyledText color='red' fontWeight='bold'>Introduce un nombre entre 5 y 20 caracteres</StyledText>
				}
			</BottomSheetView>
		</BottomSheetModal>
	)
}

const styles = StyleSheet.create({
	backgroundModal: {
		backgroundColor: theme.colors.primary, 
	}, 
	contentContainer: {
		flex: 1, 
		gap: 10, 
		paddingHorizontal: 20,
		paddingBottom: 30, 
	}, 
	input: {
		backgroundColor: theme.colors.secundary, 
		borderRadius: 15, 
		padding: 10, 
		color: theme.colors.white, 
	}, 
	changeUsername: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
		backgroundColor: theme.colors.green,
    marginTop: 8,
  },
})