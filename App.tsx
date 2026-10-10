import './global.css';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <SafeAreaView style={{ flex: 1 }}>
          <Box className="flex-1 items-center justify-center bg-background px-6">
            <VStack className="w-full max-w-md gap-6">
              <Text className="text-primary" bold>GOAKIT</Text>
              <Heading size="3xl">Seu próximo aplicativo começa aqui.</Heading>
              <Text className="text-muted-foreground">
                Expo, Gluestack UI e TypeScript configurados para criar suas primeiras telas.
              </Text>
              <Button size="lg" onPress={() => setCount((value) => value + 1)}>
                <ButtonText>Testar interação</ButtonText>
              </Button>
              <Text accessibilityLiveRegion="polite">
                {count === 0 ? 'Toque no botão para começar.' : `Interações: ${count}`}
              </Text>
            </VStack>
          </Box>
        </SafeAreaView>
        <StatusBar style="dark" />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
