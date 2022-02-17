import { matchFilterSliderMarks } from 'const';
import { PaginationWrapper } from 'interfaces';

export enum MatchStatus {
  open,
  finish,
}

export interface IMatch {
  id: string;
  prize: number;
  entry: number;
  format: GameFormats;
  type: MatchTypes;
  game: GameTypes;
  rule?: string;
  avatar: string | null;
  created: {
    date: string;
    timezone: string;
    timezone_type: number;
  };
  status: MatchStatus;
  winner: string | null;
  onDispute?: string;
  gamename: string | null;
  username: string;
  nickname?: string;
  userId: string;
  partnerAvatar?: string | null;
  partnerUsername?: string;
  partnerUserId?: string;
  partnerGamename?: string;
}

export interface IMatchesFilterQuery {
  arena: boolean;
  bo1: boolean;
  bo3: boolean;
  bo5: boolean;
  custom: boolean;
  duel: boolean;
  magic: boolean;
  expanded: boolean;
  historic: boolean;
  theme: boolean;
  modern: boolean;
  pioneer: boolean;
  legacy: boolean;
  vintage: boolean;
  pauper: boolean;
  my_matches: boolean;
  pokemon: boolean;
  standard: boolean;
  unlimited: boolean;
  entry?: number;
  advance: boolean;
}

export interface IMatchFormValues extends IMatch {
  terms_and_conditions?: boolean;
}

export enum GameTypes {
  pokemon = 1,
  arena = 2,
  duel = 3,
  magic = 4,
}

export enum GameFormats {
  FORMAT_STANDART = 1,
  FORMAT_CUSTOM = 2,
  FORMAT_UNLIMITED = 3,
  FORMAT_HISTORIC = 4,
  FORMAT_EXPANDED = 5,
  FORMAT_THEME = 6,
  FORMAT_MODERN = 7,
  FORMAT_PIONEER = 8,
  FORMAT_LEGACY = 9,
  FORMAT_VINTAGE = 10,
  FORMAT_PAUPER = 11,
  FORMAT_ADVANCE = 12,
}

export enum MatchTypes {
  TYPE_BEST_OF_1 = 1,
  TYPE_BEST_OF_3 = 3,
  TYPE_BEST_OF_5 = 5,
}

export enum MatchSecondaryModalTypes {
  match_started = 'match_started',
  match_accept = 'match_accept',
  match_result = 'match_result',
  null = '',
  competition_complete = 'competition_complete',
  competition_add_result = 'competition_add_result',
  competition_wait_opponent = 'competition_wait_opponent',
  competition_conflict = 'competition_conflict',
  competition_dispute = 'competition_dispute',
  custom_competition_dispute = 'custom_competition_dispute',
  competition_void = 'COMPETITION_VOID',
  competition_challenge = 'challenge',
  competition_expired = 'competition_expired',
}

export const MatchGameFilterOptions = {
  pokemon: GameTypes.pokemon,
  arena: GameTypes.arena,
  duel: GameTypes.duel,
  magic: GameTypes.magic,
};

export const MatchFormatFilterOptions = {
  custom: GameFormats.FORMAT_CUSTOM,
  standard: GameFormats.FORMAT_STANDART,
  unlimited: GameFormats.FORMAT_UNLIMITED,
  historic: GameFormats.FORMAT_HISTORIC,
  expanded: GameFormats.FORMAT_EXPANDED,
  theme: GameFormats.FORMAT_THEME,
  modern: GameFormats.FORMAT_MODERN,
  pioneer: GameFormats.FORMAT_PIONEER,
  legacy: GameFormats.FORMAT_LEGACY,
  vintage: GameFormats.FORMAT_VINTAGE,
  pauper: GameFormats.FORMAT_PAUPER,
  advnace: GameFormats.FORMAT_ADVANCE,

};

export interface MatchList extends PaginationWrapper {
  data: IMatch[];
}

export const resetMatchModel = (): IMatch => ({
  id: '',
  username: '',
  prize: 0,
  entry: matchFilterSliderMarks[1].valueReal,
  format: GameFormats.FORMAT_CUSTOM,
  type: MatchTypes.TYPE_BEST_OF_1,
  game: GameTypes.arena,
  rule: '',
  avatar: null,
  created: {
    date: new Date().toDateString(),
    // date: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    timezone: '',
    timezone_type: 0,
  },
  gamename: '',
  nickname: '',
  userId: '',
  status: MatchStatus.open,
  winner: null,
});

export const resetMatchListModel = (): MatchList => ({
  data: [],
  pagination: {
    currentPage: 0,
    pageCount: 0,
    itemCount: 0,
  },
});

export interface MatchResults {
  'result-1'?: string;
  'result-2'?: string;
  'result-3'?: string;
  'result-4'?: string;
  'result-5'?: string;
}

export const matchResults = {
  'result-1': '',
  'result-2': '',
  'result-3': '',
  'result-4': '',
  'result-5': '',
};

export interface ISendMatchResult {
  competitionId: string;
  winner: string[];
}
