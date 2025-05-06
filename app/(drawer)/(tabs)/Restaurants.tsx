import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Platform } from 'react-native'
import React from 'react'
import { SearchIcon } from '@/components/Styled/Icons'
import ComponentLayout from '@/layout/ComponentLayout'
import { router, useNavigation } from 'expo-router'
import { DrawerIcon, AddRestaurantIcon, MapIcon, ProfileIcon } from '@/components/Styled/HeaderIcons'
import theme from '@/constants/Theme'
import { useTranslation } from 'react-i18next'
import Map from '@/app/Restaurant/(map)/Map'
import StyledText from '@/components/Styled/StyledText'

export default function Restaurants() {
  const navigation = useNavigation()
  const { t } = useTranslation(); 

  /* Configuración del header */
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: Platform.OS === 'ios' ? 16 : 0, flexDirection: 'row', alignItems: 'center'}}>
          <AddRestaurantIcon />
          <ProfileIcon />
        </View>
      ), 
      headerLeft: () => (<DrawerIcon />),
    })
  }, [navigation])

	return (
		<ComponentLayout>
			{/* Buscador por nombre o por dirección */}
			<View style={styles.searchContainer}>
        <SearchIcon color={theme.colors.grey} />
        <TextInput 
          style={{ marginLeft: 10 }}
          placeholder={t('Restaurants.searchPlaceholder')}
          placeholderTextColor={theme.colors.grey}
          onPress={() => router.push(`/restaurant`)}
          // Evento que se dispara cuando se da a enter

        />
      </View>
			{/* Buscar restaurantes más cercanos */}
			<TouchableOpacity style={styles.btn} onPress={() => router.push('/Restaurant/NearByRestaurants')}>
        <Text style={styles.btnText}>{t('Restaurants.nearbyRestaurants')}</Text>
      </TouchableOpacity>
      <StyledText fontSize='primary' fontWeight='bold' marginBottom={10}>{t('Restaurants.map')}</StyledText>
      <View style={styles.map}>
        <Map />
      </View>
		</ComponentLayout>
	)
}

const styles = StyleSheet.create({
	/* Estilos del buscador */
	searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: theme.colors.secundary, 
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
  },
  /* Estilos del boton de restaurantes cercanos */
  btn: {
    width: '80%',
    height: 40,
    backgroundColor: theme.colors.green, 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
  },
  btn2: {
    width: '80%',
    height: 40,
    backgroundColor: '#00F5FE', 
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: theme.colors.secundary,
    fontSize: 16,
    fontFamily: 'Nunito', 
    fontWeight: '700',
  },
  /* Modal */
  modalBackground: {
    backgroundColor: '#121927',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  // Indicador de arrastre
  handleIndicator: {
    backgroundColor: '#FFFFFF',
    width: 80,
    height: 4,
    top: 20,
  },
  filterStyles: {
    marginTop: 16,
    marginLeft: 16,
  },
  /* Mapa */
  map: {
    flex: 1, 
    height: 300, 
    borderRadius: 15, 
    overflow: 'hidden', 
    marginBottom: 16, 
  }, 
})