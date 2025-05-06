import { supabase } from "@/lib/supabase";
import { UUIDTypes } from "uuid";

/* Obtener restaurantes sugeridos para la búsqueda */
export async function getFilteredRestaurants (searchText: string) {
	const { data, error } = await supabase 
		.from('restaurant')
		.select('*')
		.ilike('name', `%${searchText}%`)
		.limit(30)
	
	if (error) throw error;

	return data;
}

/* Obtener tipos de restaurantes */
export async function getRestaurantTypes () {
	const { data, error } = await supabase
		.from('restaurant_types')
		.select('name')
	
	if (error) throw error;

	return data; 
}

/* Obtener la distancia de un restaurante respecto al usuario */
export async function getRestaurantDistance (
	id: string, 
	latitude: number, 
	longitude: number ) {
	if (!latitude || !longitude) return 0.0; 

	// Devuelve la distancia en metros
	const { data, error } = await supabase
		.rpc('calculate_distance', {
			restaurant_id: id, 
			user_lat: latitude, 
			user_long: longitude
		}); 
	
	if (error) throw error; 
	
	return data?.distance || 0.0; 
}

/* Obtener opiniones de un restaurante */
export async function getRestaurantReviews(id: string) {
  if (!id) throw new Error('El id del restaurante no existe');

  // Obtener las reseñas del restaurante
  const { data, error } = await supabase
    .from('reviews')
    .select('id, restaurant_id, user_id, rating, service_rating, food_rating, ambiance_rating, review_text, created_at, gluten_free_options, likes, dislikes')
    .eq('restaurant_id', id);

  if (error) {
    console.error('Error al obtener las opiniones de un restaurante:', error);
    throw new Error('Error al obtener las opiniones de un restaurante');
  }

  return data;
}

/* Obtener username a partir de user_id */
export async function getUsernamesFromIds(userIds: UUIDTypes[]) {
  // Obtener los nombres de usuario para los IDs dados
  const { data, error } = await supabase
    .from('users')
    .select('user_id, username')
    .in('user_id', userIds);

  if (error) {
    console.error('Error al obtener los nombres de usuario:', error);
    throw new Error('Error al obtener los nombres de usuario');
  }

  return data;
}

/* Obtener recetas con username */
export async function getRestaurantReviewsWithUsernames(id: string) {
  if (!id) throw new Error('El id del restaurante no existe');

  // Obtener las reseñas del restaurante
  const reviews = await getRestaurantReviews(id);

  // Obtener los `usernames` de los usuarios asociados con las reseñas
  const userIds = reviews.map(review => review.user_id);
  const users = await getUsernamesFromIds(userIds);

  // Combinar las reseñas con los `usernames`
  const reviewsWithUsernames = reviews.map(review => {
    const user = users.find(u => u.user_id === review.user_id);
    return {
      ...review,
      username: user ? user.username : 'Desconocido', // Si no encontramos el usuario, asignamos un valor por defecto
    };
  });

  return reviewsWithUsernames;
}


