import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

import { Palette, radius, spacing, type } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary" | "destructive";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && pressedStyles[variant],
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.label, labelStyles[variant]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    paddingVertical: spacing.lg - 2,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  primary: {
    backgroundColor: Palette.blue,
  },
  secondary: {
    backgroundColor: Palette.card,
    borderWidth: 1,
    borderColor: Palette.inputBorder,
  },
  // Bordered rather than a solid red slab: the system-settings idiom reads as
  // deliberate rather than alarming, and keeps solid red for real errors.
  destructive: {
    backgroundColor: Palette.card,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...type.title,
  },
});

const pressedStyles = StyleSheet.create({
  primary: { backgroundColor: Palette.blueDark },
  secondary: { backgroundColor: Palette.blueTint },
  destructive: { backgroundColor: Palette.redTint },
});

const labelStyles = StyleSheet.create({
  primary: { color: Palette.textOnBlue },
  secondary: { color: Palette.blue },
  destructive: { color: Palette.red },
});
