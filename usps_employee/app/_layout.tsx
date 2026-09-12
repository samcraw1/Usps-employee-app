import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { Palette } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Pinned light: the screens are light-only, so following the OS into dark mode
// only painted a near-black nav background behind them and flashed on push.
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Palette.background,
    card: Palette.card,
    primary: Palette.blue,
    border: Palette.border,
    text: Palette.text,
  },
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={navigationTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Palette.background },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="sign-in" />
        </Stack>
        {/* The top band is USPS blue on every screen, so icons must be light. */}
        <StatusBar style="light" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
