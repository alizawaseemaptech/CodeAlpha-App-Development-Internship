import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFlashcards } from "../context/FlashcardContext";

export default function HomeScreen() {
  const { flashcards, deleteFlashcard } = useFlashcards();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // No flashcards
  if (flashcards.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Flashcard Quiz</Text>

        <View style={styles.card}>
          <Text style={styles.question}>
            No Flashcards Available
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/add-flashcard")}
        >
          <Text style={styles.addText}>
            + Add Flashcard
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Make sure currentIndex is always valid
  const safeIndex =
    currentIndex >= flashcards.length
      ? flashcards.length - 1
      : currentIndex;

  const card = flashcards[safeIndex];

  // Safety check
  if (!card) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Flashcard Quiz</Text>

        <View style={styles.card}>
          <Text style={styles.question}>
            Unable to load flashcard.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/add-flashcard")}
        >
          <Text style={styles.addText}>
            + Add Flashcard
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const nextCard = () => {
    if (safeIndex < flashcards.length - 1) {
      setCurrentIndex(safeIndex + 1);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleDelete = () => {
    // Make sure card exists before deleting
    if (!card || card.id === undefined || card.id === null) {
      return;
    }

    const deletedIndex = safeIndex;

    // Delete current flashcard
    deleteFlashcard(card.id);

    // Hide answer
    setShowAnswer(false);

    // Adjust index after deletion
    if (flashcards.length <= 1) {
      setCurrentIndex(0);
    } else if (deletedIndex >= flashcards.length - 1) {
      setCurrentIndex(flashcards.length - 2);
    } else {
      setCurrentIndex(deletedIndex);
    }
  };

  const handleEdit = () => {
    if (!card) {
      return;
    }

    router.push({
      pathname: "/add-flashcard",
      params: {
        id: card.id.toString(),
        question: card.question,
        answer: card.answer,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Flashcard Quiz</Text>

      <View style={styles.card}>
        <Text style={styles.question}>
          {card.question}
        </Text>

        {showAnswer && (
          <Text style={styles.answer}>
            {card.answer}
          </Text>
        )}

        {/* Show / Hide Answer */}
        <TouchableOpacity
          style={styles.answerButton}
          onPress={() => setShowAnswer(!showAnswer)}
        >
          <Text style={styles.buttonText}>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </Text>
        </TouchableOpacity>

        {/* Edit */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={handleEdit}
        >
          <Text style={styles.buttonText}>
            Edit Flashcard
          </Text>
        </TouchableOpacity>

        {/* Delete */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>
            Delete Flashcard
          </Text>
        </TouchableOpacity>
      </View>

      {/* Previous / Next */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.navButton,
            safeIndex === 0 && styles.disabledButton,
          ]}
          onPress={previousCard}
          disabled={safeIndex === 0}
        >
          <Text style={styles.buttonText}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            safeIndex === flashcards.length - 1 &&
              styles.disabledButton,
          ]}
          onPress={nextCard}
          disabled={safeIndex === flashcards.length - 1}
        >
          <Text style={styles.buttonText}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Flashcard */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/add-flashcard")}
      >
        <Text style={styles.addText}>
          + Add Flashcard
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 25,
    elevation: 5,
  },

  question: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  answer: {
    fontSize: 18,
    color: "#16A34A",
    textAlign: "center",
    marginVertical: 20,
  },

  answerButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },

  editBtn: {
    backgroundColor: "#F59E0B",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },

  deleteBtn: {
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  navButton: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 10,
    width: "47%",
  },

  disabledButton: {
    opacity: 0.4,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  addBtn: {
    backgroundColor: "#10B981",
    marginTop: 25,
    padding: 16,
    borderRadius: 10,
  },

  addText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});