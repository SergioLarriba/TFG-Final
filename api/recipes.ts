import { supabase } from "@/lib/supabase";


export async function getRecipes () {
	try {
		const { data, error } = await supabase
			.from('recipes')
			.select('id, name, time, numpeople, description, difficulty, tips, image_url')
			.limit(40);
		if (error) throw error; 
		return data;
	} catch (error) {
		throw error;
	}
}

interface Recipe {
	name: string, 
	time: number, 
	numPeople: number,
	description: string,
	difficulty: string,
	tips?: string, 
	image_url: string, 
	user_id: string | undefined, 
}


export async function postRecipes (recipe : Recipe, ingredients: string[], instructions: string[]) {
	if (!recipe || !ingredients || !instructions) return null; 

	try {
		/* 1. Insertar receta */
		const { data: recipeData, error: recipeError } = await supabase
			.from('recipes')
			.insert({
				name: recipe.name, 
				time: recipe.time,
				numpeople: recipe.numPeople,
				description: recipe.description,
				difficulty: recipe.difficulty,
				tips: recipe.tips,
				image_url: recipe.image_url,
				user_id: recipe.user_id, 
			}) 
			.select('id') // Id de la receta insertada
			.single(); // Para obtener un solo resultado
		
		if (recipeError) {
			console.error(recipeError)
			throw recipeError;
		}
		const recipeId = recipeData?.id;

		/* 2. Insertar ingredientes */
		const formattedIngredients = ingredients.map(ingredient => ({
			recipe_id: recipeId, 
			ingredient
		}))
		const { data: ingredientsData, error: ingredientsError } = await supabase 
			.from('ingredients')
			.insert(formattedIngredients)
		
		if (ingredientsError) throw ingredientsError;

		/* 3. Insertar instrucciones */
		const formattedInstructions = instructions.map(instruction => ({
			recipe_id: recipeId, 
			instruction
		}))
		const { data: instructionsData, error: instructionsError } = await supabase 
			.from('instructions')
			.insert(formattedInstructions)
		
		if (instructionsError) throw instructionsError;
		
		return ({
			recipedId: recipeId,
			success: true, 
		})
	} catch (error) {
		return {
			success: false, 
		}
	}
}

/* Obtener datos de una receta */
export async function getRecipeById (id: string) {
	if (!id) return null; 
	
	try {
		/* 1. Obtener las recetas */
		const { data: recipeData, error: recipeError } = await supabase 
			.from('recipes')
			.select('id, name, time, numpeople, description, difficulty, tips, image_url')
			.eq('id', id)
		if (recipeError) throw recipeError;

		/* 2. Obtener los ingredientes */
		const { data: ingredientsData, error: ingredientsError } = await supabase
			.from('ingredients')
			.select('ingredient')
			.eq('recipe_id', id)
		if (ingredientsError) throw ingredientsError;

		/* 3. Obtener las instrucciones */
		const { data: instructionsData, error: instructionsError } = await supabase
			.from('instructions')
			.select('instruction')
			.eq('recipe_id', id)
		if (instructionsError) throw instructionsError;
		
		return {
			recipe: recipeData[0],
			ingredients: ingredientsData,
			instructions: instructionsData,
		};
	} catch (error) {
		throw error;
	}
}

export async function getProposedRecipes (userId: string | undefined) {
	if (!userId) throw new Error('Faltan parámetros'); 

	const { data, error } = await supabase 
		.from('recipes')
		.select('*')
		.eq('user_id', userId)
	
	if (error) throw error; 

	return data; 
}