import { Pressable, StyleSheet, Image, View, Modal, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React, { useCallback, useLayoutEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import ComponentLayout from '@/layout/ComponentLayout'
import Icon from 'react-native-vector-icons/Ionicons';
import StyledText from '@/components/Styled/StyledText'
import { IngrImgs } from '@/assets/Imgs'
import theme from '@/constants/Theme'
import { ScrollView } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next';
import { getIconByCategory } from '@/components/Styled/IngredientIcons';
import { Entypo } from '@expo/vector-icons';
import IngredientsModal from '@/components/Modal/IngredientsModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SearchIcon } from '@/components/Styled/Icons';


export default function Ingredients() {
	const navigation = useNavigation()
	const [modalVisible, setModalVisible] = React.useState(false)
	const { t } = useTranslation(); 
	const modalRef = useRef<BottomSheetModal>(null); 

	/* Personalizar el Header */
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: t('Products.ingrHeader'),
			headerStyle: {
				backgroundColor: theme.colors.primary,
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontSize: 20,
			},
			headerRight: () => (
				<>
					<TouchableOpacity onPress={handleShowModal}>
            <Icon name="warning" size={24} color={theme.colors.stars} />
          </TouchableOpacity> 
				</>
			)
		}) 
	}, [navigation])

	const handleShowModal = useCallback(() => {
    modalRef.current?.present();
  }, []); 
 
	return (
		<ComponentLayout>
			{/* Buscador de ingredientes */}
			<TouchableOpacity onPress={() => router.push('/ingredient')}>
				<View style={styles.searchContainer}>
					<SearchIcon color={theme.colors.grey} />
					<StyledText color='grey' fontSize='medium' marginLeft={10}>{t('Products.searchIngredientsPlaceholder')}</StyledText>
				</View>
			</TouchableOpacity>

			<StyledText fontSize='primary' fontWeight='bold' marginBottom={8}>{t('Products.categoriesText')}</StyledText>
			<FilterItem 
				category={t('Products.categories.grains')}
				categoryId={1}
			/>
			<FilterItem 
				category={t('Products.categories.legumes')}
				categoryId={2}
			/>
			<FilterItem 
				category={t('Products.categories.vegetables')}
				categoryId={3}
			/>
			<FilterItem 
				category={t('Products.categories.lactose')}
				categoryId={4}
			/>
			<FilterItem 
				category={t('Products.categories.meat')}
				categoryId={5}
			/>
			<FilterItem 
				category={t('Products.categories.oil')}
				categoryId={6}
			/>
			<FilterItem 
				category={t('Products.categories.species')}
				categoryId={7}
			/>
			<FilterItem 
				category={t('Products.categories.others')}
				categoryId={8}
			/>
			{/* Modal */}
			<IngredientsModal modalRef={modalRef}/>
		</ComponentLayout>
	)
}

function FilterItem ({category, categoryId}: {category: string, categoryId: number}) {
	if (!category || !categoryId) return; 

	return (
		<TouchableOpacity 
			style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.secundary, marginVertical: 8, padding: 10, borderRadius: 12}}
			onPress={() => router.push(`/Products/Ingredients/${categoryId}`)}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
				{getIconByCategory(categoryId)}
				<StyledText fontWeight='bold' fontSize='medium' >{ category }</StyledText>
			</View>
			<Entypo name='chevron-right' size={24} color='white'/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	/* Warning Modal */
	btnText: {
    color: '#262D3C',
    fontSize: 19,
    fontFamily: 'Nunito', 
    fontWeight: '700',
  },
  btn: {
    width: '80%',
    height: 40,
    backgroundColor: '#00FE87',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
		paddingHorizontal: 10,
  },
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	modalView: {
		margin: 20,
		backgroundColor: theme.colors.secundary,
		borderRadius: 15,
		padding: 20,
		alignItems: 'center',
	},
	/* Estilos del buscador */
	searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: theme.colors.secundary, 
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
    marginBottom: 16, 
  },
});