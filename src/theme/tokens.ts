// Paper “Design system · Refração”, revision 0.2, October 12, 2026.
// Single color source for NativeWind and native-only props.
export const palettes = {
  light: {
    background: '#FFFFFF', card: '#F8F1F6', foreground: '#231532',
    muted: '#F8F1F6', 'muted-foreground': '#693F59', border: '#916469',
    primary: '#A13F7D', 'primary-foreground': '#FFFFFF', 'primary-end': '#7F3A82',
    success: '#356B59', warning: '#8A4E24', destructive: '#9F2949', accent: '#FCAC75',
  },
  dark: {
    background: '#19132A', card: '#291A2F', foreground: '#F8F1F6',
    muted: '#291A2F', 'muted-foreground': '#CBA1A3', border: '#9D86A2',
    primary: '#E3B6B2', 'primary-foreground': '#451E3B', 'primary-end': '#F3C39F',
    success: '#95C9B1', warning: '#FCAC75', destructive: '#F3A0AE', accent: '#FCAC75',
  },
} as const;
export type ThemeMode = keyof typeof palettes;
export type ThemePreference = ThemeMode | 'system';
export const geometry = {
  spacing: [4, 8, 12, 16, 24, 32, 48, 64],
  radius: { badge: 8, control: 12, panel: 16, checkbox: 6 },
  touchTarget: 48, rowMinHeight: 64, mobilePadding: 24,
  disabledOpacity: 0.45, pressedOpacity: 0.08,
} as const;
