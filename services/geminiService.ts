import { GoogleGenAI, Type } from "@google/genai";
import { DEMO_SYSTEM_INSTRUCTION } from '../constants';
import { DemoResponse } from '../types';

export const analyzeInput = async (inputText: string): Promise<DemoResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: inputText,
    config: {
      systemInstruction: DEMO_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: { type: Type.STRING },
          metrics: {
            type: Type.OBJECT,
            properties: {
              sentimentScore: { type: Type.NUMBER },
              intentClarity: { type: Type.NUMBER },
              conversionProbability: { type: Type.NUMBER },
              keyTopics: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              suggestedAction: { type: Type.STRING }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as DemoResponse;
};