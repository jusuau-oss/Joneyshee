import { GoogleGenAI, Type, Schema } from "@google/genai";
import { LessonContent, ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Schema for structured JSON output for lessons
const lessonSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "The title of the lesson." },
    introduction: { type: Type.STRING, description: "A hook to get the user interested." },
    coreContent: { type: Type.STRING, description: "Detailed educational content in Markdown format. Use bullet points, bold text, and clear paragraphs." },
    safetyTip: { type: Type.STRING, description: "A crucial safety tip related to this specific topic." },
    quiz: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctIndex: { type: Type.INTEGER, description: "Zero-based index of the correct option." },
          explanation: { type: Type.STRING, description: "Why this answer is correct." }
        },
        required: ["question", "options", "correctIndex", "explanation"]
      }
    }
  },
  required: ["title", "introduction", "coreContent", "safetyTip", "quiz"]
};

export const generateLesson = async (topic: string, levelDescription: string): Promise<LessonContent> => {
  try {
    const prompt = `
      You are an expert Scuba Diving Instructor (PADI/SSI Course Director level).
      Create a detailed, engaging lesson for a student at the "${levelDescription}" level.
      The specific topic is: "${topic}".
      
      The content should be accurate, safe, and inspiring.
      Explain complex physics or physiology simply if necessary.
      Focus on safety and enjoyment.
      Return the response in Chinese (Simplified).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonSchema,
        temperature: 0.4, 
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as LessonContent;
    }
    throw new Error("No content generated");
  } catch (error) {
    console.error("Error generating lesson:", error);
    throw error;
  }
};

export const sendChatMessage = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  try {
    // Convert app history to Gemini format
    // We limit history context to last 10 messages to save tokens/complexity for this demo
    const recentHistory = history.slice(-10).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: recentHistory,
      config: {
        systemInstruction: "You are 'DeepBlue', a friendly and highly experienced Scuba Diving Instructor. You are passionate about the ocean and safety. Answer questions accurately regarding scuba diving, marine life, equipment, and training. Always emphasize safety boundaries (e.g., 'Check with your local instructor'). Answer in Chinese.",
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Sorry, I couldn't hear you underwater. Can you say that again?";
  } catch (error) {
    console.error("Chat error:", error);
    return "Comm error. Please check your connection.";
  }
};