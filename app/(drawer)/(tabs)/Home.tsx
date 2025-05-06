import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router';
import theme from '@/constants/Theme';
import { ProfileIcon, DrawerIcon } from '@/components/Styled/HeaderIcons';
import { useAuth } from '@/providers/AuthProvider';
import { useLocation } from '@/providers/LocationProvider';
import ComponentLayout from '@/layout/ComponentLayout';
import StyledText from '@/components/Styled/StyledText';
import { Entypo } from '@expo/vector-icons';
import { Pressable, ScrollView, TextInput } from 'react-native-gesture-handler';
import { getRecipes } from '@/api/recipes';
import { Recipe } from '@/api/types';
import HomeRecipesItem from '@/components/Home/Items/HomeRecipesItem';
import AssistantItem from '@/components/Home/Items/AssistantItem';
import { AssistantImgs } from '@/assets/Imgs';
import Map from '@/app/Restaurant/(map)/Map';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from '@/components/Styled/Icons';
import { useUserContext } from '@/providers/UserProvider';

export default function HomeTab() {
  const { t } = useTranslation(); 
	const navigation = useNavigation()
  const { session, loading } = useAuth();
  const { location, getCurrentLocation } = useLocation();
  const [recipes, setRecipes] = useState<Recipe[]>([]); 
  const { username } = useUserContext(); 
  
  /* Configuración del header */
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Free Glu', 
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.green,
        letterSpacing: 1,
        borderWidth: 1, 
        borderColor: theme.colors.green, 
        borderRadius: 5, 
        padding: 5,
      }, 
      headerTitleAlign: 'center', 
      headerRight: () => (
        <View style={{ paddingRight: Platform.OS === 'ios' ? 16 : 0, flexDirection: 'row', alignItems: 'center'}}>
          <ProfileIcon />
        </View>
      ),
      headerLeft: () => (<DrawerIcon />),
    });
  }, [session]);

  /* Obtener recetas */
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getRecipes(); 
        if (recipesData) setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    if (session) fetchRecipes();
  }, [recipes]); 

  /* Pedir acceso a la ubicacion */
  useEffect(() => {
    getCurrentLocation(); // Solo una vez cuando se monta
  }, []);
  

	return (
		<ComponentLayout>
      <ScrollView 
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
        {/* Buscador de restaurantes */}
        <TouchableOpacity onPress={() => router.push('/restaurant')}>
          <View style={styles.searchContainer}>
            <SearchIcon color={theme.colors.grey} />
            <StyledText color='grey' fontSize='medium' marginLeft={10}>{t('Home.restaurantPlaceholder')}</StyledText>
          </View>
        </TouchableOpacity>

        {/* Restaurantes + Mapa */}
        <View style={styles.headerContainer}>
          <StyledText fontWeight='bold' fontSize='primary'>{t('Home.restaurants')}</StyledText>
          <Pressable onPress={() => router.replace('/(drawer)/(tabs)/Restaurants')} style={styles.iconContainer}>
            <Entypo name="chevron-right" size={20} color="white" />
          </Pressable>
        </View>
        
        <View style={styles.map}>
          { location 
            ? <Map /> 
            : <View style={{ flex: 1, borderRadius: 15, backgroundColor: theme.colors.secundary }}>
                <StyledText fontSize='medium' fontWeight='bold'>{t('Home.noLocation')}</StyledText>
              </View>
          }
        </View>

        {/* Asistente */} 
        <View style={styles.headerContainer2}>
          <StyledText fontWeight='bold' fontSize='primary'>{t('Home.assistant')}</StyledText>
          <Pressable onPress={() => router.replace('/(drawer)/(tabs)/Assistant')} style={styles.iconContainer}>
            <Entypo name="chevron-right" size={20} color="white" />
          </Pressable>
        </View>
        {/* Scroll View Horizontal con los asistentes */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollStyles}
        >
          <AssistantItem  
						text='Sugerencias sobre recetas sin gluten' 
            goTo='AssistantRecipes/AssistantRecipes' 
            imgSrc={AssistantImgs.Recipes} 
					/>
					<AssistantItem 
						text='Respuestas frecuentes sobre la dieta sin gluten' 
            goTo='AssistantFyQ/AssistantFyQ' 
            imgSrc={AssistantImgs.FyQ} 
					/>
					<AssistantItem 
						text='Recomendaciones personalizadas según tus preferencias alimenticias' 
            goTo='AssistantFR/AssistantFR' 
            imgSrc={AssistantImgs.Recs} 
					/>
					<AssistantItem 
						text='Ayuda para planificar menús sin gluten' 
            goTo='AssistantMenus/AssistantMenus' 
            imgSrc={AssistantImgs.Menus} 
					/>
        </ScrollView>

        {/* Recetas */}
        <View style={styles.headerContainer2}>
          <StyledText fontWeight='bold' fontSize='primary'>{t('Home.recipes')}</StyledText>
          <Pressable onPress={() => router.replace('/(drawer)/(tabs)/Recipes')} style={styles.iconContainer}>
            <Entypo name="chevron-right" size={20} color="white" />
          </Pressable>
        </View>
        {/* Scroll View Horizontal con las recetas */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollStyles}
        >
          { 
            recipes.map((recipe, index) => (
              <HomeRecipesItem key={index} recipe={recipe}/>
            ))
          }
        </ScrollView> 
      </ScrollView> 
    </ComponentLayout>
	)
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, 
  }, 
  headerContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  }, 
  map: {
    flex: 1, 
    height: 300, 
    borderRadius: 15, 
    overflow: 'hidden', 
  }, 
  iconContainer: {
    backgroundColor: theme.colors.secundary,
    borderRadius: 20,
    padding: 5,
  }, 
  restaurantItem: {
    width: '100%',  // Aquí se asegura que los items ocupen todo el ancho disponible
    marginRight: 16,  // Espaciado entre cada elemento
  },
  horizontalScrollStyles: {
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    gap: 20
  }, 
  /* Estilos del buscador */
	searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: theme.colors.secundary, 
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
    marginBottom: 16, 
  },
}) 
