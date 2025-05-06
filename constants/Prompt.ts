/* Anatomía del Prompt perfecto */
export const IAPrompt = {
	metaData: '', 
	answerFormat: '',
	warning: '', 
	additionalContext: '',
}

/* 4 funcionalidades principales del Asistente:
	- Sugerencias de recetas sin gluten
	- Respuestas frecuentes sobre la dieta sin gluten
	- Recomendaciones personalizadas según tus preferencias alimenticias
	- Ayuda para planificar menús sin gluten
*/

/* Español */

/* Sugerencias de recetas sin gluten */
export const IAPromptRecipes = {
  metaData: 'Crea una selección de recetas innovadoras, 100% sin gluten, adaptadas a diferentes ocasiones y niveles de habilidad en la cocina.',
  answerFormat: `Para cada receta, incluye:
    - 📌 **Nombre atractivo** que capte la esencia del platillo
    - ✨ **Descripción inspiradora** que resalte su sabor, textura y beneficios nutricionales
    - 🛒 **Lista de ingredientes exactos**, con cantidades y posibles sustitutos sin gluten
    - 👨‍🍳 **Instrucciones paso a paso**, detalladas y fáciles de seguir
    - ⏳ **Tiempo total de preparación y cocción**, junto con el nivel de dificultad
    - 🥗 **Opciones de acompañamiento o variaciones** para hacer la receta más versátil
    - 🌱 **Etiquetas dietéticas** (ej. vegana, sin lácteos, alta en proteínas, baja en carbohidratos)
    - 🔍 **Consejos extra** sobre almacenamiento, trucos de cocción y presentación.`,
  warning: 'Cada receta debe estar 100% libre de gluten y sin riesgo de contaminación cruzada. Si se usa algún ingrediente comercial, mencionar solo opciones certificadas sin gluten.',
  additionalContext: `Soy una persona apasionada por la cocina saludable y sigo una dieta estrictamente sin gluten. Busco recetas que sean **creativas y llenas de sabor**, pero también prácticas y con ingredientes accesibles.  
  Me encantan los platillos internacionales, las recetas reconfortantes, y opciones rápidas para días ocupados. Prefiero recetas con ingredientes naturales, evitando los ultraprocesados y los azúcares refinados.  
  Además, me gustaría sugerencias **para diferentes momentos**, como desayunos energéticos, cenas ligeras, postres indulgentes y snacks saludables.`
};

/* Respuestas frecuentes sobre la dieta sin gluten */
export const IAPromptFAQ = {
  metaData: 'Responde de manera clara, confiable y basada en evidencia a las preguntas más comunes sobre la dieta sin gluten.',
  answerFormat: `Cada respuesta debe incluir:
    - ✅ **Explicación breve y concisa**, evitando tecnicismos innecesarios
    - 🔬 **Información respaldada por fuentes científicas o médicas**
    - 🍞 **Ejemplos de alimentos permitidos y prohibidos**
    - 🛒 **Consejos prácticos para leer etiquetas y evitar la contaminación cruzada**
    - 🍽️ **Recomendaciones para comer fuera de casa y mantener la dieta sin riesgos**
    - 🔗 **Opcionales: enlaces a guías oficiales o estudios relevantes.**`,
  warning: 'Evita mitos y desinformación. Todas las respuestas deben estar respaldadas por fuentes confiables y actualizadas. No hagas afirmaciones sin evidencia científica.',
  additionalContext: `Las personas que consultan estas preguntas suelen ser **recién diagnosticadas con celiaquía o sensibilidad al gluten** y están confundidas sobre qué pueden comer.  
  También hay quienes buscan reducir el gluten por bienestar general, pero sin necesidad médica.  
  La prioridad es ofrecer **respuestas claras y fáciles de aplicar en la vida diaria**, sin generar ansiedad ni miedo innecesario.  
  Algunos de los temas más consultados incluyen:  
  - Cómo identificar ingredientes con gluten en etiquetas.  
  - Diferencia entre celiaquía y sensibilidad al gluten.  
  - Alternativas seguras a los productos con gluten.  
  - Cómo evitar la contaminación cruzada en casa y en restaurantes.`
};

