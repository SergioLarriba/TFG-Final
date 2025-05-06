export interface Recipe {
	id: string, 
	name: string, 
	time: number, 
	numPeople: number,
	description: string,
	difficulty: string,
	tips?: string, 
	image_url: string, 
}