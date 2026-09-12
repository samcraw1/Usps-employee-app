import { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import ProfileIconProp from "@/components/ui/ProfileIconProp";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { ListRow, RowGroup } from "@/components/ui/list-row";
import { Screen } from "@/components/ui/screen";
import { SectionHeader } from "@/components/ui/section-header";
import { API_BASE } from "@/constants/api";
import { Palette, spacing, type } from "@/constants/theme";

// Shape of what GET /api/employees/:id returns, mirroring Employee.java.
type EmployeeResponse = {
  id: number;
  name: string;
};

const PASSWORD_UPDATED = "Password updated.";

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
    if (!newPassword.trim()) {
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
        setStatus(PASSWORD_UPDATED);
        setNewPassword("");
        setPromptVisible(false);
      })
      .catch((requestError) => {
        console.error("Change password failed:", requestError);
        setStatus("Could not update your password.");
      });
  };

  const handleNotifications = () => {
    Alert.alert("Notifications", "Turn on notifications to stay updated.", [
      { text: "Cancel", style: "cancel" },
      { text: "Turn On", onPress: () => console.log("enabled") },
    ]);
  };

  const handleHelp = () => {
    router.push("/help");
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

  // The success message arrives as the modal closes, so it belongs on the
  // screen; everything else in `status` is a failure shown inside the modal.
  const passwordUpdated = status === PASSWORD_UPDATED;

  return (
    <Screen
      header={
        <View style={styles.identity}>
          <ProfileIconProp size={72} color={Palette.textOnBlue} />
          <Text style={styles.name}>
            {username || (error ? "Employee" : "Loading…")}
          </Text>
          <Text style={styles.role}>Letter Carrier · Midtown Station</Text>
        </View>
      }
    >
      {error ? <Banner tone="error" message={error} /> : null}
      {passwordUpdated ? <Banner tone="success" message={status} /> : null}

      <SectionHeader title="Account" />

      <RowGroup>
        <ListRow
          label="Change password"
          icon="lock-closed-outline"
          onPress={openPrompt}
        />
        <ListRow
          label="Notifications"
          icon="notifications-outline"
          onPress={handleNotifications}
        />
        <ListRow
          label="Help"
          icon="help-circle-outline"
          onPress={handleHelp}
        />
      </RowGroup>

      <Button
        variant="destructive"
        label="Log out"
        onPress={handleLogout}
        style={styles.logout}
      />

      <Modal
        visible={promptVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPromptVisible(false)}
      >
        <View style={styles.backdrop}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>Change password</Text>

            <Field
              label="New password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoCapitalize="none"
              autoFocus
              placeholder="Enter new password"
              onSubmitEditing={changePassword}
              returnKeyType="go"
            />

            {status && !passwordUpdated ? (
              <Banner tone="error" message={status} />
            ) : null}

            <Button label="Save" onPress={changePassword} />
            <Button
              variant="secondary"
              label="Cancel"
              onPress={() => setPromptVisible(false)}
            />
          </Card>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: {
    alignItems: "center",
    gap: spacing.sm,
  },
  name: {
    ...type.h2,
    color: Palette.textOnBlue,
  },
  role: {
    ...type.label,
    color: Palette.textOnBlueMuted,
  },
  logout: {
    marginTop: spacing.sm,
  },
  backdrop: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: Palette.scrim,
  },
  modalCard: {
    gap: spacing.lg,
  },
  modalTitle: {
    ...type.h2,
    color: Palette.text,
  },
});
