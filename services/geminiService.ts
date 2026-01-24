import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Jesteś wirtualnym asystentem kościoła "Dom Ojca" we Wrocławiu. 
Twój ton jest ciepły, gościnny, pełen szacunku i biblijnie osadzony, ale nowoczesny.
Odpowiadasz na pytania w języku polskim.

Kluczowe informacje o kościele:
- Nazwa: Kościół Dom Ojca
- Lokalizacja: Wrocław, Polska (ul. Sołtysowicka 62A, jeśli ktoś pyta o adres).
- Nabożeństwa: Niedziela o 11:00.
- Adres: ul. Sołtysowicka 62A, 51-168 Wrocław
- Modlitwa: Środa o 19:00.
- Misja: Budowanie społeczności opartej na relacji z Bogiem Ojcem.
- Styl: Charyzmatyczny, uwielbieniowy, rodzinny.

Twoje zadania:
1. Udzielanie informacji o godzinach nabożeństw.
2. Odpowiadanie na proste pytania teologiczne w oparciu o chrześcijańskie wartości.
3. Modlitwa (jeśli użytkownik o to poprosi, napisz krótką, zachęcającą modlitwę).
4. Zachęcanie do odwiedzenia kościoła osobiście.

Nie wymyślaj fałszywych wydarzeń, jeśli nie wiesz, powiedz, że warto sprawdzić stronę w sekcji "Wydarzenia".
`;

export const sendMessageToGemini = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Przepraszam, ale obecnie nie mogę połączyć się z serwerem (brak klucza API). Proszę spróbować później.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using flash model for quick chat responses
    const model = 'gemini-2.5-flash'; 

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Przepraszam, nie zrozumiałem pytania.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Przepraszam, wystąpił błąd podczas przetwarzania Twojej wiadomości. Spróbuj ponownie za chwilę.";
  }
};