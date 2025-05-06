import { StyleSheet, Text, View } from 'react-native'
import React, { ForwardedRef, useCallback } from 'react'
import { BottomSheetModal, BottomSheetBackdropProps, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import theme from '@/constants/Theme'
import StyledText from '@/components/Styled/StyledText'
import { useTranslation } from 'react-i18next'

export default function ScheduleModal({ 
	schedule, 
	modalRef, 
} : {
	schedule: [string], 
	modalRef: ForwardedRef<BottomSheetModal>, 
}) {
	const { t } = useTranslation(); 

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
			enableDynamicSizing={true} // La altura de la modal se ajusta dinamicamente
			ref={modalRef}
			backdropComponent={renderBackdrop}
			enablePanDownToClose
			enableDismissOnClose
			backgroundStyle={styles.backgroundModal}
		> 
			<BottomSheetView style={styles.contentContainer}>
				<StyledText fontWeight='bold' fontSize='primary'>{t('Restaurant.AddRestaurant.scheduleText')}</StyledText>
				{
					schedule.map((item, index) => (
						<View key={index}>
							<ScheduleItem text={item} />
						</View>
					))
				}
			</BottomSheetView>
		</BottomSheetModal>
	)
}

const ScheduleItem = ({ text } : { text: string }) => {
	const day = text.split(': ')[0]
	const hours = text.split(': ')[1]
	const { t } = useTranslation(); 

	return (
		<View style={styles.scheduleItem}>
			<StyledText fontWeight='bold'>{ t(`Restaurant.AddRestaurant.days.${day}`) }</StyledText>
			<StyledText>{ hours }</StyledText>
		</View>
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
	scheduleItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.secundary,
	},
})