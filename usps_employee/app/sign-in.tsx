import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Palette, shadow } from "../constants/theme";

// Mirrors the hardcoded pair in the old Swing Main.java. Replace with a real
// call to the backend before this goes anywhere near a device.
const VALID_USERNAME = "Sam";
const VALID_PASSWORD = "12345";

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setError("");
      router.replace("/(tabs)");
    } else {
      setError("Login failed. Check your username and password.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Username"
          placeholderTextColor={Palette.textMuted}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor={Palette.textMuted}
          onSubmitEditing={handleLogin}
          returnKeyType="go"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: Palette.background,
  },
  card: {
    padding: 24,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: shadow.shadowRadius,
    backgroundColor: Palette.card,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Palette.text,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Palette.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: shadow.shadowRadius,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: Palette.text,
    marginBottom: 16,
  },
  error: {
    fontSize: 14,
    color: Palette.red,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Palette.blue,
    borderRadius: shadow.shadowRadius,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Palette.card,
  },
});
