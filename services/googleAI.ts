import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyC8GASMAiPseSUiHEYfkHnbQSLcrs2JR-M'

/* Nuevo agente de IA generativa */
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

/* Configuración de seguridad */
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

/* Modelo */
const model = genAI.getGenerativeModel({
	model: 'gemini-2.0-flash',
	safetySettings
})

/* Configuración general del modelo */
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
}

async function getAIResponse(prompt: string) {
  const chatSession = model.startChat({ 
			generationConfig,
			history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());

	return result.response.text()
}

export { getAIResponse };