import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import type { ChecklistItem as Item } from '@/src/types';
import { patterns } from '@/src/theme/patterns';

export function ChecklistItem({ item, onToggle, onEdit }: { item: Item; onToggle: () => void; onEdit: () => void }) {
  return <View className="flex-row items-center gap-3 border-b border-border min-h-16">
    <Pressable onPress={onToggle} accessibilityRole="checkbox" accessibilityState={{ checked: item.completed }}
      accessibilityLabel={`${item.name}, quantidade ${item.quantity}`}
      className={`flex-1 flex-row items-center gap-3 py-2 min-h-16 rounded-xl active:bg-muted ${patterns.focus}`}>
      <View className="w-12 h-12 shrink-0 items-center justify-center">
        <View className={`h-6 w-6 rounded-[6px] border-2 items-center justify-center ${item.completed ? 'bg-primary border-primary' : 'bg-background border-border'}`}>
          {item.completed ? <Text className="font-sans text-primary-foreground text-[16px] leading-[20px]">✓</Text> : null}
        </View>
      </View>
      <View className="flex-1 gap-1">
        <Text className={`${patterns.body} font-app-medium font-normal`}>{item.name}</Text>
        {item.origin === 'custom' ? <Text className={patterns.caption}>Item adicionado por você</Text> : null}
      </View>
    </Pressable>
    <Text className={`${patterns.body} font-app-medium font-normal text-muted-foreground w-12 shrink-0 text-center`}
      accessibilityLabel={`Quantidade: ${item.quantity}`}>{item.quantity}</Text>
    <Pressable onPress={onEdit} accessibilityRole="button" accessibilityLabel={`Editar ${item.name}`}
      className={`w-12 min-h-12 shrink-0 items-center justify-center rounded-xl active:bg-muted ${patterns.focus}`}>
      <Text className="font-sans text-[24px] leading-[32px] text-foreground">⋯</Text>
    </Pressable>
  </View>;
}
