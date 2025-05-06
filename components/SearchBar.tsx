import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import theme from '@/constants/Theme'

export default function SearchBar({ onSubmit, placeholder } : { onSubmit: (text: string) => void, placeholder: string }) {
	return (
		<TextInput 
			placeholder={placeholder}
			placeholderTextColor={theme.colors.grey}
			autoComplete='off'
			autoCapitalize='none'
			autoCorrect={false}
			autoFocus={true}
			returnKeyType='search' // Para el teclado
			style={styles.searchBar}
			onChangeText={onSubmit} // Se activa cuando el usuario escribe
		/>
	)
}

const styles = StyleSheet.create({
	searchBar: {
		backgroundColor: theme.colors.secundary, 
		color: theme.colors.white,  
		borderRadius: 10, 
		padding: 10,
		margin: 10,
		fontSize: 16,
		flex: 1,
	}
})