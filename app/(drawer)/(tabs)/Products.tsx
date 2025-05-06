import { StyleSheet, Image, ImageSourcePropType, ScrollView, Pressable, Platform, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { ProductImgs } from '@/assets/Imgs/index';
import ComponentLayout from '@/layout/ComponentLayout';
import StyledText from '@/components/Styled/StyledText';
import theme from '@/constants/Theme';
import { ProfileIcon, DrawerIcon } from '@/components/Styled/HeaderIcons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';


export default function Products() {
  const navigation = useNavigation()
  const { t } = useTranslation(); 

  /* Configuración del Header */
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
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
        {/* Ingredientes Sin Gluten */}
        <OptionCard 
          imgSrc={ProductImgs.Ingredientes}
          text={t('Products.ingredients')}
          onPress={() => router.push({
            pathname: "/Products/Ingredients/Ingredients",
          })}
        />
        {/* Productos Sin Gluten */}
        <OptionCard 
          imgSrc={ProductImgs.Productos}
          text={t('Products.products')}
          onPress={() => router.push('/Products/Products')}
        />
      </ScrollView>
    </ComponentLayout>
  );
};

type OptionCardProps = {
  imgSrc: ImageSourcePropType;
  text: string;
  onPress?: () => void;
};

function OptionCard ({ imgSrc, text, onPress }: OptionCardProps) {
  if (!imgSrc || !text) return 

  return (
    <Pressable style={styles.optionCard} onPress={onPress}>
      <Image source={imgSrc} style={styles.imgStyles} />
      <StyledText alignSelf='center' fontSize='primary' fontWeight='bold'>{ text }</StyledText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  optionCard: {
    backgroundColor: theme.colors.secundary, 
    marginBottom: 16, 
    borderRadius: 15, 
    alignItems: 'center', 
    paddingVertical: '3%',
  },
  imgStyles: { 
    resizeMode: 'contain', 
    width: '95%', // Ajusta el ancho para que no ocupe todo el espacio
    alignSelf: 'center',
    marginBottom: '2%',
  }, 
});

 