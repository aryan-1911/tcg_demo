import { getMatchesAction } from 'actions';
import { matchFormatOptions, QueryOrder, SORT_BY } from 'const';
import { getTime } from 'date-fns';
import {
  GameFormats,
  GameTypes,
  IMatchesFilterQuery,
  MatchFormatFilterOptions,
  MatchGameFilterOptions,
  MatchTypes
} from 'interfaces';
import { IMatchResult } from 'interfaces/centrifuge/match';

export const prepareMatchHistory = (history?: IMatchResult[]) => {
  if (!history) return [];
  return history
    .sort((a, b) => a.attempt - b.attempt)
    .reduce((acc, curr) => {
      const hasIdx = acc.findIndex((a) => a.attempt === curr.attempt);
      if (hasIdx === -1) {
        acc.push({ attempt: curr.attempt });
      }
      return acc;
    }, [] as { attempt: number }[]);
};

export const prepareGetMatchesRequest = (
  params: ReturnType<typeof getMatchesAction>['payload'],
  userId: string,
) => {
  const queryData = {
    ...params,
    game: [
      params.filter?.pokemon && GameTypes.pokemon,
      params.filter?.arena && GameTypes.arena,
      params.filter?.duel && GameTypes.duel,
      params.filter?.magic && GameTypes.magic,
    ].filter(Boolean),
    format: [
      params.filter?.standard && GameFormats.FORMAT_STANDART,
      params.filter?.custom && GameFormats.FORMAT_CUSTOM,
      params.filter?.unlimited && GameFormats.FORMAT_UNLIMITED,
      params.filter?.historic && GameFormats.FORMAT_HISTORIC,
      params.filter?.expanded && GameFormats.FORMAT_EXPANDED,
      params.filter?.theme && GameFormats.FORMAT_THEME,
      params.filter?.modern && GameFormats.FORMAT_MODERN,
      params.filter?.pioneer && GameFormats.FORMAT_PIONEER,
      params.filter?.legacy && GameFormats.FORMAT_LEGACY,
      params.filter?.vintage && GameFormats.FORMAT_VINTAGE,
      params.filter?.pauper && GameFormats.FORMAT_PAUPER,
    ].filter(Boolean),
    type: [
      params.filter?.bo1 && MatchTypes.TYPE_BEST_OF_1,
      params.filter?.bo3 && MatchTypes.TYPE_BEST_OF_3,
      params.filter?.bo5 && MatchTypes.TYPE_BEST_OF_5,
    ].filter(Boolean),
    user_id: params.filter?.my_matches && userId,
    entry: params.filter?.entry,
  };

  if (queryData.sort_direction === QueryOrder.RECENT) {
    queryData.sort_direction = QueryOrder.DESC;
    queryData.sort_by = SORT_BY.created;
  } else {
    queryData.sort_by = SORT_BY.entry;
  }

  delete queryData.filter;
  return queryData;
};

const getDisabledGames = (selectedKeys: string[]): string[] => {
  const selectedFormats: GameFormats[] = selectedKeys
    .map((key) => MatchFormatFilterOptions[key])
    .filter((item) => item !== undefined);

  const disabledGames: GameTypes[] = [];
  for (const key in matchFormatOptions) {
    const gameType: GameTypes = Number((key as unknown) as GameTypes);
    const gameFormats = matchFormatOptions[gameType];
    if (!selectedFormats.every((s) => gameFormats.some((f) => f.value === s))) {
      disabledGames.push(Number(gameType));
    }
  }

  const result = disabledGames.map((game) => {
    let result = '';
    Object.keys(MatchGameFilterOptions).map((key) => {
      if (MatchGameFilterOptions[key] === game) {
        result = key;
        return;
      }
    });

    return result;
  });

  return result;
};

const getDisabledFormats = (selectedKeys: string[]): string[] => {
  const selectedGames: GameTypes[] = selectedKeys
    .map((key) => MatchGameFilterOptions[key])
    .filter((item) => item !== undefined);

  const allFormats = Object.keys(MatchFormatFilterOptions).map((key) => ({
    name: key,
    type: MatchFormatFilterOptions[key],
  }));

  const result: string[] = [];
  for (const key in matchFormatOptions) {
    const gameType: GameTypes = Number((key as unknown) as GameTypes);

    if (selectedGames.some((g) => g === gameType)) {
      const gameFormats = matchFormatOptions[gameType];
      const disabled = allFormats
        .filter((f) => !gameFormats.some((g) => g.value === f.type))
        .map((g) => g.name);

      result.splice(result.length, 0, ...disabled);
    }
  }

  return result;
};

export const getDisabledFilterOptions = (
  query: IMatchesFilterQuery,
): string[] => {
  const selectedKeys = Object.keys(query).filter((k) => query[k]);

  const disabledGames = getDisabledGames(selectedKeys);
  const disabledFormats = getDisabledFormats(selectedKeys);

  return [...disabledGames, ...disabledFormats];
};

export const getWinLabel = (profileId, winner, onDispute, status) => {
  const isWin = profileId === winner;
  let label;

  /*
    OnDispute = 1 => Dispute
    OnDispute = 0 && Winner is set => Won/lost
    OnDispute = 0 && Winner = null && status=2 => REFUNDED
    OnDispute = 0 && Winner = null && status=3 => VOID

    Flags : WON | LOST | DISPUTE | REFUNDED | VOID 

  */

  // if (!winner) {
  //   label = onDispute === '1' ? 'dispute' : null;
  // } else {
  //   label = isWin ? 'won' : 'lost';
  // }

  if (onDispute === '1') {
    label = 'dispute';
  } else if (status === 3) {
    label = 'void'
  } else if (status === 2 && winner === null) {
    label = 'refunded';
  } else if (winner) {
    label = isWin ? 'won' : 'lost';
  } else {
    label = null;
  }
  return label;
};

export const getTimeDiff = (date) => {
  return getTime(Date.now() - getTime(new Date(date)));
};

export const checkCurrentMatchOnCreateDispute = (disputeMatchid, activeMatchId) => {
  if (activeMatchId) {
    let isMatch = activeMatchId === disputeMatchid;
    return isMatch;
  } else {
    return false;
  }
}
