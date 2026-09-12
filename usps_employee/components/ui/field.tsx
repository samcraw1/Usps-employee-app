import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { Palette, radius, spacing, type } from "@/constants/theme";

type FieldProps = TextInputProps & {
  label: string;
};

/**
 * Label + input pair. Spreading `...rest` keeps every TextInput prop the
 * screens already pass (secureTextEntry, returnKeyType, onSubmitEditing, …)
 * working untouched.
 */
export function Field({ label, style, ...rest }: FieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={Palette.textMuted}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    ...type.title,
    color: Palette.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Palette.inputBorder,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    // 16 rather than 14: avoids focus-zoom on web and matches platform norms.
    fontSize: 16,
    color: Palette.text,
    backgroundColor: Palette.card,
  },
});
