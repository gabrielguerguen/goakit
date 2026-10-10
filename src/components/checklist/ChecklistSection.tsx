import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import type { ChecklistCategory, ChecklistItem as Item } from '@/src/types';
import { progress } from '@/src/features/checklists/model';
import { patterns } from '@/src/theme/patterns';
import { ChecklistItem } from './ChecklistItem';

export type ItemFilter = 'Todos' | 'Pendentes' | 'Concluídos';
export function ChecklistSection({ category, items, filter, collapsed, onCollapse, onToggle, onEdit }: {
  category: ChecklistCategory; items: Item[]; filter: ItemFilter; collapsed: boolean;
  onCollapse: () => void; onToggle: (id: string) => void; onEdit: (item: Item) => void;
}) {
  const count = progress(items);
  const visible = items.filter((item) => filter === 'Todos' || (filter === 'Concluídos' ? item.completed : !item.completed));
  if (!items.length) return null;
  return <View className="gap-1">
    <Pressable onPress={onCollapse} accessibilityRole="button" accessibilityState={{ expanded: !collapsed }}
      accessibilityLabel={`${category.name}, ${count.completed} de ${count.total} concluídos`}
      className="flex-row items-center justify-between gap-3 min-h-11">
      <Text className={`${patterns.section} flex-1`}>{category.name}</Text>
      <Text className={patterns.caption}>{count.completed} de {count.total} {collapsed ? '⌄' : '⌃'}</Text>
    </Pressable>
    {!collapsed && (visible.length ? visible.map((item) => <ChecklistItem key={item.id} item={item}
      onToggle={() => onToggle(item.id)} onEdit={() => onEdit(item)} />)
      : <Text className={`${patterns.caption} py-3`}>Nenhum item neste filtro.</Text>)}
  </View>;
}
