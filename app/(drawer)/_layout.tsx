import { StyleSheet, Image, View, Text } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { HomeIcon, HomeIconOutline, HeartIcon, HeartIconOutline, PersonIcon, PersonIconOutline, SettingsIcon, SettingsIconOutline, MailIcon, MailIconOutline, LogOutIcon, LogOutIconOutline } from '@/components/Styled/Icons';
import theme from '@/constants/Theme';
import { supabase } from '@/lib/supabase';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/providers/AuthProvider';
import { useUserContext } from '@/providers/UserProvider';


const CustomDrawerComponent = (props: any) => {
	const router = useRouter()
	const pathName = usePathname()
	const { t } = useTranslation(); 
	const { session } = useAuth(); 
	const { username } = useUserContext(); 

	/* LogOut */
	const logout = () => {
		supabase.auth.signOut()
	}

	/* Si estoy en la pantalla actual, el color del elemento del drawer cambia */


	return (
		<DrawerContentScrollView
			style={styles.drawerContent}
		>
			{/* Información del usuario */}
			<View style={styles.userInfoWrapper}>
				<View style={styles.userDetailsWrapper}>
					<Text style={styles.userName}>{ username } 👋</Text>
					<Text style={styles.userEmail}>{ session?.user.email }</Text>
				</View>
			</View>
			{/* Inicio */}
			<DrawerItem 
				label={t('Drawer.home')}
				onPress={() => router.push('/(drawer)/(tabs)/Home')}
				icon={({ color, size }) => 
					pathName === '/Home'
						? <HomeIcon color={theme.colors.green} size={24} />
						: <HomeIconOutline color={theme.colors.white} size={24} />
				}
				labelStyle={{ color: pathName === "/Home" ? theme.colors.green : theme.colors.white }}
				style={{ backgroundColor: pathName === "/Home" ? theme.colors.secundary : theme.colors.primary }}
			/>
			{/* Restaurantes favoritos */}
			<DrawerItem
				label={t('Drawer.favourites')} 
				onPress={() => router.push('/FavouriteRestaurants')}
				icon={({ color, size }) => 
					pathName === '/FavouriteRestaurants'
						? <HeartIcon color={theme.colors.green} size={24} />
						: <HeartIconOutline color={theme.colors.white} size={24} />
				}
				labelStyle={{ color: pathName === "/FavouriteRestaurants" ? theme.colors.green : theme.colors.white }}
				style={{ backgroundColor: pathName === "/FavouriteRestaurants" ? theme.colors.secundary : theme.colors.primary }}
			/>
			{/* Perfil */}
			<DrawerItem
				label={t('Drawer.profile')}
				onPress={() => router.push('/Profile')}
				icon={({ color, size }) => pathName === '/Profile'
					? <PersonIcon color={theme.colors.green} size={24} />
					: <PersonIconOutline color={theme.colors.white} size={24} />
				}
				labelStyle={{ color: pathName === "/Profile" ? theme.colors.green : theme.colors.white }}
				style={{ backgroundColor: pathName === "/Profile" ? theme.colors.secundary : theme.colors.primary }}
			/>
			{/* Configuración */}
			<DrawerItem
				label={t('Drawer.settings')}
				onPress={() => router.push('/Settings')}
				icon={({ color, size }) => pathName === '/Settings'
					? <SettingsIcon color={theme.colors.green} size={24} />
					: <SettingsIconOutline color={theme.colors.white} size={24} />
				}
				labelStyle={{ color: pathName === "/Settings" ? theme.colors.green : theme.colors.white }}
				style={{ backgroundColor: pathName === "/Settings" ? theme.colors.secundary : theme.colors.primary }}
			/>
			{/* Contáctanos */}
			<DrawerItem
				label={t('Drawer.contactUs')}
				onPress={() => router.push('/ContactUs')}
				icon={({ color, size }) => pathName === '/ContactUs'
					? <MailIcon color={theme.colors.green} size={24} />
					: <MailIconOutline color={theme.colors.white} size={24} />
				}
				labelStyle={{ color: pathName === "/ContactUs" ? theme.colors.green : theme.colors.white }}
				style={{ backgroundColor: pathName === "/ContactUs" ? theme.colors.secundary : theme.colors.primary }}
			/>
			{/* LogOut */}
			<DrawerItem 
				label={t('Drawer.logOut')}
				labelStyle={{ color: theme.colors.white }}
				icon={({ color, size }) => <LogOutIconOutline color={theme.colors.white} size={24} />}
				onPress={logout}
			/>
		</DrawerContentScrollView> 
	) 
}

export default function DrawerLayout() {
	return (
		<Drawer 
			drawerContent={(props) => <CustomDrawerComponent {...props} />} 
			screenOptions={{ 
				headerShown: false, 
			}}
		/>
	)
}

const styles = StyleSheet.create({
	userInfoWrapper: {
		flexDirection: 'row',
		paddingHorizontal: 10, 
		paddingVertical: 20, 
		borderBlockColor: theme.colors.grey,
		borderBottomWidth: 0.2, 
		marginBottom: 10, 
	},
	userImg: {
		borderRadius: 40,
	}, 
	userDetailsWrapper: {
		marginLeft: 10, 
	},
	userName: {
		fontSize: 18, 
		fontWeight: 'bold', 
		color: theme.colors.white,
		paddingBottom: 5,
	}, 
	userEmail: {
		fontSize: 12,
		fontStyle: 'italic',
		textDecorationLine: 'underline',
		color: theme.colors.white,
	},
	/* Drawer */
	drawerContent: {
		backgroundColor: theme.colors.primary,
	}, 
}) 