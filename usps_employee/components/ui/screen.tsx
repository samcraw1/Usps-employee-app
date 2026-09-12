import type { ReactNode } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Palette, elevation, spacing, type } from "@/constants/theme";

type ScreenProps = {
  /** Shown in the blue bar. Omit when passing `header`. */
  title?: string;
  subtitle?: string;
  /** Replaces the default title block inside the bar. */
  header?: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/**
 * Every screen's frame: a USPS-blue bar that bleeds under the status bar, then
 * a neutral scrolling body. Headers are hidden throughout the app
 * (`headerShown: false`), so this is what keeps content clear of the notch —
 * only the bar's text is inset, not the blue itself.
 */
export function Screen({
  title,
  subtitle,
  header,
  scroll = true,
  contentStyle,
  children,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const body = (
    <View
      style={[
        styles.body,
        { paddingBottom: spacing.xxl + insets.bottom },
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  return (
    <View style={styles.root}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + spacing.lg,
            paddingLeft: Math.max(insets.left, spacing.xl),
            paddingRight: Math.max(insets.right, spacing.xl),
          },
        ]}
      >
        {header ?? (
          <View>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        )}
      </View>

      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {body}
        </ScrollView>
      ) : (
        body
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  header: {
    backgroundColor: Palette.blue,
    paddingBottom: spacing.lg,
    ...elevation.header,
  },
  title: {
    ...type.h2,
    color: Palette.textOnBlue,
  },
  subtitle: {
    ...type.label,
    color: Palette.textOnBlueMuted,
    marginTop: spacing.xs,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.lg,
  },
});
