import type { ReactNode } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { patterns } from '@/src/theme/patterns';

export function AppButton({ children, onPress, secondary = false, disabled = false, danger = false }: {
  children: string; onPress?: () => void; secondary?: boolean; disabled?: boolean; danger?: boolean;
}) {
  return <Button onPress={onPress} isDisabled={disabled} accessibilityLabel={children}
    variant={danger ? 'destructive' : secondary ? 'outline' : 'default'}
    className="min-h-12 rounded-lg border-primary px-4 py-3">
    <ButtonText className="text-[16px] leading-[24px] font-semibold shrink">{children}</ButtonText>
  </Button>;
}

export function Note({ children }: { children: ReactNode }) {
  return <View className="border-l-[3px] border-muted-foreground bg-muted p-3">
    <Text className={patterns.caption}>{children}</Text>
  </View>;
}

export function PageHeading({ title, description }: { title: string; description?: string }) {
  return <View className="gap-2">
    <Heading accessibilityRole="header" className={patterns.title}>{title}</Heading>
    {description ? <Text className={`${patterns.body} text-muted-foreground`}>{description}</Text> : null}
  </View>;
}

export function BackButton({ children, onPress }: { children: string; onPress: () => void }) {
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={children}
    className="min-h-11 justify-center self-start pr-4">
    <Text className={patterns.label}>‹ {children}</Text>
  </Pressable>;
}

export function Dialog({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <Modal transparent animationType="fade" visible onRequestClose={onClose}>
    <View className="flex-1 items-center justify-center bg-black/40 p-6">
      <View accessibilityViewIsModal className="w-full max-w-[390px] rounded-xl bg-background p-6 gap-4">
        <Heading accessibilityRole="header" className={patterns.cardTitle}>{title}</Heading>
        <ScrollView style={{ maxHeight: 400 }} keyboardShouldPersistTaps="handled">
          <View className="gap-3">{children}</View>
        </ScrollView>
        <AppButton secondary onPress={onClose}>Cancelar</AppButton>
      </View>
    </View>
  </Modal>;
}
