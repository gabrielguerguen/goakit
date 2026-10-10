import type { Checklist, ChecklistItem } from '@/src/types';

export type ChecklistAction =
  | { type: 'replace'; lists: Checklist[] }
  | { type: 'add-list'; list: Checklist }
  | { type: 'toggle-item'; listId: string; itemId: string }
  | { type: 'save-item'; listId: string; item: ChecklistItem }
  | { type: 'remove-item'; listId: string; itemId: string };

export function progress(items: readonly ChecklistItem[]) {
  const completed = items.filter((item) => item.completed).length;
  return { completed, total: items.length, percent: items.length ? completed / items.length * 100 : 0 };
}

export function itemError(item: Pick<ChecklistItem, 'name' | 'quantity' | 'categoryId'>, list: Checklist): string | null {
  if (!item.name.trim()) return 'Informe o nome do item.';
  if (item.name.trim().length > 120) return 'Use até 120 caracteres no nome.';
  if (!Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 999) {
    return 'Use uma quantidade inteira entre 1 e 999.';
  }
  if (!list.categories.some((category) => category.id === item.categoryId)) return 'Escolha uma categoria desta lista.';
  return null;
}

export function checklistReducer(state: Checklist[], action: ChecklistAction): Checklist[] {
  if (action.type === 'replace') return action.lists;
  if (action.type === 'add-list') return [...state, action.list];
  return state.map((list) => {
    if (list.id !== action.listId) return list;
    if (action.type === 'toggle-item') return { ...list, items: list.items.map((item) =>
      item.id === action.itemId ? { ...item, completed: !item.completed } : item) };
    if (action.type === 'remove-item') return { ...list, items: list.items.filter((item) => item.id !== action.itemId) };
    if (itemError(action.item, list)) return list;
    const item = { ...action.item, name: action.item.name.trim() };
    return { ...list, items: list.items.some((existing) => existing.id === item.id)
      ? list.items.map((existing) => existing.id === item.id ? item : existing) : [...list.items, item] };
  });
}
