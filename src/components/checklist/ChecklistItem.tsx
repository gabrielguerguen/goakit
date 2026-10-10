import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import type { ChecklistItem as Item } from '@/src/types';
import { patterns } from '@/src/theme/patterns';

export function ChecklistItem({ item, onToggle, onEdit }: { item: Item; onToggle: () => void; onEdit: () => void }) {
  return <View className="flex-row items-center gap-2 border-b border-border min-h-14">
    <Pressable onPress={onToggle} accessibilityRole="checkbox" accessibilityState={{ checked: item.completed }}
      accessibilityLabel={`${item.name}, quantidade ${item.quantity}`} className="flex-1 flex-row items-center gap-3 py-3 min-h-14">
      <View className="w-6 shrink-0 items-start">
        <View className={`h-5 w-5 rounded border border-muted-foreground items-center justify-center ${item.completed ? 'bg-primary' : 'bg-background'}`}>
          {item.completed ? <Text className="text-primary-foreground text-[14px] leading-[18px]">✓</Text> : null}
        </View>
      </View>
      <Text className={`${patterns.body} flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>{item.name}</Text>
    </Pressable>
    <Text className={`${patterns.body} w-8 shrink-0 text-right`} accessibilityLabel={`Quantidade: ${item.quantity}`}>{item.quantity}</Text>
    <Pressable onPress={onEdit} accessibilityRole="button" accessibilityLabel={`Editar ${item.name}`}
      className="w-11 min-h-11 shrink-0 items-center justify-center">
      <Text className="text-[22px] text-foreground">⋮</Text>
    </Pressable>
  </View>;
}