/* Recomendaciones personalizadas según tus preferencias alimenticias */
export const IAPromptPersonalized = {
  metaData: 'Sugiere alimentos, snacks y productos sin gluten adaptados a mis preferencias, necesidades nutricionales y estilo de vida.',
  answerFormat: `Cada recomendación debe incluir:
    - 🍽️ **Nombre del producto o alimento**
    - ⭐ **Descripción con sus beneficios y características principales**
    - 🛒 **Marcas seguras y dónde comprarlas (supermercados, tiendas online)**
    - 🔄 **Alternativas caseras para quienes prefieran hacerlas en casa**
    - 🥗 **Ideas de cómo incorporarlo en comidas o recetas**
    - 💡 **Consejos extra (ej. cómo almacenarlo, mejores combinaciones, precio estimado).**`,
  warning: 'Cada opción recomendada debe ser 100% libre de gluten, sin riesgo de contaminación cruzada. Si se sugieren productos comerciales, deben contar con certificación sin gluten.',
  additionalContext: `Tengo una dieta **estrictamente sin gluten**, pero además prefiero opciones naturales y mínimamente procesadas.  
  También tengo **sensibilidad a la lactosa**, así que si hay opciones sin lácteos, serían ideales.  
  Busco productos versátiles que pueda utilizar en varias recetas, así como snacks prácticos para llevar.  
  Me interesa conocer opciones que sean **nutritivas, económicas y fáciles de conseguir**.  
  También me gustaría recibir recomendaciones para diferentes momentos del día: desayuno, post-entrenamiento, snacks de media tarde, cenas ligeras, etc.`
};


/* Ayuda para planificar menús sin gluten */
export const IAPromptMealPlanning = {
  metaData: 'Crea un plan de comidas sin gluten completo, equilibrado y adaptado a mis necesidades nutricionales y estilo de vida.',
  answerFormat: `El plan debe incluir:
    - 📅 **Menú semanal detallado** con desayuno, almuerzo, cena y snacks
    - 🍽️ **Variedad en los ingredientes** para evitar la monotonía
    - 👨‍🍳 **Recetas con instrucciones paso a paso**, fáciles de seguir
    - 🛒 **Lista de compras organizada por categorías** (frutas, proteínas, cereales, etc.)
    - ⏳ **Consejos de meal prep** para optimizar el tiempo en la cocina
    - 💡 **Opciones de sustitución** en caso de alergias o restricciones adicionales.`,
  warning: 'El menú debe ser nutricionalmente equilibrado, asegurando una correcta ingesta de proteínas, carbohidratos y grasas saludables. Todos los ingredientes deben ser 100% libres de gluten y sin riesgo de contaminación cruzada.',
  additionalContext: `Busco un plan de comidas **práctico pero variado**, con recetas que no sean demasiado complicadas ni costosas.  
  A veces tengo poco tiempo para cocinar, así que incluir recetas **rápidas o que pueda preparar con anticipación** sería ideal.  
  Me gustaría que algunas comidas sean **aptas para compartir con mi familia**, sin que se note que son sin gluten.  
  También quiero incluir opciones para diferentes momentos del día: comidas ligeras para la noche, desayunos energéticos y snacks saludables.  
  Prefiero usar ingredientes naturales y evitar los ultraprocesados.  
  En cuanto a los sabores, me gustan tanto las recetas tradicionales como explorar cocinas del mundo.`
};

/* Ingles */

/* Gluten-free recipe suggestions */
export const IAPromptRecipes_En = {
  metaData: 'Create a selection of innovative, 100% gluten-free recipes tailored for different occasions and cooking skill levels.',
  answerFormat: `For each recipe, include:
    - 📌 **Catchy name** that captures the essence of the dish
    - ✨ **Inspiring description** highlighting its flavor, texture, and nutritional benefits
    - 🛒 **Exact list of ingredients**, with quantities and possible gluten-free substitutes
    - 👨‍🍳 **Step-by-step instructions**, detailed and easy to follow
    - ⏳ **Total prep and cook time**, along with difficulty level
    - 🥗 **Side dish or variation options** to make the recipe more versatile
    - 🌱 **Dietary tags** (e.g., vegan, dairy-free, high-protein, low-carb)
    - 🔍 **Extra tips** on storage, cooking tricks, and presentation.`,
  warning: 'Each recipe must be 100% gluten-free with no risk of cross-contamination. If using commercial products, only mention certified gluten-free options.',
  additionalContext: `I’m passionate about healthy cooking and follow a strictly gluten-free diet. I'm looking for **creative and flavorful recipes** that are also practical and made with accessible ingredients.  
  I love international dishes, comforting meals, and quick options for busy days. I prefer recipes with natural ingredients, avoiding ultra-processed foods and refined sugars.  
  I would also like suggestions **for different occasions**, such as energizing breakfasts, light dinners, indulgent desserts, and healthy snacks.`
};

