import { RECIPES_BUCKET } from "@/api/config";
import { postRecipes } from "@/api/recipes";
import { supabase } from "@/lib/supabase";
import * as FileSystem from 'expo-file-system';
import path from 'path';
import { decode } from "punycode";
import fs from 'fs';

/* Funcion para leer un archivo */
const jsonData = fs.readFileSync('recetas.json', 'utf8');
const recetas = JSON.parse(jsonData).recipes;

/* Funcion para subir una imagen -> Me devuelve la URL pública */
const uploadImage = async (localUri: string, userId: string, recipeName: string) => {
	/* Generar nombre de la imagen */
	const fileName = `${userId}/${recipeName}-${Date.now()}.${localUri.split(".").pop()}`;
	/* Pasar la imagen a base64 */
	const base64 = await FileSystem.readAsStringAsync(localUri, { 
		encoding: 'base64',
	});
	/* ContentType */
	const contentType =`image/${path.extname(localUri).substring(1)}`;
	/* Subir imagen a Supabase */
	const { data, error } = await supabase 
		.storage
		.from(RECIPES_BUCKET)
		.upload(fileName, decode(base64), {
			contentType: contentType,
		})
	if (error) console.log(error)
	/* Descargar la imagen recien subida */
	const { data: downloadedImg, error: downloadedError } = await supabase 
		.storage
		.from(RECIPES_BUCKET)
		.createSignedUrl(fileName, 60 * 60 * 24 * 7* 4* 12 * 4); 
		if (error) console.log(error)
		
	return downloadedImg?.signedUrl;
}

interface Recipe {
  name: string;
  time: number;
  numPeople: number;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  difficulty: "Fácil" | "Media" | "Difícil"; // Definiendo niveles de dificultad específicos
  tips?: string; // Opcional
	image_url: string, 
}

interface Ingredient {
  ingredient: string;
}

interface Instruction {
  instruction: string;
}


const insertRecipe = async (recipe: Recipe) => {
	const response = await postRecipes(
		recipe, 
		recipe.ingredients.map(i => i.ingredient), 
		recipe.instructions.map(i => i.instruction)
	);
	return response?.recipedId; 
}


