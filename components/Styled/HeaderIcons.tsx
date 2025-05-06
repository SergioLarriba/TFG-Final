import { StyleSheet, Pressable, View, Platform } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { useRouter, useNavigation, router, Link } from 'expo-router'
import { DrawerActions } from '@react-navigation/native';

export function DrawerIcon() {
	const navigation = useNavigation()

	return (
		<View style={styles.iconContainer}>
			<Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer()) }
				hitSlop={20}	
			>
				<Icon name="menu" size={30} color="white" />
			</Pressable>
		</View>
	) 
}

export function ProfileIcon() {
	return (
		<Pressable onPress={() => router.push('/(profile)/Profile')} style={{ paddingRight: 
			Platform.OS === 'android' ? 16 : 16, 
		 }}
		 hitSlop={20}
		>
			<Icon2 name="user-circle" size={24} color="white" />
		</Pressable>
	)
}

export function ArrowBackIcon() {
	return (
		<Pressable onPress={() => router.back()} style={{ paddingHorizontal: 
			Platform.OS === 'android' ? 16 : 16, 
		 }}
		 hitSlop={30} 
		>
			<Icon name="arrow-back" size={24} color="white" />
		</Pressable>
	)
}

export function ArrowBackIconWithoutPadding() {
	return (
		<Pressable onPress={() => router.back()} style={{ paddingRight: 
			Platform.OS === 'android' ? 16 : 0
		 }}
		 hitSlop={60} 
		>
			<Icon name="arrow-back" size={24} color="white" />
		</Pressable>
	)
}

export function AddRestaurantIcon() {
	return (
		<Pressable  
			style={{ paddingRight: 16,  }}
			onPress={() => router.push('/Restaurant/AddRestaurant')}	
			hitSlop={20}		
		>
			<Icon name="add" size={24} color="white" />
		</Pressable>
	)
}

export function AddProductIcon() {
	return (
		<Pressable 
			style={{  }}
			onPress={() => router.push('/Products/AddProduct')}	
			hitSlop={20}		
		>
			<Icon name="add" size={24} color="white" />
		</Pressable>
	)
}

export function AddRecipeIcon() {

	return (
		<Pressable 
			style={{ paddingRight: 16,  }}
			onPress={() => router.push('/Recipes/Add/AddRecipe')}			
		>
			<Icon name="add" size={24} color="white" />
		</Pressable> 
	)
}

export function MapIcon() {
	return (
		<Pressable 
			style={{ paddingRight: 16 }}
			onPress={() => router.push('/Restaurant/Map')}			
		>
			<Icon name="map-sharp" size={24} color="white" />
		</Pressable>
	)
}


const styles = StyleSheet.create({
	iconContainer: {
		paddingHorizontal: 16,
	},
	icon2Container: {
		paddingRight: 16,
	}
})