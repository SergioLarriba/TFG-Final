import { StyleSheet, Text, View } from 'react-native'
import React, { ForwardedRef, useCallback } from 'react'
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import theme from '@/constants/Theme'
import StyledText from '../Styled/StyledText'
import { useTranslation } from 'react-i18next'

export default function IngredientsModal({
	modalRef, 
} : {
	modalRef: ForwardedRef<BottomSheetModal>, 
}) {
	const { t } = useTranslation(); 

	const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
		<BottomSheetBackdrop 
			{...props}
			pressBehavior={'close'} 
			appearsOnIndex={0}
			disappearsOnIndex={-1}
		/>
	), [])


	return (
		<BottomSheetModal
			enableDynamicSizing={true}
			ref={modalRef}
			backdropComponent={renderBackdrop}
			enablePanDownToClose
			enableDismissOnClose
			backgroundStyle={styles.backgroundModal}
		>
			<BottomSheetView style={styles.contentContainer}>
				<StyledText fontSize='secundary' fontWeight='bold'>{t('Products.warning')}</StyledText>

				<StyledText fontSize='medium'>{t('Products.warningText')}</StyledText>
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
		gap: 20, 
		paddingHorizontal: 20,
		paddingBottom: 30, 
	}, 
})