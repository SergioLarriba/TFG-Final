import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getNearbyRestaurants, getFavouriteRestaurants, getFilteredNearByRestaurants } from '@/api/restaurants';  // Asegúrate de tener esta función
import { useLocation } from '@/providers/LocationProvider';
import ComponentLayout from '@/layout/ComponentLayout';
import theme from '@/constants/Theme';
import RestaurantItem from '@/app/Restaurant/RestaurantItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, router } from 'expo-router';
import { FiltersIcon } from '@/components/Styled/Icons';
import { ArrowBackIcon, ArrowBackIconWithoutPadding, ProfileIcon } from '@/components/Styled/HeaderIcons';
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import SearchFilters from '@/components/Restaurant/SearchFilters';
import { useUserContext } from '@/providers/UserProvider';
import FiltersModal from './FiltersModal';
import { filters } from '@/constants/Filters';
import { useTranslation } from 'react-i18next';

export default function NearByRestaurants() {
  const navigation = useNavigation(); 
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsInCommon, setRestaurantsInCommon] = useState([]);
  const { favouriteRestaurants, addToFavourite, removeFromFavourite } = useUserContext(); 
  const { location } = useLocation();
  const modalRef = useRef<BottomSheetModal>(null); 
  const { t } = useTranslation(); 

  /* Configuración del header */
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: t('Restaurant.header'),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <>
          <TouchableOpacity onPress={handleShowModal} hitSlop={60}>
            <FiltersIcon color='white' />
          </TouchableOpacity>
        </>
      ), 
      headerLeft: () => <ArrowBackIconWithoutPadding />
    });
  }, [navigation]);

  /* Restaurantes comunes entre los encontrados y los favoritos */
  useEffect(() => {
    if (restaurants) {
      const commonRestaurants = favouriteRestaurants.filter(r =>
        restaurants.some(restaurant => 
          restaurant.id === r.id
        )
      )
      setRestaurantsInCommon(commonRestaurants);
    }
  }, [favouriteRestaurants]); 

  /* Llamada a supabase para obtener los restaurantes más cercanos */
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try { 
        // Llamamos para obtener los restaurantes cercanos
        const restaurantData = await getNearbyRestaurants(location.latitude, location.longitude);
        setRestaurants(restaurantData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    }; 
    fetchRestaurants();
  }, [location]);

  /* Función que maneja la selección de filtros */
  const handleToggleFilters = (item: string) => (
    setSelectedFilters(prev => {
      const isSelected = prev.includes(item)
      const newSelection = isSelected 
        ? prev.filter(i => i !== item)
        : [...prev, item]
      return newSelection; 
    })
  )

  /* Aplico los filtros */
  const handleApplyFilters = async () => {
    if (!location) return;
  
    try {
      setLoading(true)
      const filtersIdArray = selectedFilters.map(f => filters.indexOf(f)).filter(i => i !== -1);
      const filteredData = await getFilteredNearByRestaurants(
        location.latitude,
        location.longitude,
        filtersIdArray
      );
      setRestaurants(filteredData)
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    } finally {
      modalRef.current?.dismiss();
      setLoading(false)
    }
  };
  

  const handleShowModal = useCallback(() => {
    modalRef.current?.present();
  }, []); 

  return (
    <ComponentLayout>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
        {
          loading 
            ? <ActivityIndicator size='large' color={theme.colors.green} /> 
            : (
              restaurants.map(restaurant => {
                return (
                  <RestaurantItem 
                    key={restaurant.id} 
                    restaurant={restaurant}
                  />
                );
              })
            )
        }
      </ScrollView>

      {/* Modal con los filtros */}
      <FiltersModal 
        selected={selectedFilters}
        toggleItem={handleToggleFilters}
        modalRef={modalRef}
        onApplyFilters={handleApplyFilters}
      />
    </ComponentLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'stretch',  // Aseguramos que todos los elementos ocupen el mismo ancho
    justifyContent: 'flex-start',
    gap: 16,
    paddingBottom: 100, 
  },
  restaurantItem: {
    width: '100%',  // Aquí se asegura que los items ocupen todo el ancho disponible
    marginBottom: 16,  // Espaciado entre cada elemento
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
  /* Estilos del boton de aplicar filtros */
  btn: {
    width: '80%',
    height: 40,
    backgroundColor: theme.colors.green, 
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
  },
  btnText: {
    color: theme.colors.secundary,
    fontSize: 16,
    fontFamily: 'Nunito', 
    fontWeight: '700',
  },
});
