import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { API_BASE } from "../../constants/api";
import { Palette, shadow } from "../../constants/theme";

// Shape of what GET /api/employees/:id returns, mirroring Employee.java.
type EmployeeResponse = {
  id: number;
  name: string;
};

export const handleLogout = () => {
  console.log("Logging out");
}

export default function Profile() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Guards against setting state after the screen unmounts, which happens
    // if you tab away before the request lands.
    let cancelled = false;

    fetch(`${API_BASE}/api/employees/1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        return response.json() as Promise<EmployeeResponse>;
      })
      .then((employee) => {
        if (!cancelled) {
          setUsername(employee.name);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load your profile.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile </Text>
        <Text style={styles.label}>Username: {username}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
      </View>
    </ScrollView>
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