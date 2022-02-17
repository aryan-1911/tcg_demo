import { CentrifugeChanels } from 'const';
import { GameFormats, GameTypes, MatchTypes } from 'interfaces';

interface IUser {
  id: string;
  avatar: string;
  username: string;
  gamename: string;
}

export type CompetitionStatuses =
  | 'NEW'
  | 'STARTED'
  | 'ACCEPTED'
  | 'FINISHED'
  | 'RESULT_SUBMITTED'
  | 'RESULT_CONFLICT'
  | 'RESULT_DISPUTE'
  | 'UNDEFINED';

export interface IMatchResult {
  id: string;
  sender: {
    id: string;
    username: string;
  };
  winner: {
    id: string;
    username: string;
  };
  attempt: number;
  created: string;
}
export interface ICentrifugeAcceptMatch {
  action?: CentrifugeChanels;
  isOwner?: boolean;
  response?: 'accept' | 'decline';
  status?: CompetitionStatuses;
  competition: {
    acceptedBy: IUser;
    created: string;
    createdBy: IUser;
    entry: number;
    format: GameFormats;
    game: GameTypes;
    id: string;
    rule: string | null;
    status: number;
    type: MatchTypes;
    prize: number;
    started?: string;
    finished?: string;
    results: IMatchResult[];
    winner: IUser | null | string;
    userId: string;
    onDispute?: string;
  };
  isResultCreator?: boolean;
  winner?: {
    username: string;
    uuid: string;
  };
}
export interface ICentrifugeAcceptMatchResp {
  data: ICentrifugeAcceptMatch;
}
