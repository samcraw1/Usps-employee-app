import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Palette, radius, spacing, type } from "@/constants/theme";

type BannerProps = {
  tone: "error" | "success";
  message: string;
};

export function Banner({ tone, message }: BannerProps) {
  const isError = tone === "error";

  return (
    <View
      style={[styles.banner, isError ? styles.error : styles.success]}
      accessibilityRole="alert"
    >
      <Ionicons
        name={isError ? "alert-circle" : "checkmark-circle"}
        size={18}
        color={isError ? Palette.red : Palette.success}
      />
      <Text
        style={[styles.message, isError ? styles.errorText : styles.successText]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  error: {
    backgroundColor: Palette.redTint,
  },
  success: {
    backgroundColor: Palette.successTint,
  },
  message: {
    ...type.body,
    flex: 1,
  },
  errorText: {
    color: Palette.red,
  },
  successText: {
    color: Palette.success,
  },
});
