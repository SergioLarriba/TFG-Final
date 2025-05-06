import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import theme from '@/constants/Theme';

/* Interfaz de las Props */
interface HomePageProps {
	title: string;
	imgSource: ImageSourcePropType;
}

export default function HomePageItem({ title, imgSource }: HomePageProps) {
	return (
    <View style={styles.cardContainer}>
      {/* Imagen a la izquierda */}
      <Image
        style={styles.cardImage}
        source={imgSource}
      /> 
  
      {/* Texto a la derecha */}
      <View style={styles.textContainer}>
        <Text style={styles.cardText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 345,
    height: 196, 
    flexDirection: 'row', // Organiza los elementos en fila
    backgroundColor: theme.colors.secundary,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center', // Alinea verticalmente 
    paddingLeft: 15,
    marginBottom: 15,
  },
  cardImage: {
    width: 133,
    height: 161,
    borderRadius: 25,
    marginRight: 20, // Separación entre la imagen y el texto
  },
  textContainer: {
    flex: 1, // Toma todo el espacio restante
    alignSelf: 'flex-start', 
    paddingTop: 15, 
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Nunito',
    fontWeight: '800',
  },
});