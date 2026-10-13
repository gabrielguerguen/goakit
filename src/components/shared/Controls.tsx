import { useState, type ReactNode } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { VariableContextProvider } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { patterns } from '@/src/theme/patterns';
import { useAppTheme } from '@/src/theme/ThemeProvider';
import { geometry } from '@/src/theme/tokens';

export function AppButton({ children, onPress, secondary = false, disabled = false, danger = false, selected }: {
  children: string; onPress?: () => void; secondary?: boolean; disabled?: boolean; danger?: boolean; selected?: boolean;
}) {
  const { colors } = useAppTheme();
  const [pressed, setPressed] = useState(false);
  const [size, setSize] = useState({ width: 1, height: 1 });
  // CSS 120° projected onto the measured rectangle (works with wrapped labels).
  const length = size.width * Math.sin(Math.PI / 3) + size.height * 0.5;
  const dx = Math.sin(Math.PI / 3) * length / size.width / 2;
  const dy = 0.5 * length / size.height / 2;
  const primary = !secondary && !danger;
  return <Button onPress={onPress} isDisabled={disabled} accessibilityLabel={children}
    accessibilityState={{ disabled, ...(selected === undefined ? {} : { selected }) }}
    onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)}
    onLayout={({ nativeEvent }) => setSize(nativeEvent.layout)}
    variant={primary ? 'default' : 'outline'}
    className={`min-h-12 rounded-xl px-5 py-3 overflow-hidden ${danger ? 'border-destructive' : ''}`}>
    {primary && !disabled ? <LinearGradient pointerEvents="none"
      colors={[colors.primary, colors['primary-end']]} start={{ x: 0.5 - dx, y: 0.5 - dy }} end={{ x: 0.5 + dx, y: 0.5 + dy }}
      style={StyleSheet.absoluteFill} /> : null}
    {pressed && !disabled ? <View pointerEvents="none" style={[StyleSheet.absoluteFill,
      { backgroundColor: primary ? colors['primary-foreground'] : colors.foreground, opacity: geometry.pressedOpacity }]} /> : null}
    <ButtonText className={`text-[16px] leading-[24px] font-app-semibold font-normal shrink text-center ${danger ? 'text-destructive' : ''}`}>{children}</ButtonText>
  </Button>;
}

export function Note({ children }: { children: ReactNode }) {
  return <View className="rounded-xl bg-muted p-4">
    <Text className={patterns.caption}>{children}</Text>
  </View>;
}

export function PageHeading({ title, description }: { title: string; description?: string }) {
  return <View className="gap-3">
    <Heading accessibilityRole="header" className={patterns.title}>{title}</Heading>
    {description ? <Text className={`${patterns.body} text-muted-foreground`}>{description}</Text> : null}
  </View>;
}

export function BackButton({ children, onPress }: { children: string; onPress: () => void }) {
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={children}
    className={`min-h-12 min-w-12 justify-center self-start pr-4 rounded-xl active:bg-muted ${patterns.focus}`}>
    <Text className={`${patterns.label} text-primary`}>‹ {children}</Text>
  </Pressable>;
}

export function Dialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const { variables } = useAppTheme();
  return <Modal transparent animationType="none" visible onRequestClose={onClose}>
    <VariableContextProvider value={variables}>
    <View className="flex-1 items-center justify-center bg-black/40 p-6">
      <View accessibilityViewIsModal className="w-full max-w-[390px] rounded-2xl border border-border bg-background p-6 gap-4">
        <Heading accessibilityRole="header" className={patterns.cardTitle}>{title}</Heading>
        <ScrollView style={{ maxHeight: 400 }} keyboardShouldPersistTaps="handled">
          <View className="gap-3">{children}</View>
        </ScrollView>
        <AppButton secondary onPress={onClose}>Cancelar</AppButton>
      </View>
    </View>
    </VariableContextProvider>
  </Modal>;
}
