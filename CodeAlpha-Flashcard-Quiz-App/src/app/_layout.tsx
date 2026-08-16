import { Stack } from "expo-router";
import { FlashcardProvider } from "../context/FlashcardContext";

export default function RootLayout() {
  return (
    <FlashcardProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </FlashcardProvider>
  );
}