import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '@/components/ui/text';
import type { Checklist, ChecklistItem } from '@/src/types';
import { AppButton, BackButton, Dialog, Note, PageHeading } from '@/src/components/shared/Controls';
import { useAppTheme } from '@/src/theme/ThemeProvider';
import { patterns } from '@/src/theme/patterns';
import { itemError } from './model';

export function ItemEditorScreen({ list, initialItem, editing, onCancel, onSave, onRemove }: {
  list: Checklist; initialItem: ChecklistItem; editing: boolean; onCancel: () => void;
  onSave: (item: ChecklistItem) => void; onRemove: () => void;
}) {
  const { colors } = useAppTheme();
  const [draft, setDraft] = useState(() => ({ ...initialItem }));
  const [error, setError] = useState<string | null>(null);
  const [dialog, setDialog] = useState<'category' | 'remove' | null>(null);
  const category = list.categories.find((entry) => entry.id === draft.categoryId);
  const save = () => {
    const message = itemError(draft, list);
    setError(message);
    if (!message) onSave({ ...draft, name: draft.name.trim() });
  };
  return <View className="gap-4">
    <BackButton onPress={onCancel}>Cancelar</BackButton>
    <PageHeading title={editing ? 'Editar item' : 'Adicionar item'} description={editing ? list.title : 'Inclua o que faz diferença para você.'} />
    <View className="gap-2">
      <Text nativeID="item-name-label" className={patterns.label}>Nome do item</Text>
      <TextInput accessibilityLabel="Nome do item" accessibilityLabelledBy="item-name-label" value={draft.name}
        onChangeText={(name) => { setDraft((item) => ({ ...item, name })); setError(null); }}
        maxLength={120} placeholder="Ex.: Protetor auricular" placeholderTextColor={colors['muted-foreground']}
        className={`${patterns.field} ${patterns.body}`} style={error ? { borderColor: colors.destructive } : undefined}
        accessibilityHint={error ?? undefined}
        returnKeyType="done" onSubmitEditing={save} />
      {error ? <Text accessibilityRole="alert" className="font-app-medium font-normal text-destructive text-[14px] leading-[20px]">{error}</Text> : null}
    </View>
    <View className="gap-2">
      <Text className={patterns.label}>Quantidade</Text>
      <View className={`${patterns.field} flex-row items-center justify-between gap-3`}>
        <Pressable accessibilityRole="button" accessibilityLabel="Diminuir quantidade" disabled={draft.quantity <= 1}
          accessibilityState={{ disabled: draft.quantity <= 1 }} className={`w-12 min-h-12 border border-border rounded-xl items-center justify-center active:bg-muted ${patterns.focus} ${draft.quantity <= 1 ? 'opacity-[0.45]' : ''}`}
          onPress={() => setDraft((item) => ({ ...item, quantity: Math.max(1, item.quantity - 1) }))}>
          <Text className="font-sans text-[20px] text-foreground">−</Text>
        </Pressable>
        <Text accessibilityLiveRegion="polite" accessibilityLabel={`Quantidade: ${draft.quantity}`} className={patterns.body}>{draft.quantity}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Aumentar quantidade" disabled={draft.quantity >= 999}
          accessibilityState={{ disabled: draft.quantity >= 999 }} className={`w-12 min-h-12 border border-border rounded-xl items-center justify-center active:bg-muted ${patterns.focus} ${draft.quantity >= 999 ? 'opacity-[0.45]' : ''}`}
          onPress={() => setDraft((item) => ({ ...item, quantity: Math.min(999, item.quantity + 1) }))}>
          <Text className="font-sans text-[20px] text-foreground">+</Text>
        </Pressable>
      </View>
    </View>
    <View className="gap-2">
      <Text className={patterns.label}>Categoria</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`Categoria: ${category?.name ?? 'Escolher categoria'}`}
        onPress={() => setDialog('category')} className={`${patterns.field} flex-row justify-between items-center gap-2`}>
        <Text className={`${patterns.body} flex-1`}>{category?.name ?? 'Escolher categoria'}</Text>
        <Text className={patterns.body}>⌄</Text>
      </Pressable>
    </View>
    <Note>As escolhas de privacidade do exemplo são preservadas. A configuração de visibilidade será disponibilizada em outro bloco.</Note>
    <View className="gap-3 pt-2">
      <AppButton onPress={save}>{editing ? 'Salvar alterações' : 'Salvar item'}</AppButton>
      {editing ? <AppButton danger onPress={() => setDialog('remove')}>Remover item</AppButton> : null}
    </View>
    {dialog === 'category' ? <Dialog title="Escolher categoria" onClose={() => setDialog(null)}>
      {list.categories.map((entry) => <Pressable key={entry.id} accessibilityRole="radio"
        accessibilityState={{ checked: draft.categoryId === entry.id }} accessibilityLabel={entry.name}
        className="flex-row min-h-12 items-center justify-between gap-3 border-b border-border py-3"
        onPress={() => { setDraft((item) => ({ ...item, categoryId: entry.id })); setDialog(null); }}>
        <Text className={patterns.body}>{entry.name}</Text>
        {draft.categoryId === entry.id ? <Text className={patterns.body}>✓</Text> : null}
      </Pressable>)}
    </Dialog> : null}
    {dialog === 'remove' ? <Dialog title="Remover este item?" onClose={() => setDialog(null)}>
      <Text className={patterns.body}>“{initialItem.name}” será removido desta lista.</Text>
      <AppButton danger onPress={onRemove}>Confirmar remoção</AppButton>
    </Dialog> : null}
  </View>;
}
