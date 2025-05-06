import { StyleSheet, Text, View } from 'react-native'
import { CheckBox } from '@rneui/themed'
import React from 'react'
import theme from '@/constants/Theme'

const filters = ['Comida rápida', 'Cafeterías y panaderías', 'Restaurantes especializados', 'Restaurantes', 'Bares y Pubs', 'Tipo de comida']

export default function SearchFilters({ selected, setSelected }: any) {
	const toggleSelection = (item: any) => {
    setSelected((prev: any) =>
      prev.includes(item) ? prev.filter((i: any) => i !== item) : [...prev, item]
    )
  }

  return (
    <View>
      {filters.map((item, index) => (
        <CheckBox
          key={index}
          title={item}
          checked={selected.includes(index)}
          onPress={() => toggleSelection(index)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
          checkedColor={theme.colors.green}
          uncheckedColor={theme.colors.white}
          size={22}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
	checkboxContainer: {
    backgroundColor: 'transparent',
    padding: 0,
    marginLeft: 0,
  },
  checkboxText: {
    color: theme.colors.white,
		fontWeight: 'normal',
    fontSize: 14,
  },
})