import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from '@/i18n';
import StyledText from './Styled/StyledText';
import theme from '@/constants/Theme';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState(i18n.language); // estado para forzar re-render

  const toggleLanguage = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang).then(() => {
      setLang(newLang); // actualiza estado y fuerza re-render
    });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <TouchableOpacity onPress={toggleLanguage} style={styles.button}>
        <StyledText fontWeight='bold' color='primary' fontSize='secundary'>
          {lang === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
        </StyledText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.green,
    borderRadius: 15,
    paddingVertical: 10, 
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
