import test from 'node:test';
import assert from 'node:assert/strict';
import { checklistReducer, progress } from '../src/features/checklists/model.ts';
import { createExampleChecklists, createEmptyChecklist } from '../src/mocks/checklists.ts';

test('quantity does not weight progress, toggling does not mutate another list', () => {
  const original = createExampleChecklists();
  const list = original[0];
  const target = list.items.find((item) => item.quantity > 1);
  const state = checklistReducer(original, { type: 'toggle-item', listId: list.id, itemId: target.id });
  assert.equal(progress(state[0].items).completed, progress(list.items).completed + (target.completed ? -1 : 1));
  assert.equal(progress(state[0].items).total, list.items.length);
  assert.deepEqual(state[1], original[1]);
  assert.notEqual(state[0].items.find((item) => item.id === target.id).completed, target.completed);
});

test('editing preserves identity/completion and updates only the selected duplicate name', () => {
  const list = createExampleChecklists()[0];
  const first = list.items[0];
  const duplicate = { ...first, id: 'duplicate' };
  list.items.push(duplicate);
  const edited = { ...first, quantity: 2, name: '  Barraca nova  ', categoryId: list.categories[1].id };
  const result = checklistReducer([list], { type: 'save-item', listId: list.id, item: edited })[0];
  assert.equal(result.items[0].name, 'Barraca nova');
  assert.equal(result.items[0].completed, first.completed);
  assert.equal(result.items[0].categoryId, list.categories[1].id);
  assert.deepEqual(result.items.at(-1), duplicate);
  assert.equal(first.name, 'Barraca');
});

test('invalid names, quantities and foreign categories cannot enter state', () => {
  const list = createExampleChecklists()[0];
  for (const patch of [{ name: ' ' }, { quantity: 0 }, { quantity: NaN }, { quantity: 1.5 }, { quantity: Infinity }, { quantity: 1000 }, { categoryId: 'foreign' }]) {
    const result = checklistReducer([list], { type: 'save-item', listId: list.id, item: { ...list.items[0], ...patch } });
    assert.equal(result[0], list);
  }
});

test('adding and removing the last item yields a finite empty progress', () => {
  const list = createEmptyChecklist('empty');
  const item = { ...createExampleChecklists()[0].items[0], id: 'new', categoryId: list.categories[0].id, completed: false };
  const withItem = checklistReducer([list], { type: 'save-item', listId: list.id, item });
  assert.equal(withItem[0].items.length, 1);
  const removed = checklistReducer(withItem, { type: 'remove-item', listId: list.id, itemId: item.id });
  assert.deepEqual(progress(removed[0].items), { completed: 0, total: 0, percent: 0 });
});

test('reset restores independent fixture objects and the displayed 8/24 and 18/18 counts', () => {
  const first = createExampleChecklists();
  const second = createExampleChecklists();
  first[0].items[0].name = 'Changed';
  assert.equal(second[0].items[0].name, 'Barraca');
  assert.equal(progress(second[0].items).completed, 8);
  assert.equal(progress(second[0].items).total, 24);
  assert.equal(progress(second[1].items).completed, 18);
  assert.equal(progress(second[1].items).total, 18);
});
