import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Share,
  Alert,
} from "react-native";

import { quotes } from "../data/quotes";

export default function HomeScreen() {
  const [quote, setQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  const generateQuote = () => {
    let random = quotes[Math.floor(Math.random() * quotes.length)];

    while (random.id === quote.id) {
      random = quotes[Math.floor(Math.random() * quotes.length)];
    }

    setQuote(random);
  };

  const shareQuote = async () => {
    try {
      await Share.share({
        message: `"${quote.text}"\n\n— ${quote.author}\n\n✨ Random Quote Generator`,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share quote");
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <Text style={styles.heading}>
        ✨ Random Quote Generator
      </Text>

      <View style={styles.card}>
        <Text style={styles.quote}>
          “{quote.text}”
        </Text>

        <View style={styles.line} />

        <Text style={styles.author}>
          — {quote.author}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={generateQuote}
      >
        <Text style={styles.buttonText}>
          🔄 New Quote
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.shareButton}
        onPress={shareQuote}
      >
        <Text style={styles.buttonText}>
          📤 Share Quote
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 35,
    textAlign: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    marginBottom: 20,
  },

  quote: {
    fontSize: 22,
    color: "#111827",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 34,
  },

  line: {
    height: 2,
    backgroundColor: "#2563EB",
    marginVertical: 25,
    borderRadius: 10,
  },

  author: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563EB",
  },

  button: {
    width: "100%",
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 5,
    marginTop: 10,
  },

  shareButton: {
    width: "100%",
    backgroundColor: "#10B981",
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 5,
    marginTop: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});