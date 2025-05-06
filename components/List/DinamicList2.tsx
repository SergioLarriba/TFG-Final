import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

export default function DynamicListInputTest() {
  const [items, setItems] = useState([{ id: uuid.v4().toString(), text: '' }]);

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
          onChangeText={(text) => handleChange(text, item.id)}
        />
      ))}

      <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
        <Text style={{ color: 'white' }}>+ Añadir ingrediente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#444',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});
