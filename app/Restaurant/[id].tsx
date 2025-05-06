import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import theme from '@/constants/Theme';
import StyledText from '@/components/Styled/StyledText';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { getRestaurantById } from '@/api/restaurants';
import { useLocation } from '@/providers/LocationProvider';
import ComponentLayout from '@/layout/ComponentLayout';
import ScheduleModal from './Details/ScheduleModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import RestaurantMap from '@/components/Restaurant/Map';
import { ArrowBackIconWithoutPadding } from '@/components/Styled/HeaderIcons';
import { useTranslation } from 'react-i18next';
import AddOpinionModal from '@/components/Modal/AddOpinionModal';


export default function Restaurant() {
  const { t } = useTranslation()
  const modalRef = useRef<BottomSheetModal>(null); 
  const modalOpinionRef = useRef<BottomSheetModal>(null); 
  const navigation = useNavigation();
  const { location } = useLocation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleShowSchedule = useCallback(() => {
    modalRef.current?.present();
  }, []); 
  const handleShowAddOpinionModal = useCallback(() => {
    modalOpinionRef.current?.present(); 
  }, [])

  /* Configuración del header */
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: t('Restaurant.headerId'),
      headerStyle: {
        backgroundColor: theme.colors.primary,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
      headerLeft: () => <ArrowBackIconWithoutPadding />
    });
  }, [navigation, restaurant]);

  // Petición para obtener datos del restaurante
  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      setError(null);
      try {
        const restaurantData = await getRestaurantById(id, location?.latitude, location?.longitude);
        if (restaurantData) {
          setRestaurant(restaurantData[0]);
        } else {
          setError('Restaurante no encontrado');
        }
      } catch (err) {
        console.error(err);
        setError('Hubo un problema al cargar el restaurante');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id, location]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{ t('Restaurant.errorId') }</Text>
      </View>
    );
  }

  return (
    <ComponentLayout>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
        {/* Nombre del restaurante */}
        <StyledText fontSize="primary" fontWeight="bold" numberOfLines={1} ellipsizeMode="tail">
          {restaurant.name}
        </StyledText>

        {/* Rating + Distancia */}
        <View style={styles.infoRow}>
          <View style={styles.distanceContainer}>
            <Icon2 name="location-sharp" size={16} color={theme.colors.orange} />
            <Text style={styles.infoText2}>{ t('Restaurant.distance2') } {restaurant.distance?.toFixed(2)} { t('Restaurant.distance') } </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#fbbc04" />
            <Text style={[styles.infoText]}>{restaurant.average_rating || 'Nuevo'}</Text>
          </View>
        </View>

        {/* Mapa */}
        <View>
          <RestaurantMap 
            name={restaurant.name}
            address={restaurant.address}
            latitude={restaurant.latitude}
            longitude={restaurant.longitude}
          />
        </View>

        {/* Tarjeta de información de contacto */}
        <View style={styles.sectionCard}>
          <StyledText fontWeight='bold' fontSize='secundary' marginBottom={10}> { t('Restaurant.contactInfo') }</StyledText>
          <RestaurantInfoItem 
            icon={<Icon2 name="location-sharp" size={20} color={theme.colors.white} />} 
            text={restaurant.address} 
          />
          <RestaurantInfoItem 
            icon={<Icon name="phone" size={20} color={theme.colors.white} />} 
            text={restaurant.phone} 
          />
          <RestaurantInfoItem 
            icon={<Icon name="web" size={20} color={theme.colors.white} />} 
            text={restaurant.web_page} 
          />
          <RestaurantInfoItem 
            icon={<Icon name="clock-outline" size={20} color={theme.colors.white} />} 
            text={t('Restaurant.schedule')}
            onPress={handleShowSchedule}
          />
        </View>

        {/* Tarjeta de características */}
        <View style={styles.sectionCard}>
          <StyledText fontWeight='bold' fontSize='secundary'> { t('Restaurant.services') } </StyledText>
          <View style={styles.servicesContainer}>
            <ServiceIndicator active={restaurant.delivery} text={t('Restaurant.AddRestaurant.services.delivery')} />
            <ServiceIndicator active={restaurant.take_out} text={t('Restaurant.AddRestaurant.services.takeOut')} />
            <ServiceIndicator active={restaurant.reserve} text={t('Restaurant.AddRestaurant.services.reserve')} />
          </View>
        </View>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.primaryButton,
              { opacity: pressed ? 0.8 : 1 }
            ]}
            onPress={() => router.push(`Restaurant/Details/RestaurantOpinion/${id}`)}
          >
            <Text style={styles.primaryButtonText}>{ t('Restaurant.opinion') }</Text>
          </Pressable>
          <Pressable 
            style={({ pressed }) => [
              styles.secondaryButton,
              { opacity: pressed ? 0.8 : 1 }
            ]}
            onPress={() => router.push(`Restaurant/Details/RestaurantReviews/${id}`)}
          >
            <Text style={styles.secondaryButtonText}>{ t('Restaurant.opinions') }</Text>
          </Pressable>
        </View>

        {/* Modal con el horario */}
        <ScheduleModal 
          schedule={restaurant.schedule}
          modalRef={modalRef}
        />
      </ScrollView>
    </ComponentLayout>
  );
}

// Componente para mostrar información básica
const RestaurantInfoItem = ({ icon, text, onPress }: any) => {
  if (!icon || !text) return null;

  return (
    <Pressable 
      style={styles.infoItemCard}
      onPress={onPress}
      android_ripple={{ color: theme.colors.primary }}
    >
      <View style={{ width: 24, alignItems: 'center' }}>
        {icon}
      </View>
      <Text style={styles.infoItemText}>{text}</Text>
      {onPress && <Icon4 name="chevron-right" size={20} color={theme.colors.white} />}
    </Pressable>
  );
};

// Componente para características (Delivery, TakeOut, etc.)
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
  // Contenedor principal
  scrollContainer: {
    justifyContent: 'flex-start',
    gap: 16,
    paddingBottom: 65,
  },
  
  // Tarjeta de información principal
  mainCard: {
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Fila de información (rating + distancia)
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  
  // Item de información (rating/distancia)
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  
  // Texto de información
  infoText: {
    color: theme.colors.stars,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },

  infoText2: {
    color: theme.colors.white,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  
  
  // Descripción
  description: {
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  
  // Tarjeta de sección
  sectionCard: {
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Título de sección
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginBottom: 12,
  },
  
  // Item de información con icono
  infoItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.25,
    borderBottomColor: theme.colors.grey,
  },
  
  // Texto de item de información
  infoItemText: {
    color: theme.colors.white,
    marginLeft: 16,
    fontSize: 14,
    flex: 1,
  },
  
  // Fila de características (delivery, takeout)
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  
  // Item de característica
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  
  // Texto de característica
  featureText: {
    color: theme.colors.white,
    marginLeft: 6,
    fontSize: 13,
  },
  
  // Contenedor de botones
  buttonContainer: {
    marginBottom: 32,
  },
  
  // Botón primario
  primaryButton: {
    backgroundColor: theme.colors.green,
    borderRadius: 20,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: theme.colors.green,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Botón secundario
  secondaryButton: {
    backgroundColor: theme.colors.secundary,
    borderWidth: 1,
    borderRadius: 20,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Texto de botón primario
  primaryButtonText: {
    color: theme.colors.secundary,
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Texto de botón secundario
  secondaryButtonText: {
    color: theme.colors.green,
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Loader
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  
  // Error
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  
  // Mensaje de error
  errorMessage: {
    color: '#d93025',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Estilos reutilizados de RestaurantItem
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 234, 2, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
  },

  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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