import { StyleSheet, Text, TextProps } from 'react-native';
import React, { ReactNode } from 'react';
import theme from '@/constants/Theme';

interface StyledTextProps extends TextProps {
  children: ReactNode;
  color?: 'primary' | 'secundary' | 'green' | 'red' | 'yellow' | 'white' | 'grey';
  fontSize?: 'primary' | 'secundary' | 'medium';
  fontWeight?: 'bold' | 'regular';
  textAlign?: string;
  paddingLeft?: number;
  alignSelf?: string;
  marginTop?: number; 
  marginBottom?: number; 
}

export default function StyledText({ 
  children, 
  color = 'white', 
  fontSize, 
  fontWeight, 
  textAlign,
  paddingLeft, 
  alignSelf,
  marginTop, 
  marginBottom, 
  ...restOfProps
}: StyledTextProps) {
  const textStyles = [
    styles.text, // Estilo base
    color === 'primary' && styles.colorPrimary, 
    color === 'secundary' && styles.colorSecundary, 
    color === 'green' && styles.colorGreen, 
    color === 'red' && styles.colorRed,
    color === 'yellow' && styles.colorYellow,
    color === 'white' && styles.colorWhite, 
    color === 'grey' && styles.colorGrey, 
    fontSize === 'primary' && styles.fontSizePrimary, 
    fontSize === 'secundary' && styles.fontSizeSecondary, 
    fontSize === 'medium' && styles.fontSizeMedium, 
    fontWeight === 'bold' && styles.bold,
    fontWeight === 'regular' && styles.regular,
  ];

  return (
    <Text style={[textStyles, {marginBottom: marginBottom, marginTop: marginTop}]} {...restOfProps}>
      {children}
    </Text>
  );
} 

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white, 
    fontSize: theme.fontSizes.subHeading, 
    fontFamily: theme.fonts.main, 
    fontWeight: 'regular', 
  }, 
  colorPrimary: {
    color: theme.colors.primary, 
  }, 
  colorSecundary: {
    color: theme.colors.secundary, 
  },
  colorGreen: {
    color: theme.colors.green,
  },
  colorRed: {
    color: theme.colors.red,
  },
  colorYellow: {
    color: theme.colors.stars,
  },
  colorWhite: {
    color: theme.colors.white,
  },
  colorGrey: {
    color: theme.colors.grey, 
  },
  fontSizePrimary: {
    fontSize: theme.fontSizes.body,
  }, 	
  fontSizeSecondary: {
    fontSize: theme.fontSizes.secondary,
  }, 
  fontSizeMedium: {
    fontSize: theme.fontSizes.medium,
  },
  bold: {
    fontWeight: 'bold',  
  },
  regular: {
    fontWeight: 'regular', 
  }, 
});
