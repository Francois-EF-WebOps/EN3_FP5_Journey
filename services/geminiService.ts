
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function askExpert(prompt: string, context: string) {
  if (!process.env.API_KEY) return "API Key missing. Please configure environment.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert EV conversion engineer specializing in the Suzuki EN125 and the 'EcoMoto' project. 
      Context of our project standards: ${context}
      
      User Question: ${prompt}
      
      Provide a technical, safety-first response in markdown. If the question is about structural work, remind them about the BOSC standard. If it's electrical, mention 48V limits.`,
    });
    return response.text || "No response received.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error communicating with the expert. Please check your connection.";
  }
}
