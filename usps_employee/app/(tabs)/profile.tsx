import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { API_BASE } from "../../constants/api";
import { Palette, shadow } from "../../constants/theme";

// Shape of what GET /api/employees/:id returns, mirroring Employee.java.
type EmployeeResponse = {
  id: number;
  name: string;
};

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");
  const [promptVisible, setPromptVisible] = useState(false);

  // Nothing to invalidate on the server yet: sign-in is still a hardcoded
  // string comparison, so there is no session or token. replace() rather than
  // push() so the back gesture cannot return to the tabs after logging out.
  const handleLogout = () => {
    router.replace("/sign-in");
  };

  // Opens the popup on a clean slate, so a stale message from a previous
  // attempt is not sitting there when it appears.
  const openPrompt = () => {
    setNewPassword("");
    setStatus("");
    setPromptVisible(true);
  };

  const changePassword = () => {
    if (!newPassword) {
      setStatus("Enter a new password first.");
      return;
    }

    // The backend returns 204 with no body, so there is nothing to parse.
    fetch(`${API_BASE}/api/employees/1/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        setStatus("Password updated.");
        setNewPassword("");
        setPromptVisible(false);
      })
      .catch((requestError) => {
        console.error("Change password failed:", requestError);
        setStatus("Could not update your password.");
      });
  };

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
          onPress={openPrompt}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </Pressable>
      </View>

      <Modal
        visible={promptVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPromptVisible(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.card}>
            

            <Text style={styles.label}>New password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoCapitalize="none"
              autoFocus
              placeholder="enter new password"
              placeholderTextColor={Palette.textMuted}
              onSubmitEditing={changePassword}
              returnKeyType="go"
            />

            {status ? <Text style={styles.error}>{status}</Text> : null}

            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={changePassword}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>

            <Pressable
              style={styles.cancel}
              onPress={() => setPromptVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  backdrop: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  cancel: {
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: Palette.textMuted,
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