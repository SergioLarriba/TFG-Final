import { Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { ForwardedRef, useCallback } from 'react'
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import theme from '@/constants/Theme'
import StyledText from '@/components/Styled/StyledText'
import { filters, filters_en } from '@/constants/Filters'
import i18n from '@/i18n'

export default function FiltersModal({
	selected, 
	toggleItem, 
	modalRef,
	onApplyFilters,
} : {
	selected: string[], 
	toggleItem: (item: string) => void, 
	modalRef: ForwardedRef<BottomSheetModal>,
	onApplyFilters: () => void 
}) {

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
				<StyledText fontWeight='bold' fontSize='primary'>Filtros</StyledText>
				{
					i18n.language === 'es' 
						? filters.map((filter, index) => {
								const isChecked = selected.includes(filter)
								return (
									<TouchableOpacity
										key={index}
										onPress={() => toggleItem(filter)}
										style={[styles.option, isChecked && styles.optionChecked]}
									>
										<Text style={styles.optionText}>
											{isChecked ? '✅ ' : '⬜ '} {filter}
										</Text>
									</TouchableOpacity>
								)
							})
						: filters_en.map((filter, index) => {
							const isChecked = selected.includes(filter)
							return (
								<TouchableOpacity
									key={index}
									onPress={() => toggleItem(filter)}
									style={[styles.option, isChecked && styles.optionChecked]}
								>
									<Text style={styles.optionText}>
										{isChecked ? '✅ ' : '⬜ '} {filter}
									</Text>
								</TouchableOpacity>
							)
						})
				}

				{/* Botón para aplicar los filtros */}
				<Pressable style={styles.applyButton} onPress={onApplyFilters}>
					<Text style={styles.applyText}>Aplicar filtros</Text>
				</Pressable>
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
	option: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 6,
    borderColor: theme.colors.white, 
    backgroundColor: theme.colors.secundary,
    borderWidth: 0.5, 
  },
  optionChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.green
  },
  optionText: {
    color: theme.colors.white,
    fontSize: 14,
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: theme.colors.green,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
