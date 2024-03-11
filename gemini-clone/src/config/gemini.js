// Importa la clase y las constantes necesarias de la biblioteca @google/generative-ai
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyBzx-7xOqCce3Lv9daHHoC1O5dB4QK3GBQ";

async function runChat(prompt) {
  try {
    // Crea una nueva instancia de GoogleGenerativeAI con la clave API
    const genAI = new GoogleGenerativeAI(API_KEY);
    // Obtiene el modelo generativo deseado
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    // Inicia un chat con la configuración especificada
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    // Envía un mensaje al chat y espera la respuesta
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
  } catch (error) {
    console.error("Error en la ejecución del chat:", error);
    // Maneja cualquier error que pueda ocurrir durante la ejecución del chat
    throw error;
  }
}

export default runChat;
