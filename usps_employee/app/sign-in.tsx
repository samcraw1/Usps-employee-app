import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Palette, spacing, type } from "@/constants/theme";

// Mirrors the hardcoded pair in the old Swing Main.java. Replace with a real
// call to the backend before this goes anywhere near a device.
const VALID_USERNAME = "Sam";
const VALID_PASSWORD = "12345";

export default function SignIn() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
      style={[
        styles.container,
        { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xl },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Full-bleed brand blue: this is the one screen that is pure identity,
          so the wordmark carries it rather than a header bar. */}
      <View style={styles.brand}>
        <Text style={styles.brandMark}>USPS</Text>
        <Text style={styles.brandSub}>Employee Portal</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.title}>Sign in</Text>

        <Field
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Username"
        />

        <Field
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          placeholder="Password"
          onSubmitEditing={handleLogin}
          returnKeyType="go"
        />

        {error ? <Banner tone="error" message={error} /> : null}

        <Button label="Log in" onPress={handleLogin} />
      </Card>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    backgroundColor: Palette.blue,
  },
  brand: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  brandMark: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 2,
    color: Palette.textOnBlue,
  },
  brandSub: {
    ...type.label,
    color: Palette.textOnBlueMuted,
    marginTop: spacing.xs,
  },
  card: {
    gap: spacing.lg,
  },
  title: {
    ...type.h2,
    color: Palette.text,
  },
});
