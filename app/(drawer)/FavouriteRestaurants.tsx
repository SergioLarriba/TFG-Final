import { ActivityIndicator, StyleSheet, View, ScrollView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import theme from '@/constants/Theme';
import { ArrowBackIcon, DrawerIcon, ProfileIcon } from '@/components/Styled/HeaderIcons';
import { getFavouriteRestaurants } from '@/api/restaurants'; // Esta función se debe importar
import { useAuth } from '@/providers/AuthProvider';
import ComponentLayout from '@/layout/ComponentLayout';
import RestaurantItem from '../Restaurant/RestaurantItem';
import { Restaurant, useUserContext } from '@/providers/UserProvider';
import { useTranslation } from 'react-i18next';
import StyledText from '@/components/Styled/StyledText';


export default function FavouriteRestaurants() {
  const navigation = useNavigation();
  const { favouriteRestaurants, addToFavourite, removeFromFavourite, setFavouriteRestaurants } = useUserContext(); 
	const [loading, setLoading] = useState<boolean>(false);
  const { session: { user: { id } } } = useAuth();
  const { t } = useTranslation(); 

  // Actualización del header
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: t('Drawer.header.favourites'),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <>
          <ProfileIcon />
        </>
      ),
      headerLeft: () => (
        <>
          <DrawerIcon />
        </>
      )
    });
  }, [navigation]);

  /* Usamos useEffect para cargar los restaurantes favoritos desde Supabase */
  useEffect(() => {
    const fetchFavouriteRestaurants = async () => {
      if (!id) return;
  
      setLoading(true);
      try {
        const restaurantData = await getFavouriteRestaurants(id);
  
        setFavouriteRestaurants(restaurantData); // <-- actualizamos el contexto
      } catch (error) {
        console.log('Error fetching favourite restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFavouriteRestaurants();
  }, [id]); // solo debería depender del ID del usuario
  

  return (
    <ComponentLayout>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.green} style={{ marginTop: 20 }} />
        ) : (
          // Verificamos si hay restaurantes favoritos para renderizar
          favouriteRestaurants.length > 0 ? (
            favouriteRestaurants.map((restaurant: any) => (
              <RestaurantItem 
								key={restaurant.id} 
								restaurant={restaurant} 
								isFavourite={true}
                addToFavourite={addToFavourite}
                removeFromFavourite={removeFromFavourite}
							/>
            ))
          ) : (
            <StyledText fontSize='secundary' fontWeight='bold' marginTop={10}>
              {t('Restaurant.noFavourites')}
            </StyledText>
          )
        )}
      </ScrollView>
    </ComponentLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: 16,
    paddingBottom: 100, 
  },
});
