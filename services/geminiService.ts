import { GoogleGenAI, Chat } from "@google/genai";

// Initialize the client safely
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "Nova", an advanced AI gaming assistant for a Persian 3D gaming website called "NexGen".
Language: Persian (Farsi).
Tone: Energetic, "Gamer" slang, professional but friendly, Hype.
Role: Help users find games, explain game lore, or give tips.
Constraints: Keep answers concise (under 100 words unless asked for more). Use emojis.
If asked about the website, say it's the most advanced 3D platform in Iran.
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return false;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) return "خطا: کلید API یافت نشد.";
  if (!chatSession) initializeChat();
  
  if (!chatSession) return "خطا در اتصال به هوش مصنوعی.";

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "متاسفانه پاسخی دریافت نکردم.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "متاسفانه در ارتباط با سرور مشکلی پیش آمد. لطفا دوباره تلاش کنید.";
  }
};