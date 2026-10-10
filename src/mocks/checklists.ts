import type { Checklist, ChecklistItem, TripContext } from '@/src/types';

const groups = [
  ['camping', 'Camping', ['Barraca', 'Saco de dormir', 'Colchonete', 'Lanterna', 'Cadeira dobrável', 'Lona']],
  ['clothes', 'Roupas', ['Camisetas', 'Roupas íntimas', 'Meias', 'Agasalho', 'Capa de chuva', 'Calçado confortável']],
  ['care', 'Cuidados pessoais', ['Medicamento pessoal', 'Protetor solar', 'Escova de dentes', 'Pasta de dentes', 'Protetor auricular', 'Toalha']],
  ['documents', 'Documentos', ['Documento com foto', 'Ingresso', 'Cartão de emergência']],
  ['food', 'Alimentação', ['Garrafa de água', 'Lanches', 'Caneca']],
] as const;

function fixture(id: string, title: string, hotel: boolean): Checklist {
  const categories = groups.filter(([key]) => !hotel || key !== 'camping').map(([key, name]) => ({
    id: `${id}-${key}`, name, visibility: key === 'care' ? 'hidden' as const : 'visible' as const,
  }));
  const items: ChecklistItem[] = groups.flatMap(([key, , names]) => !hotel || key !== 'camping'
    ? names.map((name) => ({ key, name })) : []).map(({ key, name }, index) => ({
      id: `${id}-item-${index}`, categoryId: `${id}-${key}`, name,
      quantity: ['Camisetas', 'Roupas íntimas', 'Meias', 'Lanches'].includes(name) ? (hotel ? 3 : 4) : 1,
      completed: hotel || index < 8, visibility: 'inherit' as const, origin: 'suggested' as const,
    }));
  const context: TripContext = {
    durationDays: hotel ? 3 : 4, accommodation: hotel ? 'nearby-hotel' : 'own-camping',
    transport: 'car', expectedWeather: ['hot', 'cold', 'rain'],
    thermalSensitivity: { cold: true, heat: false },
  };
  return { id, title, context, categories, items, origin: { kind: 'quiz' } };
}

// Fresh objects on every reset. Visibility is a fixture hypothesis, not a product default.
export function createExampleChecklists(): Checklist[] {
  return [fixture('serra', 'Festival da Serra', false), fixture('vale', 'Festival do Vale', true)];
}

export function createEmptyChecklist(id: string): Checklist {
  return {
    id, title: 'Minha lista de teste', origin: { kind: 'manual' }, items: [],
    categories: groups.map(([key, name]) => ({ id: `${id}-${key}`, name, visibility: 'hidden' })),
  };
}
