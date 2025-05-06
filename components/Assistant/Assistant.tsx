import { StyleSheet, Pressable, View } from 'react-native'
import React from 'react'
import { CheckBox, Icon, Switch } from '@rneui/themed'
import StyledText from '@/components/Styled/StyledText'
import theme from '@/constants/Theme'
import { Entypo } from '@expo/vector-icons'

/* Componentes reutilizables para el apartado del Asistente Virtual */

/* Tipo de Dieta */
export const DietOptions = ['Vegana', 'Sin lácteos', 'Alta proteína', 'Bajo carbohidrato']
/* Tipo de Cocina */
export const CuisineOptions = ['Internacional', 'Mexicana', 'Asiática', 'Mediterránea', 'Fusión']
/* Alergias comunes */
export const AllergyOptions = ['Lácteos', 'Huevos', 'Frutos secos', 'Soja', 'Pescado', 'Mariscos'];
/* Opciones de sabor */
export const FlavourOptions = ['Dulce', 'Salado', 'Picante']
/* Tiempo disponible para cocinar */
export const FreeCookingTime = ['Menos de 15 min', '15-30 min', 'Mas de 30 min']
/* Nivel de picante */
export const SpicenessLevel = ['Sin picante', 'Poco picante', 'Medio picante', 'Muy picante']

/* Botones de seleccion */
interface SelectablePillProps {
	text: string,
	selected: boolean,
	onPress: () => void,
}
export const SelectablePill = ({ text, selected, onPress }: SelectablePillProps) => (
  <Pressable 
    style={[styles.pill, selected && styles.selectedPill]}
    onPress={onPress}
  >
    <StyledText color={selected ? 'green' : 'white'}>{text}</StyledText>
    <Entypo name='chevron-right' size={14} color={selected ? theme.colors.green : 'white'} />
  </Pressable>
)

/* Titulo de cada seccion */
export const SectionTitle = ({ children }: any) => (
  <StyledText fontSize='medium' fontWeight='bold' marginVertical={10}>{children}</StyledText>
)

interface SwitchOptionProps {
	options: string[],
	selected: string[],
	setSelected: (selected: string[]) => void,
}
export function CheckboxGroup({ options, selected, setSelected }: SwitchOptionProps) {
  const toggleSelection = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  return (
    <View>
      {options.map((item, index) => (
        <CheckBox
          key={index}
          title={item}
          checked={selected.includes(item)}
          onPress={() => toggleSelection(item)}
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
	/* Selectable Pill */
	pill: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,
    backgroundColor: theme.colors.secundary, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedPill: { 
    borderColor: theme.colors.green,
    borderWidth: 1,
  },
	/* Checkbox */
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