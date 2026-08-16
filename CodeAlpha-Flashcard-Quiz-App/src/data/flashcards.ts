export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export const defaultFlashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is React Native?",
    answer: "A framework for building mobile apps using React.",
  },
  {
    id: 2,
    question: "What is Expo?",
    answer: "A framework for React Native development.",
  },
  {
    id: 3,
    question: "What is JSX?",
    answer: "A syntax extension for JavaScript.",
  },
];