import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useFlashcards } from "../context/FlashcardContext";

export default function AddFlashcardScreen() {
  const {
    addFlashcard,
    editFlashcard,
  } = useFlashcards();

  const params = useLocalSearchParams();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (params.id) {
      setQuestion(String(params.question || ""));
      setAnswer(String(params.answer || ""));
    }
  }, []);

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) {
      Alert.alert(
        "Validation",
        "Please enter both Question and Answer."
      );
      return;
    }

    if (params.id) {
      editFlashcard(
        Number(params.id),
        question.trim(),
        answer.trim()
      );

      Alert.alert(
        "Success",
        "Flashcard Updated Successfully!"
      );
    } else {
      addFlashcard(
        question.trim(),
        answer.trim()
      );

      Alert.alert(
        "Success",
        "Flashcard Added Successfully!"
      );
    }

    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {params.id ? "Edit Flashcard" : "Add Flashcard"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Question"
        value={question}
        onChangeText={setQuestion}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Answer"
        value={answer}
        onChangeText={setAnswer}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          {params.id
            ? "Update Flashcard"
            : "Save Flashcard"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#2563EB",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  button: {
    backgroundColor: "#10B981",
    padding: 16,
    borderRadius: 10,
  },

  cancelButton: {
    backgroundColor: "#6B7280",
    padding: 16,
    borderRadius: 10,
    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});