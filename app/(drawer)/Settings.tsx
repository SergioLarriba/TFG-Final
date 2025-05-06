import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ComponentLayout from '@/layout/ComponentLayout'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useNavigation } from 'expo-router'
import theme from '@/constants/Theme'
import { ArrowBackIcon, DrawerIcon } from '@/components/Styled/HeaderIcons'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

export default function Settings() {
	const navigation = useNavigation(); 
  const { t } = useTranslation();
  const [lang, setLang] = useState<string>(i18n.language) 
  
	/* Personalizar el Header */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: t('Drawer.header.settings'),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.white,
      headerLeft: () => (
        <DrawerIcon />
      ),
    }) 
  }, [navigation, lang])

  useEffect(() => {
    const handleLangChange = (lng: string) => setLang(lng);
  
    i18n.on('languageChanged', handleLangChange);
    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, []);
  

	return (
		<ComponentLayout>
			{/* Idioma */}
			<LanguageSwitcher />
		</ComponentLayout>
	)
}

const styles = StyleSheet.create({})