import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { ChecklistApp } from '@/src/features/checklists/ChecklistApp';

export default function App() {
  return <SafeAreaProvider>
    <GluestackUIProvider mode="light">
      <SafeAreaView style={{ flex: 1 }}>
        <ChecklistApp />
      </SafeAreaView>
      <StatusBar style="dark" />
    </GluestackUIProvider>
  </SafeAreaProvider>;
}
