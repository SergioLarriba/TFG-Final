import { StyleSheet, Text, View, Image, ImageSourcePropType, Platform } from 'react-native'
import React from 'react'
import ComponentLayout from '@/layout/ComponentLayout'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { Link, useNavigation } from 'expo-router'
import StyledText from '@/components/Styled/StyledText'
import theme from '@/constants/Theme'
import { AssistantImgs } from '@/assets/Imgs'
import { ProfileIcon, DrawerIcon } from '@/components/Styled/HeaderIcons'
import { useTranslation } from 'react-i18next'

export default function AssistantTab() {
	const { t } = useTranslation(); 
	const navigation = useNavigation()
	
	/* Configuración del header */
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ paddingRight: Platform.OS === 'ios' ? 16 : 0, flexDirection: 'row', alignItems: 'center'}}>
          <ProfileIcon />
        </View>
      ), 
      headerLeft: () => (<DrawerIcon />),
    })
  }, [navigation])
 
	return (
		<ComponentLayout>
			<ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
				<View style={{ gap: 20 }}>
					<AIOption  
						text={t('Assistant.Recipes')}
            goTo='AssistantRecipes/AssistantRecipes' 
            imgSrc={AssistantImgs.Recipes} 
					/>
					<AIOption 
						text={t('Assistant.FyQ')}
            goTo='AssistantFyQ/AssistantFyQ' 
            imgSrc={AssistantImgs.FyQ} 
					/>
					<AIOption 
						text={t('Assistant.FoodRecomendations')}
            goTo='AssistantFR/AssistantFR' 
            imgSrc={AssistantImgs.Recs} 
					/>
					<AIOption 
						text={t('Assistant.Menus')}
            goTo='AssistantMenus/AssistantMenus' 
            imgSrc={AssistantImgs.Menus} 
					/>
				</View>
			</ScrollView>
		</ComponentLayout>
	)
}

interface AIOptionProps {
	imgSrc: ImageSourcePropType,
	text: string,
	goTo: string,
}

const AIOption = ({ imgSrc, text, goTo }: AIOptionProps) => {
	const linkName = `/Assistant/${goTo}`
	return (
		<Link href={goTo ? linkName : ''}>
			<View style={styles.item}>
				<View>
					<Image source={imgSrc} style={{ resizeMode: 'contain' }} />
				</View>
				<View>
					<StyledText fontWeight='bold' fontSize='secundary' padding={10}>{text}</StyledText>
				</View>
			</View>		
		</Link> 
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		alignItems: 'center', 
		justifyContent: 'flex-start', 
		marginHorizontal: 3,
	}, 
	item: {
    borderWidth: 0.5, 
    borderColor: theme.colors.white, 
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: theme.colors.secundary,
  },
})