import theme from '@/constants/Theme'
import { View, ActivityIndicator } from 'react-native'
import HomeTab from './(drawer)/(tabs)/Home'
import { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'
import ComponentLayout from '@/layout/ComponentLayout'

export default function Index() {
	const navigation = useNavigation(); 
	
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		}) 
	}, [navigation])


  return (
    <ComponentLayout>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color={theme.colors.green} style={{ marginTop: 20 }} />
			</View>
		</ComponentLayout>
  )
}
