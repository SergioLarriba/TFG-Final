import theme from '@/constants/Theme';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

export default function DynamicListInput({
  items, 
  setItems, 
} : {
  items: { id: string, text: string}[]
  setItems: Dispatch<SetStateAction<{id: string, text: string}[]>>; 
}) {
  //const [items, setItems] = useState([{ id: uuid.v4().toString(), text: '' }]);

  const handleAddItem = useCallback(() => {
    setItems(prevItems => [...prevItems, { id: uuid.v4().toString(), text: '' }]);
  }, []);

  const handleChange = useCallback((text: string, id: string) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, text } : item))
    );
  }, []);

  useEffect(() => {
    console.log('Se han actualizado los items:', items);
  }, [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredientes:</Text>

      {items.map((item, index) => (
        <TextInput
          key={item.id}
          value={item.text}
          style={styles.input}
          placeholder={`Ingrediente ${index + 1}`}
          placeholderTextColor='#9C9C9C'
          onChangeText={(text) => handleChange(text, item.id)}
        />
      ))}

      <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
        <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>+ Añadir ingrediente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.secundary,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16, 
  },
  input: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: theme.colors.green,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});
