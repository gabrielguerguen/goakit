import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { BackHandler, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { createEmptyChecklist, createExampleChecklists } from '@/src/mocks/checklists';
import { AppButton, Dialog, Note } from '@/src/components/shared/Controls';
import { patterns } from '@/src/theme/patterns';
import type { ChecklistItem } from '@/src/types';
import { checklistReducer } from './model';
import { HomeScreen } from './HomeScreen';
import { ChecklistScreen } from './ChecklistScreen';
import { ItemEditorScreen } from './ItemEditorScreen';

type Route = { name: 'home' } | { name: 'checklist'; listId: string }
  | { name: 'editor'; listId: string; item: ChecklistItem; editing: boolean };
let nextId = 0;
const uniqueId = () => `demo-${Date.now()}-${++nextId}`;

export function ChecklistApp() {
  const [lists, dispatch] = useReducer(checklistReducer, undefined, createExampleChecklists);
  const [route, setRoute] = useState<Route>({ name: 'home' });
  const [controls, setControls] = useState(false);
  const [reset, setReset] = useState<'empty' | 'examples' | null>(null);
  const [feedback, setFeedback] = useState('');
  const scroll = useRef<ScrollView>(null);
  const list = route.name !== 'home' ? lists.find((entry) => entry.id === route.listId) : undefined;
  const back = useCallback(() => {
    if (route.name === 'editor') setRoute({ name: 'checklist', listId: route.listId });
    else setRoute({ name: 'home' });
  }, [route]);
  useEffect(() => {
    const event = BackHandler.addEventListener('hardwareBackPress', () => {
      if (route.name === 'home') return false;
      back(); return true;
    });
    return () => event.remove();
  }, [route.name, back]);
  useEffect(() => { scroll.current?.scrollTo({ y: 0, animated: false }); }, [route.name]);
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(''), 4500);
    return () => clearTimeout(timer);
  }, [feedback]);
  const edit = (item?: ChecklistItem) => {
    if (!list) return;
    setRoute({ name: 'editor', listId: list.id, editing: !!item, item: item ? { ...item } : {
      id: uniqueId(), name: '', quantity: 1, categoryId: list.categories[0]?.id ?? '',
      completed: false, origin: 'custom', visibility: 'inherit',
    } });
  };
  return <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView ref={scroll} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="w-full max-w-[430px] self-center bg-background px-6 pt-2 pb-6 gap-6 flex-1">
        {route.name === 'home' ? <HomeScreen lists={lists} onOpen={(listId) => setRoute({ name: 'checklist', listId })} /> : null}
        {route.name === 'checklist' && list ? <ChecklistScreen key={list.id} list={list} onBack={back} onAdd={() => edit()}
          onEdit={edit} onToggle={(itemId) => dispatch({ type: 'toggle-item', listId: list.id, itemId })} /> : null}
        {route.name === 'editor' && list ? <ItemEditorScreen key={route.item.id} list={list} initialItem={route.item}
          editing={route.editing} onCancel={back} onSave={(item) => {
            dispatch({ type: 'save-item', listId: list.id, item });
            setRoute({ name: 'checklist', listId: list.id }); setFeedback('Item salvo.');
          }} onRemove={() => {
            dispatch({ type: 'remove-item', listId: list.id, itemId: route.item.id });
            setRoute({ name: 'checklist', listId: list.id }); setFeedback('Item removido.');
          }} /> : null}
        {feedback ? <View accessibilityLiveRegion="polite"><Note>{feedback}</Note></View> : null}
        {route.name === 'home' ? <View className="border-t border-border pt-4 gap-3">
          <Pressable accessibilityRole="button" accessibilityState={{ expanded: controls }} onPress={() => setControls((open) => !open)} className="min-h-11 justify-center">
            <Text className={patterns.caption}>Demonstração · controles de teste {controls ? '⌃' : '⌄'}</Text>
          </Pressable>
          {controls ? <>
            <Note>Dados fictícios em memória. Recarregar o aplicativo restaura os exemplos. Trocar cenário abaixo descarta as edições desta sessão.</Note>
            <AppButton secondary onPress={() => setReset('empty')}>Começar sem listas</AppButton>
            <AppButton secondary onPress={() => setReset('examples')}>Restaurar exemplos</AppButton>
            <AppButton secondary onPress={() => {
              const empty = createEmptyChecklist(uniqueId());
              dispatch({ type: 'add-list', list: empty }); setRoute({ name: 'checklist', listId: empty.id });
            }}>Testar uma lista vazia</AppButton>
          </> : null}
        </View> : null}
      </View>
    </ScrollView>
    {reset ? <Dialog title="Trocar cenário de teste?" onClose={() => setReset(null)}>
      <Text className={patterns.body}>As alterações atuais serão descartadas. Isso afeta somente esta demonstração.</Text>
      <AppButton onPress={() => {
        dispatch({ type: 'replace', lists: reset === 'examples' ? createExampleChecklists() : [] });
        setReset(null); setFeedback('Cenário de teste atualizado.');
      }}>Confirmar troca de cenário</AppButton>
    </Dialog> : null}
  </KeyboardAvoidingView>;
}
