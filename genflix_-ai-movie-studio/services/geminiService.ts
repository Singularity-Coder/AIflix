
import { GoogleGenAI, Type } from "@google/genai";
import { Script, CinematicStyle } from "../types";

export class GeminiService {
  private static getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  static async generateScript(prompt: string, style: CinematicStyle): Promise<Script> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short micro-movie script (3 scenes) based on this idea: "${prompt}". 
      The visual style must be consistently: ${style}. 
      Include a soundtrack prompt for an AI music generator. Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            soundtrackPrompt: { type: Type.STRING },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  description: { type: Type.STRING },
                  dialogue: { type: Type.STRING },
                  visualPrompt: { type: Type.STRING, description: "Detailed visual prompt incorporating the ${style} style" }
                },
                required: ["description", "dialogue", "visualPrompt"]
              }
            }
          },
          required: ["title", "scenes", "soundtrackPrompt"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  }

  static async startVideoGeneration(prompt: string, aspectRatio: '16:9' | '9:16' = '16:9') {
    const ai = this.getAI();
    // Using Veo for high quality micro-movie clips
    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });
    return operation;
  }

  static async pollVideoStatus(operation: any) {
    const ai = this.getAI();
    return await ai.operations.getVideosOperation({ operation });
  }

  static async getMediaUrl(uri: string): Promise<string> {
    return `${uri}&key=${process.env.API_KEY}`;
  }
}
