import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { AppButton, Note, PageHeading } from '@/src/components/shared/Controls';
import { patterns } from '@/src/theme/patterns';
import type { Checklist } from '@/src/types';
import { progress } from './model';

export const accommodationLabels = {
  'own-camping': 'camping próprio', 'provided-camping': 'camping montado', cabin: 'cabana', 'nearby-hotel': 'hotel próximo',
};
export function tripDescription(list: Checklist) {
  return list.context ? `${list.context.durationDays} dias · ${accommodationLabels[list.context.accommodation]}` : 'Lista pessoal';
}
export function HomeScreen({ lists, onOpen }: { lists: Checklist[]; onOpen: (id: string) => void }) {
  return <View className="gap-4">
    <Text className={`${patterns.label} text-muted-foreground`}>MINHAS LISTAS</Text>
    <PageHeading title={lists.length ? 'Qual é a próxima?' : 'Prepare sua próxima viagem'}
      description={lists.length ? 'Suas listas e seu progresso ficam com você.' : 'Uma lista que considera como você vai viver o festival.'} />
    {lists.length ? lists.map((list) => {
      const count = progress(list.items);
      return <View key={list.id} className="gap-3">
        <View className="rounded-lg border border-border p-4 gap-2">
          <Text className={patterns.cardTitle}>{list.title}</Text>
          <Text className={patterns.caption}>{tripDescription(list)}</Text>
          <Text className={patterns.body}>{count.completed} de {count.total} itens concluídos</Text>
        </View>
        <AppButton secondary onPress={() => onOpen(list.id)}>{`Abrir checklist · ${list.title}`}</AppButton>
      </View>;
    }) : <>
      <View className="gap-4 py-8">
        <Text className="text-[22px] leading-[30px] font-semibold text-foreground">Menos coisas na cabeça.</Text>
        <Text className={patterns.body}>Responda algumas perguntas e ajuste a sugestão do seu jeito.</Text>
      </View>
      <Note>Você pode criar e usar suas listas sem conta. Nesta demonstração, os dados duram apenas durante a sessão.</Note>
    </>}
    <View className="gap-2 pt-2">
      <AppButton disabled>{lists.length ? 'Criar nova lista' : 'Criar minha primeira lista'}</AppButton>
      {lists.length ? <AppButton secondary disabled>Reaproveitar uma lista</AppButton> : null}
      <Text className={patterns.caption}>Quiz e reaproveitamento entram na próxima entrega. Use os controles de demonstração abaixo para explorar este primeiro fluxo.</Text>
    </View>
  </View>;
}
