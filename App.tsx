import './global.css';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { ChecklistApp } from '@/src/features/checklists/ChecklistApp';
import { ThemeProvider, useAppTheme } from '@/src/theme/ThemeProvider';

function AppContent({ ready }: { ready: boolean }) {
  const { mode, colors } = useAppTheme();
  return <GluestackUIProvider mode="system">
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {ready ? <ChecklistApp /> : <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator accessibilityLabel="Carregando aplicativo" color={colors.primary} />
      </View>}
    </SafeAreaView>
    <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
  </GluestackUIProvider>;
}

export default function App() {
  const [loaded, error] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });
  return <SafeAreaProvider>
    <ThemeProvider fontsReady={loaded}>
      <AppContent ready={loaded || !!error} />
    </ThemeProvider>
  </SafeAreaProvider>;
}