/* Frequently asked questions about the gluten-free diet */
export const IAPromptFAQ_En = {
  metaData: 'Answer the most common questions about the gluten-free diet in a clear, trustworthy, and evidence-based way.',
  answerFormat: `Each answer should include:
    - ✅ **Brief and concise explanation**, avoiding unnecessary jargon
    - 🔬 **Information backed by scientific or medical sources**
    - 🍞 **Examples of allowed and prohibited foods**
    - 🛒 **Practical tips for reading labels and avoiding cross-contamination**
    - 🍽️ **Recommendations for eating out safely while sticking to the diet**
    - 🔗 **Optional: links to official guides or relevant studies.**`,
  warning: 'Avoid myths and misinformation. All responses must be supported by reliable and up-to-date sources. Do not make claims without scientific evidence.',
  additionalContext: `People asking these questions are often **newly diagnosed with celiac disease or gluten sensitivity** and feel confused about what they can eat.  
  Others may be reducing gluten for general wellness, without a medical need.  
  The priority is to provide **clear, practical answers** that can be easily applied to daily life, without causing anxiety or unnecessary fear.  
  Common topics include:  
  - How to identify gluten-containing ingredients on labels  
  - Difference between celiac disease and gluten sensitivity  
  - Safe alternatives to gluten-containing products  
  - How to avoid cross-contamination at home and in restaurants`
};

/* Personalized recommendations based on your dietary preferences */
export const IAPromptPersonalized_En = {
  metaData: 'Suggest gluten-free foods, snacks, and products tailored to my preferences, nutritional needs, and lifestyle.',
  answerFormat: `Each recommendation should include:
    - 🍽️ **Product or food name**
    - ⭐ **Description highlighting its benefits and key features**
    - 🛒 **Trusted brands and where to buy them (supermarkets, online stores)**
    - 🔄 **Homemade alternatives for those who prefer to make them at home**
    - 🥗 **Ideas for incorporating it into meals or recipes**
    - 💡 **Extra tips** (e.g., how to store it, best pairings, estimated price).`,
  warning: 'Each recommended option must be 100% gluten-free with no risk of cross-contamination. If commercial products are suggested, they must be certified gluten-free.',
  additionalContext: `I follow a **strictly gluten-free** diet and prefer **natural, minimally processed** options.  
  I’m also **lactose sensitive**, so dairy-free options would be ideal.  
  I’m looking for versatile products I can use in various recipes, as well as practical snacks for on-the-go.  
  I’m interested in options that are **nutritious, budget-friendly, and easy to find**.  
  I’d also like recommendations for different times of day: breakfast, post-workout, afternoon snacks, light dinners, etc.`
};

/* Help with planning gluten-free menus */
export const IAPromptMealPlanning_En = {
  metaData: 'Create a complete, balanced gluten-free meal plan tailored to my nutritional needs and lifestyle.',
  answerFormat: `The plan should include:
    - 📅 **Detailed weekly menu** with breakfast, lunch, dinner, and snacks
    - 🍽️ **Variety of ingredients** to avoid monotony
    - 👨‍🍳 **Recipes with step-by-step instructions**, easy to follow
    - 🛒 **Shopping list organized by category** (fruits, proteins, grains, etc.)
    - ⏳ **Meal prep tips** to save time in the kitchen
    - 💡 **Substitution options** for allergies or additional restrictions.`,
  warning: 'The menu must be nutritionally balanced, ensuring proper intake of protein, carbohydrates, and healthy fats. All ingredients must be 100% gluten-free and free from cross-contamination risk.',
  additionalContext: `I’m looking for a **practical but varied** meal plan, with recipes that aren’t too complex or expensive.  
  Sometimes I have little time to cook, so including **quick recipes or those I can prepare ahead** would be ideal.  
  I’d like some meals to be **family-friendly**, where the gluten-free aspect isn’t noticeable.  
  I also want to include options for different times of day: light evening meals, energizing breakfasts, and healthy snacks.  
  I prefer using natural ingredients and avoiding ultra-processed foods.  
  As for flavor, I enjoy both traditional recipes and exploring global cuisines.`
};