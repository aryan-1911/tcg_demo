import { ICheckBoxGroup } from 'Components/common/form';
import { QueryOrder } from 'const';
import {
  GameFormats,
  GameTypes,
  IMatchesFilterQuery,
  MatchTypes
} from 'interfaces';

export const WAIT_MATCH_START = 5; // minutes

export const sortMatchOptions = [
  {
    label: 'Recent',
    value: QueryOrder.RECENT,
  },
  {
    label: 'Highest entry first',
    value: QueryOrder.DESC,
  },
  {
    label: 'Lowest entry first',
    value: QueryOrder.ASC,
  },
];

export const matchFilterCheckboxes: ICheckBoxGroup[] = [
  {
    group_name: 'GAME',
    checkbox: [
      {
        name: 'pokemon',
        label: 'Pokemon TCGO',
      },
      {
        name: 'arena',
        label: 'MTG Arena',
      },
      {
        name: 'duel',
        label: 'Yu-Gi-Oh Master Duel',
      },
      {
        name: 'magic',
        label: 'Magic The Gathering Online',
      },
    ],
  },
  {
    group_name: 'GAME FORMAT',
    checkbox: [
      {
        name: 'standard',
        label: 'Standard',
      },
      {
        name: 'custom',
        label: 'Custom',
      },
      {
        name: 'unlimited',
        label: 'Unlimited',
      },
      {
        name: 'historic',
        label: 'Historic',
      },
      {
        name: 'expanded',
        label: 'Expanded',
      },
      {
        name: 'theme',
        label: 'Theme',
      },
      {
        name: 'modern',
        label: 'Modern',
      },
      {
        name: 'pioneer',
        label: 'Pioneer',
      },
      {
        name: 'legacy',
        label: 'Legacy',
      },
      {
        name: 'vintage',
        label: 'Vintage',
      },
      {
        name: 'pauper',
        label: 'Pauper',
      },
      {
        name: 'advance',
        label: 'Advance',
      },
    ],
  },
  {
    group_name: 'MATCH TYPE',
    checkbox: [
      {
        name: 'bo1',
        label: 'Best of 1',
      },
      {
        name: 'bo3',
        label: 'Best of 3',
      },
      {
        name: 'bo5',
        label: 'Best of 5',
      },
    ],
  },
];

export const matchFilterSliderMarks = [
  {
    value: 0,
    valueReal: 0,
    label: 'All',
  },
  {
    value: 1,
    valueReal: 1,
    label: '1',
  },
  {
    value: 2,
    valueReal: 5,
    label: '5',
  },
  {
    value: 3,
    valueReal: 10,
    label: '10',
  },
];

export const gameTypeLables = {
  [GameTypes.pokemon]: 'Pokemon TCGO',
  [GameTypes.arena]: 'MTG Arena',
  [GameTypes.duel]: 'Yu-Gi-Oh Master Duel',
  [GameTypes.magic]: 'Magic The Gathering Online',
};

export const gameTypeServerLabels = {
  [GameTypes.pokemon]: 'POKEMON TCGO',
  [GameTypes.arena]: 'MTG ARENA',
  [GameTypes.duel]: 'YU-GI-OH MASTER DUEL',
  [GameTypes.magic]: 'MAGIC THE GATHERING ONLINE',
} as const;

export const gameTypeOptions: IOption[] = [
  {
    label: gameTypeLables[GameTypes.pokemon],
    value: GameTypes.pokemon,
  },
  {
    label: gameTypeLables[GameTypes.arena],
    value: GameTypes.arena,
  },
  {
    label: gameTypeLables[GameTypes.duel],
    value: GameTypes.duel,
  },
  {
    label: gameTypeLables[GameTypes.magic],
    value: GameTypes.magic,
  },
];

export const matchFormatLables = {
  [GameFormats.FORMAT_CUSTOM]: 'Custom',
  [GameFormats.FORMAT_STANDART]: 'Standard',
  [GameFormats.FORMAT_EXPANDED]: 'Expanded',
  [GameFormats.FORMAT_HISTORIC]: 'Historic',
  [GameFormats.FORMAT_UNLIMITED]: 'Unlimited',
  [GameFormats.FORMAT_THEME]: 'Theme',
  [GameFormats.FORMAT_MODERN]: 'Modern',
  [GameFormats.FORMAT_PIONEER]: 'Pioneer',
  [GameFormats.FORMAT_LEGACY]: 'Legacy',
  [GameFormats.FORMAT_VINTAGE]: 'Vintage',
  [GameFormats.FORMAT_PAUPER]: 'Pauper',
  [GameFormats.FORMAT_ADVANCE]: 'Advance',
};

