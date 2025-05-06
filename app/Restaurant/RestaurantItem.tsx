import { StyleSheet, View, TouchableOpacity, Animated, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import theme from '@/constants/Theme';
import StyledText from '@/components/Styled/StyledText';
import { FilledHeartIcon, HeartIcon, HeartIconOutline, LocationIcon, StarIcon } from '@/components/Styled/Icons';
import { useRouter } from 'expo-router';
import { useUserContext } from '@/providers/UserProvider';
import { useAuth } from '@/providers/AuthProvider';
import { Restaurant } from '@/providers/UserProvider';
import { addFavouriteRestaurant, removeFavouriteRestaurant } from '@/api/restaurants';
import { set } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RestaurantItemProps {
  restaurant: {
    address: string;
    average_rating: number;
    delivery: boolean;
    description: string;
    distance: number;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    phone: string;
    reserve: boolean;
    schedule: string[];
    take_out: boolean;
    web_page: string;
  };
}

export default function RestaurantItem({ restaurant }: RestaurantItemProps) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { session: { user: { id } } } = useAuth(); 
  const { favouriteRestaurants, addToFavourite, removeFromFavourite } = useUserContext();
  const [isPressed, setIsPressed] = useState(favouriteRestaurants.some(item => item.id === restaurant.id));
  const { t } = useTranslation(); 

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleToggleFavourite = async () => {
    if (!id) return; 

    try {
      if (isPressed) {
        removeFromFavourite(restaurant); 
        setIsPressed(false);
        Alert.alert('', t('Restaurant.AddRestaurant.removeFavourites'))
      } else {
        addToFavourite(restaurant);
        setIsPressed(true);
        Alert.alert('', t('Restaurant.AddRestaurant.favourites'))
      }
    } catch (error) {
      console.error('Error al añadir/eliminar favorito:', error);
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.restaurantItem}
        onPress={() => router.push(`/Restaurant/${restaurant.id}`)}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* Header with name and rating */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <StyledText fontSize="secundary" fontWeight="bold" numberOfLines={1} ellipsizeMode="tail">
              {restaurant.name}
            </StyledText>
          </View>
          
          <View style={styles.ratingContainer}>
            <StarIcon size={16} color={theme.colors.stars} />
            <StyledText color="yellow" fontWeight="bold" paddingLeft={4}>
              {restaurant.average_rating || 'Nuevo'}
            </StyledText>
          </View>
        </View>

        {/* Address */}
        <StyledText
          fontSize="medium"
          color="grey"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {restaurant.address}
        </StyledText>

        {/* Footer with distance and favourite button */}
        <View style={styles.footer}>
          <View style={styles.distanceContainer}>
            {
              restaurant.distance && 
              <>
                <LocationIcon size={20} color={theme.colors.orange} />
                <StyledText fontSize="medium" paddingLeft={6}>
                  {restaurant.distance.toFixed(2)} km
                </StyledText>
              </>
            }
          </View>
        </View>

        {/* Services indicators */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={styles.servicesContainer}>
            <ServiceIndicator active={restaurant.delivery} text='🚚' />
            <ServiceIndicator active={restaurant.take_out} text='🥡' />
            <ServiceIndicator active={restaurant.reserve} text='📅' />
          </View>

          {/* Añadir favorito */}
          <TouchableOpacity onPress={handleToggleFavourite} style={styles.favouriteButton} activeOpacity={0.7}>
            {isPressed ? (
              <FilledHeartIcon size={24} color={theme.colors.red} />
            ) : (
              <HeartIconOutline size={24} color={theme.colors.red} />
            )}
          </TouchableOpacity>
        </View>
        

        
      </TouchableOpacity>
    </Animated.View>
  );
}

const ServiceIndicator = ({ active, text }: { active: boolean; text: string }) => (
  <View
    style={[
      styles.serviceIndicator,
      {
        backgroundColor: active ? 'rgba(0, 254, 135, 0.2)' : 'rgba(255, 255, 255, 0.1)',
      },
    ]}
  >
    <StyledText color={active ? 'green' : 'grey'}>{text}</StyledText>
  </View>
);

const styles = StyleSheet.create({
  restaurantItem: {
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: theme.colors.green,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',  // Permite que los elementos se ajusten si no caben
  },
  headerTextContainer: {
    flex: 1,  // Hace que el nombre del restaurante ocupe el espacio disponible
    paddingRight: 8,  // Asegura que haya espacio entre el nombre y la calificación
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 234, 2, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favouriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  servicesContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  serviceIndicator: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
