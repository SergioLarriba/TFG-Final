import { supabase } from "@/lib/supabase";

export async function getFilteredIngredients (searchText: string) {
	const { data, error } = await supabase
		.from('food')
		.select()
		.ilike('name', `%${searchText}%`)

	if (error) throw error; 

	return data; 
}

export async function getIngredientsByCategory (categoryId: string) {
	const { data, error } = await supabase
		.from("food_with_category")
		.select("name")
		.eq("id", categoryId); 
	
	if (error) throw error; 

	return data; 
}