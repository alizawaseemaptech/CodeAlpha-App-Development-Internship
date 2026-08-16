console.log("FlashcardContext Loaded");

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Flashcard, defaultFlashcards } from "../data/flashcards";

interface FlashcardContextType {
  flashcards: Flashcard[];
  addFlashcard: (question: string, answer: string) => void;
  deleteFlashcard: (id: number) => void;
  editFlashcard: (
    id: number,
    question: string,
    answer: string
  ) => void;
  clearData: () => void;
}

const FlashcardContext = createContext<FlashcardContextType>(
  {} as FlashcardContextType
);

const STORAGE_KEY = "FLASHCARD_DATA";

export const FlashcardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        if (data) {
          setFlashcards(JSON.parse(data));
        } else {
          setFlashcards(defaultFlashcards);
        }
      } catch (e) {
        console.log(e);
        setFlashcards(defaultFlashcards);
      }

      setLoaded(true);
    };

    loadData();
  }, []);

  // Save
  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(flashcards)
    );
  }, [flashcards, loaded]);

  // Add
  const addFlashcard = (
    question: string,
    answer: string
  ) => {
    const newCard: Flashcard = {
      id: Date.now(),
      question,
      answer,
    };

    setFlashcards((prev) => [...prev, newCard]);
  };

  // Delete
  const deleteFlashcard = (id: number) => {
    setFlashcards((prev) =>
      prev.filter((card) => card.id !== id)
    );
  };

  // Edit
  const editFlashcard = (
    id: number,
    question: string,
    answer: string
  ) => {
    setFlashcards((prev) =>
      prev.map((card) =>
        card.id === id
          ? {
              ...card,
              question,
              answer,
            }
          : card
      )
    );
  };

  // Clear
  const clearData = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setFlashcards(defaultFlashcards);
  };

  return (
    <FlashcardContext.Provider
      value={{
        flashcards,
        addFlashcard,
        deleteFlashcard,
        editFlashcard,
        clearData,
      }}
    >
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcards = () =>
  useContext(FlashcardContext);