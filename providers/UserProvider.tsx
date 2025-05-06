import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider';
import { addFavouriteRestaurant, getFavouriteRestaurants, removeFavouriteRestaurant } from '@/api/restaurants';
import { supabase } from '@/lib/supabase';
import { set } from 'react-hook-form';

export type Restaurant = {
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

type UserContextType = {
	username: string | null;
	favouriteRestaurants: Restaurant[]; 
	addToFavourite: (restaurant: Restaurant) => void; 
	removeFromFavourite: (restaurant: Restaurant) => void;
	setFavouriteRestaurants: (restaurants: Restaurant[]) => void;
	updateUsername: (username: string) => void; 
}; 

const UserContext = createContext<UserContextType>({
	username: '',
	favouriteRestaurants: [],
	addToFavourite: () => {},
	removeFromFavourite: () => {}, 
	setFavouriteRestaurants: () => {}, 
	updateUsername: () => {}, 
})

/**
 * Propiedad que acepta nuestro provider para poder renderizar el resto de la aplicacion, 
 * ya que nuestro provider es el padre de toda la aplicacion
 */
interface Props {
	children: React.ReactNode;
}


export default function UserProvider(props: Props) {
	const [favouriteRestaurants, setFavouriteRestaurants] = useState<Restaurant[]>([])
	const { session } = useAuth(); 
	const [username, setUsername] = useState<string>('');
	const userId = session?.user.id!;

	/* Cargar nombre del usuario */
	useEffect(() => {
		const fetchUserInfo = async () => {
			const { data, error } = await supabase
				.from('users')
				.select('username')
				.eq('user_id', userId)
				.single()
			if (error) throw error; 
			return data; 
		}
		if (userId) {
			fetchUserInfo()
				.then((data) => setUsername(data.username))
				.catch((error) => console.error('Error fetching user info:', error))
		}
	}, [userId])

	const updateUsername = (username: string) => {
		setUsername(username);
	};	

	const getFavouriteRestaurantsSupabase = async () => {
		try {
			const restaurantData = await getFavouriteRestaurants(userId)
			if (restaurantData) setFavouriteRestaurants(restaurantData); 
		} catch (error) {
			console.log('Error al obtener los restaurantes favoritos:', error)
		}
	}

	useEffect(() => {
		if (userId) getFavouriteRestaurantsSupabase(); 
	}, [userId])

	/* Añadir a favoritos */
	const addToFavourite = async (restaurant: Restaurant) => {
		const exists = favouriteRestaurants.some((item) => item.id === restaurant.id)
		if (exists) return 

		setFavouriteRestaurants((prev) => [...prev, restaurant])

		try {
			await addFavouriteRestaurant(userId, restaurant.id)
		} catch (error) {
			console.log('Error al añadir a favoritos:', error) 
		}
	}

	/* Eliminar de Favoritos */
	const removeFromFavourite = async (restaurant: Restaurant) => {
		setFavouriteRestaurants((prev) => 
			prev.filter((item) => item.id !== restaurant.id)
		)

		try {
			await removeFavouriteRestaurant(userId, restaurant.id)
		} catch (error) { 
			console.log('Error al eliminar de favoritos:', error)
		}
	}
	
	return (
		<UserContext.Provider value={{
			username, 
			favouriteRestaurants, 
			addToFavourite,
			removeFromFavourite, 
			setFavouriteRestaurants, 
			updateUsername, 
		}}>
			{ props.children }
		</UserContext.Provider>
	)
}

/* Exporto el hook */
export const useUserContext = () => useContext(UserContext)