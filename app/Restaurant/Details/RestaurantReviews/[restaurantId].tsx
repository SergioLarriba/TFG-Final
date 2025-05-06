import { ActivityIndicator, StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getRestaurantReviewsWithUsernames } from '@/api/restaurants';
import ComponentLayout from '@/layout/ComponentLayout';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '@/constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StyledText from '@/components/Styled/StyledText';
import { ProfileIcon } from '@/components/Styled/HeaderIcons';

export default function RestaurantReviews() {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const [reviews, setReviews] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
	const navigation = useNavigation(); 

	/* Configuración del header */
	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: 'Opiniones',
			headerStyle: {
				backgroundColor: theme.colors.primary,
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontSize: 20,
				fontWeight: '600', // Slightly bolder for header
			},
			headerRight: () => (
        <>
          <ProfileIcon />
        </>
      ), 
		});
	}, [navigation]);


  /* Obtengo las reviews del restaurante */
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await getRestaurantReviewsWithUsernames(restaurantId);
        if (response) setReviews(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [restaurantId]);

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
          <ActivityIndicator size="large" color={theme.colors.green} />
        ) : (
          reviews.length > 0 
						?	reviews.map((item, index) => (
            		<Review key={index} {...item} />
          		))
						: <StyledText>No hay reseñas de momento para este restaurante</StyledText>
        )}
      </ScrollView>
    </ComponentLayout>
  );
}

const Review = ({
  username,
  rating,
  service_rating,
  food_rating,
  ambiance_rating,
  review_text,
  gluten_free_options,
  created_at,
  likes,
  dislikes, 
}: any) => {
  return (
    <View style={styles.review}>
      {/* Encabezado con usuario y rating */}
      <View style={styles.userNR}>
        <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
          {username}
        </Text>
        <View style={styles.ratingContainer2}>
          <Icon name="star" size={16} color="#fbbc04" />
          <Text style={styles.infoText}>{rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* Fecha */}
      <Text style={styles.createdAt}>
        {new Date(created_at).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </Text>

      {/* Ratings específicos */}
      <View style={styles.ratingContainer}>
        <View style={styles.ratingItem}>
          <Text style={styles.ratingLabel}>Servicio</Text>
          <Text style={styles.ratingValue}>{service_rating.toFixed(1)}</Text>
        </View>
        <View style={styles.ratingItem}>
          <Text style={styles.ratingLabel}>Comida</Text>
          <Text style={styles.ratingValue}>{food_rating.toFixed(1)}</Text>
        </View>
        <View style={styles.ratingItem}>
          <Text style={styles.ratingLabel}>Ambiente</Text>
          <Text style={styles.ratingValue}>{ambiance_rating.toFixed(1)}</Text>
        </View>
      </View>

      {/* Opciones sin gluten */}
      <View style={[
        styles.gfOptions,
        !gluten_free_options && styles.gfOptionsNegative
      ]}>
        {gluten_free_options ? (
          <>
            <Icon name="check-circle" size={20} color={theme.colors.green} />
            <Text style={styles.gfText}>Menú exclusivo para celiacos disponible</Text>
          </>
        ) : (
          <>
            <Icon name="close-circle" size={20} color={theme.colors.red} />
            <Text style={styles.gfText}>No hay menú exclusivo para celiacos</Text>
          </>
        )}
      </View>

      {/* Texto de la reseña */}
      <Text style={styles.reviewText}>{review_text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'stretch',  // Aseguramos que todos los elementos ocupen el mismo ancho
    justifyContent: 'flex-start',
    gap: 16,
    paddingBottom: 100, 
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  review: {
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
    marginBottom: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userNR: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    paddingBottom: 8,
  },
  username: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.secondary,
    color: theme.colors.white,
    flex: 1,
  },
  rating: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.white,
    fontWeight: 'bold',
    backgroundColor: '#fbbc04',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  ratingItem: {
    alignItems: 'center',
    flex: 1,
  },
  ratingLabel: {
    fontSize: theme.fontSizes.subHeading,
    color: theme.colors.grey,
    marginBottom: 4,
  },
  ratingValue: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  createdAt: {
    fontSize: theme.fontSizes.subHeading,
    color: theme.colors.grey,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  gfOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 254, 135, 0.1)',
    borderRadius: 8,
  },
  gfOptionsNegative: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
  gfText: {
    paddingLeft: 8,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.white,
  },
  reviewText: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.white,
    lineHeight: 22,
    marginVertical: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  likesDislikes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
  },
  likesDislikesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  likesDislikesText: {
    fontSize: theme.fontSizes.medium,
    marginRight: 6,
    fontWeight: theme.fontWeight.bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  ratingContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 234, 2, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
  },
  infoText: {
    color: theme.colors.stars,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});