/* Obtener restaurantes cercanos */
export async function getNearbyRestaurants(latitude: number, longitude: number) {
  if (!latitude || !longitude) throw Error('Faltan parámetros');

  try {
    const { data, error } = await supabase.rpc('get_nearby_restaurants', {
      lat: latitude,
      lng: longitude,
      max_radius: 50
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error obteniendo restaurantes:', error);
    return [];
  }
}

/* Obtener toda la información del restaurante con su id */
export async function getRestaurantById(id: string, latitude: number | undefined, longitude: number | undefined) {
	if (!id) throw new Error('Falta el id del restaurante');

	try {
		const { data, error } = await supabase.rpc('get_restaurant_by_id', {
			rest_id: id, 
			lat: latitude,
			lng: longitude,
		});
		if (error) throw error;
		return data;
	} catch (error) {
		console.error('Error obteniendo el restaurante:', error);
		return null;
	}
}

/* Obtener restaurantes filtrados */
export async function getFilteredNearByRestaurants(
  latitude: number, 
  longitude: number, 
  filtersIdArray: number[] | [0, 1, 2, 3, 4, 5]
) {
  if (!latitude || !longitude || !Array.isArray(filtersIdArray) || filtersIdArray.length === 0) {
    console.error('Faltan parámetros');
  }
  
  try {
    const formattedFilters = `{${filtersIdArray.join(',')}}`; // 🔹 Convertimos a formato PostgreSQL

    const { data, error } = await supabase.rpc('get_filtered_restaurants', {
      lat: latitude,
      lng: longitude,
      filter_types: formattedFilters  // 🔹 Enviar el array correctamente
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error obteniendo restaurantes filtrados:', error);
    return [];
  }
}

/* Publicar opinion del restaurante */
export async function postRestaurantOpinion({
  restaurant_id, 
  user_id, 
  rating=5, 
  service_rating=5, 
  food_rating=5, 
  ambiance_rating=5, 
  review_text, 
  gluten_free_options, 
} : {
  restaurant_id: number, 
  user_id: UUIDTypes, 
  rating: number, 
  service_rating: number, 
  food_rating: number, 
  ambiance_rating: number, 
  review_text: string, 
  gluten_free_options: boolean,
}) {
  if (!restaurant_id || !user_id) {
    console.log(restaurant_id, user_id);
    throw new Error('Faltan parámetros');
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([
      { restaurant_id: restaurant_id, 
        user_id: user_id, 
        rating: rating, 
        service_rating: service_rating || 5, 
        food_rating: food_rating || 5, 
        ambiance_rating: ambiance_rating || 5, 
        review_text: review_text || '', 
        gluten_free_options: gluten_free_options
      }
    ])
    .select();

  if (error) throw error;

  return data;
}

/* Subir restaurante a favoritos */
export async function addFavouriteRestaurant(user_id: string, restaurant_id: string) {
  if (!user_id || !restaurant_id) throw new Error('Faltan parámetros');

  const { data, error } = await supabase
    .from('favourite_restaurants')
    .insert([
      { user_id: user_id, restaurant_id: restaurant_id }
    ]);

  if (error) throw error;

  return data;
}

/* Eliminar restaurante de favoritos */
export async function removeFavouriteRestaurant(user_id: string, restaurant_id: string) {
  if (!user_id || !restaurant_id) throw new Error('Faltan parámetros');

  const { data, error } = await supabase
    .from('favourite_restaurants')
    .delete()
    .match({ user_id: user_id, restaurant_id: restaurant_id });

  if (error) throw error;

  return data;
}

/* Obtener restaurantes favoritos con todos sus datos */
export async function getFavouriteRestaurants(user_id: string) {
  if (!user_id) throw new Error('Faltan parámetros');

  const { data, error } = await supabase
    .from('favourite_restaurants')
    .select('restaurant(*)') // JOIN con todos los datos de la tabla restaurant
    .eq('user_id', user_id);

  if (error) throw error;

  // Devuelves solo el array de restaurantes
  return data.map(item => item.restaurant);
}

/* Añadir restaurante */
export async function postRestaurant({
  name, 
  address, 
  delivery, 
  take_out, 
  reserve, 
  phone, 
  web_page, 
  description, 
  latitude, 
  longitude,
  schedule, 
  proposed_by, 
} : {
  name: string,
  address: string,
  delivery: boolean,
  take_out: boolean,
  reserve: boolean,
  phone: string,
  web_page: string,
  description: string,
  latitude: number,
  longitude: number,
  schedule: string[], 
  proposed_by: string | undefined, 
}) {
  if (!name || !address || !latitude || !longitude) throw new Error('Faltan parámetros');

  const { data, error } = await supabase
    .from('restaurant')
    .insert([
      { name, address, delivery, take_out, reserve, phone, web_page, description, latitude, longitude, schedule, proposed_by }
    ])
    .select();

  if (error) throw error;

  return data;
}

/* Obtener los restaurantes propuestos por el usuario */
export async function getProposedRestaurantsByUserId({
  userId
} : {
  userId: string | undefined, 
}) {
  if (!userId) throw new Error('Faltan parámetros'); 

  const { data, error } = await supabase 
    .from('restaurant')
    .select('*')
    .eq('proposed_by', userId)
  
  if (error) throw error; 

  return data; 
}