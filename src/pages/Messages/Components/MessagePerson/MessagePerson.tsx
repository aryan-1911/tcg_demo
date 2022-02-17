import { Avatar } from 'Components/common/Avatar';
import { formatMessageDate } from 'helpers';
import { IPreviewDialog } from 'interfaces';
import React from 'react';
import './message-person.scss';


interface IMessagePersonProps {
  dialog: IPreviewDialog;
  onClick(): void;
}



export const MessagePerson = (props: IMessagePersonProps) => {
  const {
    dialog: {
      avatar,
      username,
      lastMessage,
      unread,
      lastMessageDate: { date },
    },
    onClick,
  } = props;
  return(
    <div className="message-person" onClick={onClick}>
    <div className="message-person__avatar">
      <Avatar avatar={avatar} />
    </div>
    <div className="message-person__info">
      <span className="message-person__name">{username}</span>
      <span className="message-person__message">{lastMessage}</span>
    </div>
    <div className="message-person__right">
      <span className="message-person__date">{formatMessageDate(date)}</span>
      {Number(unread) > 0 && (
        <span className="message-person__count">{unread}</span>
        )}
    </div>
  </div>
);
};
