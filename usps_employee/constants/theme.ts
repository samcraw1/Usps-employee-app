/**
 * Design tokens for the app. Screens should never hardcode a color, radius,
 * spacing value, or font size — pull it from here so the four screens stay in
 * step with each other.
 *
 * The app is light-only. `app.json` pins `userInterfaceStyle` to "light"
 * because there is no dark palette to switch to.
 */

import type { TextStyle } from "react-native";

export const Palette = {
  // USPS brand. Blue carries the chrome (header bars, primary actions); red is
  // reserved for destructive actions and errors so it keeps its warning value.
  blue: "#004B87",
  blueDark: "#00365F",
  blueTint: "#E7EEF5",

  red: "#DA291C",
  redTint: "#FDECEA",

  success: "#1E7B34",
  successTint: "#EAF6EC",

  // Surfaces. `background` is a cool institutional grey rather than a tinted
  // blue, so white cards read as raised and text contrast is predictable.
  background: "#F2F4F7",
  card: "#FFFFFF",

  // Text. `textMuted` is darker than a typical placeholder grey on purpose:
  // #6B7280 only reaches 4.39:1 against `background`, which fails AA.
  text: "#1A1A1A",
  textMuted: "#4B5563",
  textOnBlue: "#FFFFFF",
  textOnBlueMuted: "#C7D8E6",

  // Lines.
  border: "#D8DCE3",
  divider: "#EAECF0",
  inputBorder: "#8A94A6",
  chevron: "#B5BCC7",

  scrim: "rgba(11, 31, 51, 0.55)",
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

/**
 * Type scale. `as const` matters: without it `fontWeight` widens to `string`
 * and TypeScript rejects the spread into a TextStyle.
 *
 * `tabular` is for clock times, so digits line up in the week table columns.
 */
export const type = {
  h1: { fontSize: 28, fontWeight: "700" },
  h2: { fontSize: 22, fontWeight: "700" },
  title: { fontSize: 17, fontWeight: "600" },
  body: { fontSize: 15, fontWeight: "400" },
  label: { fontSize: 13, fontWeight: "600", letterSpacing: 0.6 },
  caption: { fontSize: 12, fontWeight: "400" },
  tabular: { fontVariant: ["tabular-nums"] },
} as const satisfies Record<string, TextStyle>;

/** Spread these — unlike the old `shadow` export, they are real shadows. */
export const elevation = {
  card: {
    shadowColor: "#0B1F33",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    shadowColor: "#0B1F33",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
} as const;
