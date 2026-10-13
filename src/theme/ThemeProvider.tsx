import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { VariableContextProvider } from 'nativewind';
import { palettes, type ThemeMode, type ThemePreference } from './tokens';

const ThemeContext = createContext<{
  variables: Record<`--${string}`, string>; mode: ThemeMode; preference: ThemePreference;
  setPreference: (value: ThemePreference) => void; colors: typeof palettes[ThemeMode];
} | null>(null);

export function ThemeProvider({ children, fontsReady }: { children: ReactNode; fontsReady: boolean }) {
  const system = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>('system');
  const mode = preference === 'system' ? system === 'dark' ? 'dark' : 'light' : preference;
  const colors = palettes[mode];
  const variables = useMemo(() => {
    const values: Record<`--${string}`, string> = {};
    for (const [name, value] of Object.entries(colors)) values[`--${name}`] = value;
    Object.assign(values, {
      '--input': colors.border, '--ring': colors.primary,
      '--secondary': colors.card, '--secondary-foreground': colors.foreground,
      '--popover': colors.background, '--popover-foreground': colors.foreground,
      '--accent-foreground': colors.foreground,
    });
    const fallback = Platform.OS === 'web' ? 'sans-serif' : 'System';
    values['--app-font-regular'] = fontsReady ? 'Inter_400Regular' : fallback;
    values['--app-font-medium'] = fontsReady ? 'Inter_500Medium' : fallback;
    values['--app-font-semibold'] = fontsReady ? 'Inter_600SemiBold' : fallback;
    values['--app-font-bold'] = fontsReady ? 'Inter_700Bold' : fallback;
    return values;
  }, [colors, fontsReady]);
  return <ThemeContext value={{ mode, preference, setPreference, colors, variables }}>
    <VariableContextProvider value={variables}>{children}</VariableContextProvider>
  </ThemeContext>;
}

export function useAppTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useAppTheme requires ThemeProvider');
  return theme;
}
