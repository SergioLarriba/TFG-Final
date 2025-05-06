import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ComponentLayout from '@/layout/ComponentLayout'
import { ScrollView } from 'react-native-gesture-handler'
import HomePageItem from './HomePageItem'
import { MainPageImgs } from '@/assets/icons/MainPageImgs/index'


export default function HomePage() {
	
	return (
		<ComponentLayout>
			<ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
				<HomePageItem title="Recetas mejor valoradas" imgSource={MainPageImgs.recetas}/>
				<HomePageItem title="Mejores sitios del mes" imgSource={MainPageImgs.sitios} />
				<HomePageItem title="Nuevos productos" imgSource={MainPageImgs.productos} />
				<HomePageItem title="Nuevos productos" imgSource={MainPageImgs.recetas} />
			</ScrollView>
		</ComponentLayout>
	) 
}

const styles = StyleSheet.create({
	scrollContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start', 
  },
})