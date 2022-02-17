import { Icon } from '@material-ui/core';
import { Avatar } from 'Components/common/Avatar';
import { DropDownMenu, IDropDownOption } from 'Components/common/DropDownMenu';
import { Button } from 'Components/common/form';
import { ProfileRoute } from 'const';
import { formatMessageDate } from 'helpers';
import { IMessage, IUser } from 'interfaces';
import React from 'react';

export const MessageBoardHead = (props: {
  partner: IUser;
  menuOptions: IDropDownOption[];
  handleCloseDialog(): void;
  handleRedirect(path: string): () => void;
}) => {
  const { handleCloseDialog, handleRedirect, partner, menuOptions } = props;
  return (
    <div className="message-board__head">
      <Button className="message-board__head-back" onClick={handleCloseDialog}>
        ⟶
      </Button>
      <Button
        className="message-board__user"
        onClick={handleRedirect(ProfileRoute.getSpecificRoute(partner.id))}
      >
        <>
          <Avatar
            avatar={partner.avatar}
            className="message-board__user-avatar"
          />
          <span className="message-board__user-name">{partner.username}</span>
        </>
      </Button>
      <DropDownMenu options={menuOptions} />
    </div>
  );
};

export const EmptyState = () => {
  return (
    <div className="message-board-empty">
      <div className="message-board-empty__box">
        <Icon className="icon-chat-empty" />
        <span className="message-board-empty__text">
          Please select a dialog or <b>create a new one</b>
        </span>
      </div>
    </div>
  );
};

export const SingleMessage = ({
  style,
  user,
  partner,
  message,
  handleRedirect,
}: {
  style: any;
  user: IUser;
  partner: IUser;
  message: IMessage;
  handleRedirect(path: string): () => void;
}) => {
  const {
    sender,
    message: text,
    created: { date },
  } = message;

  const isMine = sender === user.id;
  const avatar = isMine ? user.avatar : partner.avatar;

  const redirectPath = isMine
    ? ProfileRoute.ROOT
    : ProfileRoute.getSpecificRoute(partner.id);

  return (
    <div
      style={style}
      className={`message-board-messages__item ${isMine ? 'is-mine' : ''}`}
    >
      <div className="message-board-messages__box">
        <Button
          className="message-board-messages__avatar"
          onClick={handleRedirect(redirectPath)}
        >
          <Avatar avatar={avatar} />
        </Button>

        <div className="message-board-messages__content">
          <span className="message-board-messages__text">{text}</span>
          <span className="message-board-messages__date">
            {formatMessageDate(date)}
          </span>
        </div>
      </div>
    </div>
  );
};
