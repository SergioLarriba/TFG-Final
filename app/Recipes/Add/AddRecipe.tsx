import { Image, StyleSheet, Text, View, ScrollView, TextInput, ActivityIndicator, TouchableOpacity, Alert, Pressable } from "react-native";
import React, { useState, useLayoutEffect, useCallback, Children } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import theme from "@/constants/Theme";
import ComponentLayout from "@/layout/ComponentLayout";
import StyledText from "@/components/Styled/StyledText";
import { SectionTitle, SelectablePill } from "@/components/Assistant/Assistant";
import { router, useNavigation } from "expo-router";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/lib/supabase";
import uuid from 'react-native-uuid';
import { useAuth } from "@/providers/AuthProvider";
import { postRecipes } from "@/api/recipes";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RECIPES_BUCKET } from "@/api/config";
import { CameraIcon } from "@/components/Styled/Icons";
import { useTranslation } from "react-i18next";

export default function AddRecipe() {
  const navigation = useNavigation()
  const { t } = useTranslation(); 
  /* Formulario AddRecipe */
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [ingredientes, setIngredientes] = useState([{
    id: uuid.v4().toString(),
    text: "",
  }]);
  const [instrucciones, setInstrucciones] = useState([{
    id: uuid.v4().toString(),
    text: "",
  }]);
  const [image, setImage] = useState('');
  const [tips, setTips] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  /* User ID */
  const userId = useAuth().session?.user.id;

  const pickImage = useCallback(async () => {
    /* El usuario escoje una imagen */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    /* Si no cancela la selección de la imagen */
    if (!result.canceled) {
      setLoadingImage(true);
      const img = result.assets[0];
      const localUri = img.uri;
      console.log(img)
      /* Convertir la imagen a base64 */
      const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: 'base64',
      })
      /* Genero el path de la imagen */
      const filePath = `${userId}/${name}-${new Date().getTime()}.${localUri.split('.').pop()}`;
      const contentType = img.mimeType;
      console.log(contentType)
      /* Subir la imagen al bucket de supabase */
      const { data, error } = await supabase
        .storage
        .from(RECIPES_BUCKET)
        .upload(filePath, decode(base64), {
          contentType: contentType,
        });
      console.log("Subir imagen", data)
      if (error) throw error;
      /* Descargar la imagen recien subida */
      const { data: downloadedImg, error: downloadedError } = await supabase 
        .storage
        .from(RECIPES_BUCKET)
        .createSignedUrl(filePath, 60 * 60 * 24 * 7* 4* 12 * 4); // La URL es válida para 4 años
      if (downloadedError) throw downloadedError;
      if (downloadedImg?.signedUrl) {
        setImage(downloadedImg.signedUrl);
      }
      console.log("Descargar imagen", downloadedImg)
      setLoadingImage(false);
    }
  }, []);

  /* Personalizar el header */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: t('Recipes.addRecipe.header'),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 20,
      },
    })
  }, [navigation])

  const handleSubmit = async () => {
    try {
      const response = await postRecipes(
        {
          name,
          time: parseInt(time),
          numPeople: parseInt(numPeople),
          description,
          difficulty,
          tips,
          image_url: image,
          user_id: userId, 
        },
        ingredientes
          .map(ingrediente => ingrediente.text)
          .filter(ingrediente => ingrediente.trim() !== ""), // Filtrar ingredientes vacíos
        instrucciones
          .map(instriccion => instriccion.text)
          .filter(instriccion => instriccion.trim() !== ""), // Filtrar instrucciones vacías
      )

      if (response?.success) {
        Alert.alert(t('Recipes.addRecipe.alertTitle'), t('Recipes.addRecipe.alert'));
        navigation.goBack();
      }
    } catch (error) {
      console.error(error)
    }
  };

  /* Ingredientes */
  const handleAddIngredient = useCallback(() => {
    setIngredientes(prevIngredients => [...prevIngredients, { id: uuid.v4().toString(), text: ''}]); 
  }, []); 

  const handleIngredientChange = useCallback((text: string, id: string) => {
    setIngredientes(prevIngredients => 
      prevIngredients.map(ingredient => (ingredient.id === id 
        ? {...ingredient, text}
        : ingredient
      ))
    )
  }, [])

  /* Instrucciones */
  const handleAddInstruction = useCallback(() => {
    setInstrucciones(prevInstructions => [...prevInstructions, { id: uuid.v4().toString(), text: ''}]); 
  }, []); 

  const handleInstructionChange = useCallback((text: string, id: string) => {
    setInstrucciones(prevInstructions => 
      prevInstructions.map(instruction => (instruction.id === id 
        ? {...instruction, text}
        : instruction
      ))
    )
  }, [])

  return (
    <ComponentLayout>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
        {/* Nombre de la receta */}
        <TextInput
          style={styles.inputStyles}
          placeholder={t('Recipes.addRecipe.recipeName')}
          placeholderTextColor="#9C9C9C"
          value={name}
          onChangeText={setName}
          multiline
        />

        {/* Tiempo */}
        <View style={styles.time}>
          <SectionTitle>{t('Recipes.addRecipe.time')}</SectionTitle>
          <TextInput
            style={styles.inputTime}
            placeholder="15, 30..."
            placeholderTextColor="#9C9C9C"
            value={time}
            onChangeText={setTime}
            keyboardType="number-pad"
            maxLength={3}
          />
        </View>

        {/* Dificultad */}
        <View>
          <SectionTitle>{t('Recipes.addRecipe.difficulty')}</SectionTitle>
          <Pressable 
            onPress={() => setDifficulty('Facil')}
            style={[styles.difficultyBtn, difficulty === 'Facil' && styles.difficultyBtnPressed]}
          >
            <StyledText fontWeight='bold'>{t('Recipes.addRecipe.easy')}</StyledText>
          </Pressable>
          <Pressable 
            onPress={() => setDifficulty('Intermedio')}
            style={[styles.difficultyBtn, difficulty === 'Intermedio' && styles.difficultyBtnPressed]}
          >
            <StyledText fontWeight='bold'>{t('Recipes.addRecipe.medium')}</StyledText>
          </Pressable>
          <Pressable 
            onPress={() => setDifficulty('Dificil')}
            style={[styles.difficultyBtn, difficulty === 'Dificil' && styles.difficultyBtnPressed]}
          >
            <StyledText fontWeight='bold'>{t('Recipes.addRecipe.hard')}</StyledText>
          </Pressable>
        </View>

        {/* Número de personas */}
        <View style={styles.time}>
          <SectionTitle>{t('Recipes.addRecipe.numPeople')}</SectionTitle>
          <TextInput
            style={styles.inputTime}
            placeholder="1, 2..."
            placeholderTextColor="#9C9C9C"
            value={numPeople}
            onChangeText={setNumPeople}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>

        {/* Descripción */}
        <SectionTitle>{t('Recipes.addRecipe.description')}</SectionTitle>
        <TextInput
          style={styles.description}
          placeholder={t('Recipes.addRecipe.descriptionPlaceholder')}
          placeholderTextColor="#9C9C9C"
          value={description}
          onChangeText={setDescription}
          multiline
        />
 
        {/* Foto */}
        <SectionTitle>{t('Recipes.addRecipe.photo')}</SectionTitle> 
        <View style={styles.containerFoto}>
          {loadingImage 
            ? <ActivityIndicator size="large" color={theme.colors.grey} />
            : (
              image ? (
                <Image source={{ uri: image }} style={{ width: "100%", height: "100%", borderRadius: 20 }} />
              ) : (
                <TouchableOpacity onPress={pickImage} style={styles.cameraWrapper}>
                  <CameraIcon size={30} />
                </TouchableOpacity>            
              )
            )
          }
        </View>

        {/* Ingredientes */}
        <View style={styles.ingredientWrapper}>
          <Text style={styles.title}>{t('Recipes.addRecipe.ingredients')}</Text>
          {ingredientes.map((item, index) => (
            <TextInput 
              key={index}
              value={item.text}
              style={styles.input}
              placeholder={t('Recipes.addRecipe.ingredientsPlaceholder', {
                index: index + 1
              })}
              placeholderTextColor='#9C9C9C'
              onChangeText={(text) => handleIngredientChange(text, item.id)}
            />
          ))}
          {/* Boton de añadir ingrediente */}
          <TouchableOpacity 
            onPress={handleAddIngredient}
            style={styles.addBtnIngredient}
          >
            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{t('Recipes.addRecipe.addIngredientBtn')}</Text>
          </TouchableOpacity>
        </View>

        {/* Instrucciones */}
        <View style={styles.ingredientWrapper}>
          <Text style={styles.title}>{t('Recipes.addRecipe.instructions')}</Text>
          {instrucciones.map((item, index) => (
            <TextInput 
              key={index}
              value={item.text}
              style={styles.input}
              placeholder={t('Recipes.addRecipe.instructionsPlaceholder', {
                index: index + 1
              })}
              placeholderTextColor='#9C9C9C'
              onChangeText={(text) => handleInstructionChange(text, item.id)}
            />
          ))}
          {/* Boton de añadir ingrediente */}
          <TouchableOpacity 
            onPress={handleAddInstruction}
            style={styles.addBtnIngredient}
          >
            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{t('Recipes.addRecipe.addInstructionBtn')}</Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <SectionTitle>{t('Recipes.addRecipe.tips')} </SectionTitle>
        <TextInput
          style={styles.description}
          placeholder={t('Recipes.addRecipe.tipsPlaceholder')}
          placeholderTextColor="#9C9C9C"
          value={tips}
          onChangeText={setTips}
          multiline
        />

        {/* Botón de subir receta */}
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <StyledText fontSize='secundary' fontWeight='bold' color='primary'>{t('Recipes.addRecipe.submitRecipeBtn')}</StyledText>
          </TouchableOpacity>
        </View>
      </ScrollView> 
    </ComponentLayout>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'flex-start',
    paddingBottom: 65, // Añadido para espacio al final
  },
  inputStyles: {
    color: theme.colors.white,
    borderRadius: 15,
    padding: 15,
    textAlignVertical: "top",
    backgroundColor: theme.colors.secundary, 
    fontSize: 12,
    marginBottom: 10,
  },
  containerFoto: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    borderRadius: 20,
    marginVertical: 15,
    backgroundColor: theme.colors.secundary,
  },
  container: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: theme.colors.secundary,
    borderRadius: 15,
  },
  inputField: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 14, 
  },
  /* Añadir Ingredientes e Instrucciones */
  addBtn: {
    backgroundColor: theme.colors.green,
    borderRadius: 15,
    alignItems: "center",
    padding: 5,
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  /* Tiempo y NumPeople */
  time: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    gap: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  inputTime: {
    color: theme.colors.white,
    borderRadius: 15,
    padding: 15,
    textAlignVertical: "top",
    backgroundColor: theme.colors.secundary, 
    fontSize: 12,
  },
  /* Descripcion */
  description: {
    color: theme.colors.white,
    borderRadius: 15,
    padding: 15,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 12,
    marginVertical: 10,
    backgroundColor: theme.colors.secundary,
  },
  /* Foto del plato */
  cameraWrapper: {
    backgroundColor: theme.colors.green,
    borderRadius: 15,
    padding: 7,
  }, 
  /* Submit Container */
  submitContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  /* Submit */
  submit: {
    backgroundColor: theme.colors.green,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  ingredientWrapper: {
    padding: 20,
    backgroundColor: theme.colors.secundary,
    borderRadius: 10,
    marginVertical: 15,
  },
  addBtnIngredient: {
    backgroundColor: theme.colors.green,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16, 
  },
  difficultyBtn: {
    backgroundColor: theme.colors.secundary, 
    padding: 10, 
    borderColor: theme.colors.white, 
    borderWidth: 0.5, 
    borderRadius: 12, 
    marginBottom: 10, 
  }, 
  difficultyBtnPressed: {
    backgroundColor: theme.colors.primary, 
    borderColor: theme.colors.green, 
  }, 
});