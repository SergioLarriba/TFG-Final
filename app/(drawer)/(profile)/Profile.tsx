import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import ComponentLayout from '@/layout/ComponentLayout'
import { useAuth } from '@/providers/AuthProvider'
import theme from '@/constants/Theme'
import { useNavigation } from '@react-navigation/native'
import { ArrowBackIcon } from '@/components/Styled/HeaderIcons'
import { router } from 'expo-router'
import StyledText from '@/components/Styled/StyledText'
import { useUserContext } from '@/providers/UserProvider'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { HeartIcon, ReceipIcon, RestaurantIcon } from '@/components/Styled/Icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import UsernameModal from '@/components/Modal/UsernameModal'
import { supabase } from '@/lib/supabase'
import { useTranslation } from 'react-i18next'

export default function Profile() {
  const { session } = useAuth()
  const { username, updateUsername } = useUserContext(); 
  const navigation = useNavigation()
  const modalRef = useRef<BottomSheetModal>(null); 
  const [newUsername, setNewUsername] = useState<string>(''); 
  const { t } = useTranslation(); 

  /* Personalizar el Header */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: t('Profile.header'),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.white,
      headerLeft: () => (
        <ArrowBackIcon />
      ),
    })
  }, [navigation])

  /* Enseñar la modal para cambiar el nombre del usuario */
  const handleUsernameChange = useCallback(() => {
    modalRef.current?.present();  
  }, [])

  const handleUsernameSubmit = async (username: string) => {
    const { data, error } = await supabase
      .from('users')
      .update({ username: username })
      .eq('user_id', session?.user.id)
      .select();
  
    if (error) {
      Alert.alert('Error', t('Profile.error'));
      console.error('Error al actualizar el nombre de usuario:', error);
      return;
    }
  
    Alert.alert(t('Profile.success'), t('Profile.alertText'));
    setNewUsername(username)
    updateUsername(username)
  
    // Cerrar la modal si quieres (opcional)
    modalRef.current?.dismiss();
  };

  return (
    <ComponentLayout>
      {/* Sección de datos del usuario */}
      <View style={styles.section}>
				<StyledText fontSize='primary' fontWeight='bold' marginBottom={20}>
          {t('Profile.data')}
        </StyledText>        
        {/* Nombre de usuario */}
        <View style={styles.userItem}>
          <Ionicons name="person-outline" size={20} color={theme.colors.green} style={{ paddingRight: 10 }} />
          <StyledText fontSize='secundary' style={styles.value}>
            {newUsername || username}
          </StyledText>
        </View>
        
        {/* Correo */}
        <View style={styles.userItem}>
          <Ionicons name="mail-outline" size={20} color={theme.colors.green} style={{ paddingRight: 10 }} /> 
          <StyledText fontSize='secundary' style={styles.value}>
            {session?.user.email}
          </StyledText>
        </View>

				{/* Cambiar nombre de usuario */}
				<TouchableOpacity style={styles.changeUsername}
          onPress={handleUsernameChange}
        >
					<StyledText color='primary' fontWeight='bold'>{t('Profile.changeUsernameBtn')}</StyledText>
				</TouchableOpacity>
      </View>

      {/* Sección de preferencias */}
      <View style={styles.section}>
        <StyledText fontSize='primary' fontWeight='bold' marginBottom={20}>
          {t('Profile.preferences')}
        </StyledText>
        
        {/* Restaurantes favoritos */}
        <Btn 
          onPress={() => router.push('/FavouriteRestaurants')}
          icon={<HeartIcon size={20} color={theme.colors.white} />}
        >
          {t('Profile.favouriteRestaurants')}
        </Btn>
        
        {/* Recetas propuestas */}
        <Btn 
          onPress={() => router.push('/ProposedRecipes')}
          icon={<ReceipIcon size={20} color={theme.colors.white} />}
        >
          {t('Profile.proposedRecipes')} 
        </Btn>
        
        {/* Restaurantes propuestos */}
        <Btn 
          onPress={() => router.push('/ProposedRestaurants')}
          icon={<RestaurantIcon size={20} color={theme.colors.white} />}
        >
          {t('Profile.proposedRestaurants')}
        </Btn>
      </View>
      {/* Modal */}
      <UsernameModal 
        onUsernameSubmit={handleUsernameSubmit}
        modalRef={modalRef}
      />
    </ComponentLayout>
  )
}

interface BtnProps {
  children: React.ReactNode, 
  icon: React.ReactNode, 
  onPress: () => void, 
}

const Btn = ({ children, icon, onPress }: BtnProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { 
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }]
        }
      ]}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
    >
      <View style={styles.btnContent}>
        <View style={styles.btnLeft}>
          {icon}
          <StyledText fontWeight='bold' fontSize='secundary'>
            {children}
          </StyledText>
        </View>
        <Entypo name='chevron-right' size={20} color={theme.colors.white} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: theme.colors.green,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    color: theme.colors.green,
    paddingRight: 8,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    color: theme.colors.white,
    fontWeight: 'bold', 
  },
  changeUsername: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
		backgroundColor: theme.colors.green,
    marginTop: 8,
  },
  btn: {
    backgroundColor: theme.colors.secundary,
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  btnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
})
