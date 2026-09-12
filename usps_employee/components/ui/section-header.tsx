import { StyleSheet, Text } from "react-native";

import { Palette, spacing, type } from "@/constants/theme";

export function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    ...type.label,
    color: Palette.textMuted,
    marginLeft: spacing.xs,
    marginBottom: -spacing.sm,
  },
});
