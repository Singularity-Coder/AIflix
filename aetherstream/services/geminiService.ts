
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PromptConfig } from "../types";

// Check if user has selected a key (required for Veo)
export const checkApiKeyStatus = async (): Promise<boolean> => {
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return !!process.env.API_KEY;
};

export const openKeySelection = async (): Promise<void> => {
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    await (window as any).aistudio.openSelectKey();
  }
};

export const generateStoryPlot = async (userPrompt: string): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Design a short cinematic plot for a micro-movie based on: "${userPrompt}". Provide title, description, and 3 key scene descriptions.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          scenes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                shot: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          }
        },
        required: ["title", "description", "scenes"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse story plot", e);
    return null;
  }
};

export const generateVideoContent = async (
  config: PromptConfig,
  onProgress: (status: string) => void
): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  onProgress("Initializing cinematic engine...");
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `${config.style} style: ${config.prompt}`,
      config: {
        numberOfVideos: 1,
        resolution: config.resolution,
        aspectRatio: config.aspectRatio
      }
    });

    onProgress("Synthesizing frames...");

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 8000));
      onProgress(`Rendering scene (${Math.floor(Math.random() * 30 + 40)}%)...`);
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    onProgress("Finalizing render...");
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("No video generated");

    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Video generation failed", error);
    if (error instanceof Error && error.message.includes("Requested entity was not found")) {
      // Prompt for key again if there's a billing/key issue
      await openKeySelection();
    }
    return null;
  }
};
