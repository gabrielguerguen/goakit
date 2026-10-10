/**
 * Provisional presentation types for the in-memory prototype.
 * Not database/API contracts. No defaults or product rules are implemented here.
 * See docs/decisions.md before implementing behavior based on these types.
 */
export type Visibility = 'visible' | 'hidden';
export type ItemVisibility = Visibility | 'inherit';

// These options describe demo contexts, not the final quiz wording or controls.
export type Accommodation =
  | 'own-camping'
  | 'provided-camping'
  | 'cabin'
  | 'nearby-hotel';
export type Transport = 'car' | 'plane' | 'group-bus';
export type WeatherCondition = 'cold' | 'mild' | 'hot' | 'rain';

export interface TripContext {
  durationDays: number;
  expectedWeather: WeatherCondition[];
  accommodation: Accommodation;
  transport: Transport;
  thermalSensitivity: {
    cold: boolean;
    heat: boolean;
  };
}

export type QuizDraft = Partial<TripContext>;

export interface ChecklistCategory {
  id: string;
  name: string;
  visibility: Visibility;
}

export interface ChecklistItem {
  id: string;
  categoryId: string;
  name: string;
  // Runtime validation and fraction/unit policy must be defined before editing UI.
  quantity: number;
  completed: boolean;
  visibility: ItemVisibility;
  origin: 'suggested' | 'custom' | 'copied';
  catalogItemId?: string;
}

export type ChecklistOrigin =
  | { kind: 'quiz' }
  | { kind: 'manual' }
  | { kind: 'reused'; sourceChecklistId: string }
  | { kind: 'shared-copy'; sourceSnapshotId: string };

export interface Checklist {
  id: string;
  title: string;
  context?: TripContext;
  origin: ChecklistOrigin;
  categories: ChecklistCategory[];
  items: ChecklistItem[];
}

// Catalog data and personal items remain separate objects.
export interface CatalogItem {
  id: string;
  name: string;
  categoryKey: string;
}

export type AdaptationChange =
  | {
      kind: 'add-item';
      categoryId: string;
      name: string;
      quantity: number;
      catalogItemId?: string;
    }
  | { kind: 'remove-item'; itemId: string }
  | {
      kind: 'change-quantity';
      itemId: string;
      previousQuantity: number;
      suggestedQuantity: number;
    };

export interface AdaptationSuggestion {
  id: string;
  reason: string;
  change: AdaptationChange;
  decision: 'pending' | 'accepted' | 'rejected';
}

export interface AdaptationReview {
  // Review works on a new independent target; it never mutates the source list.
  targetChecklistId: string;
  nextContext: TripContext;
  suggestions: AdaptationSuggestion[];
}

// Public projections intentionally contain no progress, privacy metadata,
// personal item IDs or travel context. Construct with an explicit field allowlist.
export interface ShareableItem {
  readonly name: string;
  readonly quantity: number;
}

export interface ShareableCategory {
  readonly name: string;
  readonly items: readonly ShareableItem[];
}

export interface ShareableChecklist {
  readonly title: string;
  readonly categories: readonly ShareableCategory[];
}

export type ShareFormat = 'link' | 'jpg' | 'text';

export interface DemoPublishedSnapshot {
  readonly id: string;
  readonly simulated: true;
  readonly content: ShareableChecklist;
}

// Scenario state only: no real session, credentials, URL, queue or network call.
export type DemoIdentity =
  | { status: 'anonymous' }
  | { status: 'identified'; simulated: true; displayName: string };

export type DemoPublicationState =
  | { status: 'unpublished'; simulated: true }
  | { status: 'identification-required'; simulated: true }
  | {
      status: 'publishing' | 'pending';
      simulated: true;
      preview: ShareableChecklist;
      lastPublished?: DemoPublishedSnapshot;
    }
  | {
      status: 'published';
      simulated: true;
      lastPublished: DemoPublishedSnapshot;
    }
  | {
      status: 'failed';
      simulated: true;
      preview: ShareableChecklist;
      lastPublished?: DemoPublishedSnapshot;
      message: string;
    };

export type DemoConnection = 'online' | 'offline';
