import { IPagination, PaginationWrapper } from 'interfaces';

export interface IMessagePerson {
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCounts: number;
}

interface IDate {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface IUser {
  avatar: string;
  id: string;
  username: string;
}

export interface ICentrifugeMessage {
  date: IDate;
  message: string;
  sender: string;
  unreadCount: number;
}

export interface ICentrifugeMessageResp {
  data: ICentrifugeMessage;
}

export interface IPreviewDialog {
  avatar: string;
  id: string;
  isAdmin: boolean;
  lastMessage: string;
  lastMessageDate: IDate;
  unread: string;
  username: string;
}

export interface IMessage {
  id: string;
  created: IDate;
  message: string;
  isRead: boolean;
  sender: string;
  receiver: string;
}

interface IDialogPagination extends IPagination {
  limit: number;
}

export interface IDialog {
  messages: IMessage[];
  partner: IUser;
  user: IUser;
  pagination: IDialogPagination;
  id: string;
}

export interface DialogList extends PaginationWrapper {
  data: IPreviewDialog[];
}

export const resetDialogListModel = (): DialogList => ({
  data: [],
  pagination: {
    currentPage: 0,
    pageCount: 0,
    itemCount: 0,
  },
});
