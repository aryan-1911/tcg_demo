import { Avatar } from 'Components/common/Avatar';
import {
  FORMAT_DATE_WITH_TIME_CST,
  gameTypeLables,
  matchFormatLables,
  matchTypeLables
} from 'const';
import { formatDateWithFormat, formatPrice, getWinLabel } from 'helpers';
import { useRedirectToUserProfile } from 'hooks/useRedirectToUserProfile';
import { IMatch } from 'interfaces';
import { ICentrifugeAcceptMatch } from 'interfaces/centrifuge/match';
import React from 'react';
import './match-card.scss';


interface IMatchCardProps {
  matchData: IMatch | ICentrifugeAcceptMatch['competition'];
  isCutVersion?: boolean;
  profileId: string;
  myProfileId?: string;
  onClick?(): void;
}

export const MatchCard = (props: IMatchCardProps) => {
  const {
    matchData: { entry, format, type, prize, game, winner, userId, onDispute ,status},
    profileId,
    isCutVersion = false,
    myProfileId,
    onClick,
  } = props;

  const { handleRedirectToUser } = useRedirectToUserProfile();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const renderEntry = () => {
    return (
      <div className="game-card-entry">
        <span className="game-card-entry__text">Entry:</span>
        <span className="game-card-entry__price">
          <span className="game-card-entry__price-ico">$</span>
          <span className="game-card-entry__price-val">
            {formatPrice(entry, false)}
          </span>
        </span>
      </div>
    );
  };

  const renderBottom = () => {
    if (isCutVersion) {
      return null;
    }
    const {
      status,
      avatar,
      username,
      partnerAvatar,
      partnerUsername,
      partnerUserId,
      created: { date },
    } = props.matchData as IMatch;

    const isSelf = profileId === userId;
    const matchUserId = status && isSelf ? partnerUserId : userId;
    const partnerName = status && isSelf ? partnerUsername : username;
    const partnerAva = status && isSelf ? partnerAvatar : avatar;
    const isSelfAva = myProfileId === matchUserId;
    const redirectData = {
      isSelf: isSelfAva,
      userId: matchUserId,
      callback: null,
    };

    return (
      <div className="game-card__bottom">
        <div
          className="game-card-author"
          onClick={(e) => handleRedirectToUser(e, redirectData)}
        >
          <div className="game-card-author__avatar">
            <Avatar avatar={partnerAva} />
          </div>
          <div className="game-card-author__cont">
            <span className="game-card-author__name">{partnerName}</span>
            <span className="game-card-author__time">
              {/* {formatFn(FORMAT_DATE_WITH_TIME)(date)} */}
              {formatDateWithFormat( date,FORMAT_DATE_WITH_TIME_CST)}
            </span>          
          </div>
        </div>
        {renderEntry()}
      </div>
    );
  };

  const renderWinLabel = () => {
    const label = getWinLabel(profileId, winner, onDispute,status);
    if (label) {
      return <span className={`game-card__label ${label}`}>{label}</span>;
    }
  };

  return (
    <div className={`game-card ${isCutVersion ? 'game-card--small' : ''}`}>
      <div className="game-card__box" onClick={handleClick}>
        <div className="game-card__top">
          <div className="game-card__info">
            <span className="game-card__name">
              {gameTypeLables[game]} {renderWinLabel()}
            </span>
            <div className="game-card-types">
              <span className="game-card-types__text">
                {matchFormatLables[format]}
              </span>
              <span className="game-card-types__text">
                {matchTypeLables[type]}
              </span>
            </div>
          </div>
          <div className="game-card-prize">
            <div className="game-card-prize__box">
              <div className="game-card-prize__price">
                <span className="game-card-prize__price-ico">$</span>
                <span className="game-card-prize__price-val">
                  {formatPrice(prize, false)}
                </span>
              </div>
              <span className="game-card-prize__text">
                total prize{isCutVersion ? ':' : ''}
              </span>
            </div>
            {isCutVersion && renderEntry()}
          </div>
        </div>
        {renderBottom()}
      </div>
    </div>
  );
};
