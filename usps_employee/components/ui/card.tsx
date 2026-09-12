import type { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { Palette, elevation, radius, spacing } from "@/constants/theme";

type CardProps = {
  children: ReactNode;
  /** Pass false when children should run edge-to-edge (tables, row groups). */
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, padded = true, style }: CardProps) {
  return (
    <View style={[styles.card, padded && styles.padded, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.card,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Palette.border,
    overflow: "hidden",
    ...elevation.card,
  },
  padded: {
    padding: spacing.lg,
  },
});
