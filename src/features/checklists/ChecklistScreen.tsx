import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import type { Checklist, ChecklistItem } from '@/src/types';
import { ChecklistSection, type ItemFilter } from '@/src/components/checklist/ChecklistSection';
import { AppButton, BackButton, PageHeading, Note } from '@/src/components/shared/Controls';
import { patterns } from '@/src/theme/patterns';
import { progress } from './model';
import { tripDescription } from './HomeScreen';

export function ChecklistScreen({ list, onBack, onAdd, onEdit, onToggle }: {
  list: Checklist; onBack: () => void; onAdd: () => void;
  onEdit: (item: ChecklistItem) => void; onToggle: (id: string) => void;
}) {
  const [filter, setFilter] = useState<ItemFilter>('Todos');
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const count = progress(list.items);
  return <View className="gap-4">
    <BackButton onPress={onBack}>Minhas listas</BackButton>
    <PageHeading title={list.title} description={tripDescription(list)} />
    <Text className={`${patterns.body} font-semibold`} accessibilityLiveRegion="polite">{count.completed} de {count.total} itens concluídos</Text>
    <View accessibilityRole="progressbar" accessibilityLabel="Preparação concluída"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(count.percent), text: `${count.completed} de ${count.total}` }}
      className="h-1.5 bg-border rounded overflow-hidden">
      <View className="h-full bg-primary rounded" style={{ width: `${count.percent}%` }} />
    </View>
    <View className="flex-row flex-wrap gap-2">
      {(['Todos', 'Pendentes', 'Concluídos'] as const).map((value) => <Pressable key={value} onPress={() => setFilter(value)}
        accessibilityRole="button" accessibilityState={{ selected: filter === value }}
        className={`min-h-11 rounded-md p-2 justify-center ${filter === value ? 'bg-border' : 'bg-background'}`}>
        <Text className={patterns.label}>{value}</Text>
      </Pressable>)}
    </View>
    {!list.items.length ? <Note>Sua lista está vazia. Adicione o primeiro item.</Note> : list.categories.map((category) =>
      <ChecklistSection key={category.id} category={category} items={list.items.filter((item) => item.categoryId === category.id)}
        filter={filter} collapsed={collapsed.includes(category.id)}
        onCollapse={() => setCollapsed((ids) => ids.includes(category.id) ? ids.filter((id) => id !== category.id) : [...ids, category.id])}
        onToggle={onToggle} onEdit={onEdit} />)}
    <View className="gap-2 pt-2">
      <AppButton secondary onPress={onAdd}>Adicionar item</AppButton>
      <AppButton disabled>Compartilhar</AppButton>
      <Text className={patterns.caption}>Compartilhamento e privacidade serão implementados em outro bloco.</Text>
    </View>
  </View>;
}