export const matchFormatOptions = {
  [GameTypes.arena]: [
    {
      label: matchFormatLables[GameFormats.FORMAT_STANDART],
      value: GameFormats.FORMAT_STANDART,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_HISTORIC],
      value: GameFormats.FORMAT_HISTORIC,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_CUSTOM],
      value: GameFormats.FORMAT_CUSTOM,
    },
  ],
  [GameTypes.pokemon]: [
    {
      label: matchFormatLables[GameFormats.FORMAT_STANDART],
      value: GameFormats.FORMAT_STANDART,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_EXPANDED],
      value: GameFormats.FORMAT_EXPANDED,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_UNLIMITED],
      value: GameFormats.FORMAT_UNLIMITED,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_THEME],
      value: GameFormats.FORMAT_THEME,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_CUSTOM],
      value: GameFormats.FORMAT_CUSTOM,
    },
  ],
  [GameTypes.duel]: [
    {
      label: matchFormatLables[GameFormats.FORMAT_ADVANCE],
      value: GameFormats.FORMAT_ADVANCE,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_CUSTOM],
      value: GameFormats.FORMAT_CUSTOM,
    },
  ],
  [GameTypes.magic]: [
    {
      label: matchFormatLables[GameFormats.FORMAT_STANDART],
      value: GameFormats.FORMAT_STANDART,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_MODERN],
      value: GameFormats.FORMAT_MODERN,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_PIONEER],
      value: GameFormats.FORMAT_PIONEER,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_LEGACY],
      value: GameFormats.FORMAT_LEGACY,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_VINTAGE],
      value: GameFormats.FORMAT_VINTAGE,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_PAUPER],
      value: GameFormats.FORMAT_PAUPER,
    },
    {
      label: matchFormatLables[GameFormats.FORMAT_CUSTOM],
      value: GameFormats.FORMAT_CUSTOM,
    },
  ],
};

export const matchTypeLables = {
  [MatchTypes.TYPE_BEST_OF_1]: 'Best of 1',
  [MatchTypes.TYPE_BEST_OF_3]: 'Best of 3',
  [MatchTypes.TYPE_BEST_OF_5]: 'Best of 5',
};
export const matchTypeOptions: IOption[] = [
  {
    label: matchTypeLables[MatchTypes.TYPE_BEST_OF_1],
    value: MatchTypes.TYPE_BEST_OF_1,
  },
  {
    label: matchTypeLables[MatchTypes.TYPE_BEST_OF_3],
    value: MatchTypes.TYPE_BEST_OF_3,
  },
  {
    label: matchTypeLables[MatchTypes.TYPE_BEST_OF_5],
    value: MatchTypes.TYPE_BEST_OF_5,
  },
];

export const matchEntryOptions = [
  {
    price: 1,
    totalPrice: 1.8,
  },
  {
    price: 5,
    totalPrice: 9,
  },
  {
    price: 10,
    totalPrice: 18,
  },
];

export const resetMatchFilter = (): IMatchesFilterQuery => {
  return {
    arena: false,
    bo1: false,
    bo3: false,
    bo5: false,
    custom: false,
    duel: false,
    magic: false,
    expanded: false,
    historic: false,
    theme: false,
    modern: false,
    pioneer: false,
    legacy: false,
    vintage: false,
    pauper: false,
    entry: matchFilterSliderMarks[0].valueReal,
    my_matches: false,
    pokemon: false,
    standard: false,
    unlimited: false,
    advance: false,
  };
};

export const matchMessages = {
  BALANCE_ERROR: 'Insufficient funds',
  HAVE_ACTIVE_MATCH: 'You have active match.',
  EMPTY_INGAME_NAME: {
    title: `You don’t have an in-game name!`,
    subtitle: `Add to profile page.`,
  },
};
