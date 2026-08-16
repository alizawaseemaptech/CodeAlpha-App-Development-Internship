import AsyncStorage from "@react-native-async-storage/async-storage";
import { Flashcard } from "../data/flashcards";

const STORAGE_KEY = "FLASHCARD_DATA";

export const saveFlashcards = async (cards: Flashcard[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (error) {
    console.log("Save Error:", error);
  }
};

export const loadFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data !== null) {
      return JSON.parse(data);
    }

    return [];
  } catch (error) {
    console.log("Load Error:", error);
    return [];
  }
};