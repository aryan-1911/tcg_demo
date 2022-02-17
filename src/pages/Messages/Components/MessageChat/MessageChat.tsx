import { useTypedController } from '@hookform/strictly-typed';
import { Icon } from '@material-ui/core';
import {
  getAllDialogsAction,
  getDialogAction,
  getMessagePersonListAction
} from 'actions';
import { FormTextInput } from 'Components/common/form';
import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
import { makeSelector } from 'helpers';
import { useLoading } from 'hooks';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  AutoSizer,
  Index,
  IndexRange,
  InfiniteLoader,
  List,
  ListRowProps
} from 'react-virtualized';
import { MessagesReducerState } from 'reducers';
import { MessagePerson } from '../MessagePerson';
import './message-chat.scss';
import MessageBoard from './MessageBoard';



interface IFormValues {
  search: string;
}

export const MessageChat = () => {
  const dispatch = useDispatch();

  const navRef = useRef<HTMLDivElement>(null);

  const [isBoardActive, setBoardActive] = useState(false);

  const {
    dialogList: {
      data: dialogs,
      pagination: { currentPage, pageCount, itemCount },
    },
    selectedDialog,
    messagesQueryParams,
  } = useSelector<any, MessagesReducerState>(makeSelector(['messagesReducer']));

  const { control, handleSubmit, getValues, watch } = useForm<IFormValues>({
    defaultValues: {
      search: '',
    },
  });

  const TypedController: any = useTypedController({ control });

  const watchedSearch = watch('search');

  const isLoading = useLoading('messagesReducer');

  useEffect(() => {
    dispatch(
      getAllDialogsAction({
        search: watchedSearch,
        page: 1,
      }),
    );
  }, [watchedSearch]);

  const handleSearch = (data: IFormValues) => {
    dispatch(getMessagePersonListAction(data.search));
  };

  const handleCloseDialog = () => {
    setBoardActive(false);
  };

  const handleChooseDialog = (id: string) => () => {
    if (selectedDialog?.id !== id) {
      dispatch(getDialogAction({ id, queryParam: {} }));
    }
    setBoardActive(true);
  };

  const submit = handleSubmit(handleSearch);

  const remoteRowCount = itemCount;

  function isRowLoaded({ index }: Index) {
    return !!dialogs[index];
  }

  const loadMoreRows = debounce(({ startIndex, stopIndex }: IndexRange) => {
    const limit = messagesQueryParams.limit || 1;

    const isLastPage = currentPage === pageCount - 1;
    let nextPage = Math.round(stopIndex / limit);

    if (isLastPage) {
      nextPage = pageCount;
    }

    if (nextPage - currentPage > 1) {
      nextPage = nextPage - 1;
    }

    if (nextPage !== currentPage) {
      dispatch(
        getAllDialogsAction({
          page: nextPage,
        }),
      );
    }

    return Promise.resolve();
  }, 200);

  const renderRow = ({ index, key, style, isScrolling }: ListRowProps) => {
    const dialog = dialogs[index];
    const isActive =
      selectedDialog &&
      dialog &&
      dialog.username === selectedDialog.partner.username;
    return (
      <div
        className={`message-chat-persons__item ${isActive ? 'is-active' : ''}`}
        style={style}
        key={key}
      >
        {!dialog ? (
          <LoadingButton />
        ) : (
          <MessagePerson
            dialog={dialog}
            onClick={handleChooseDialog(dialog.id)}
          />
        )}
      </div>
    );
  };

  const isAdmin = () => {
    let dialog;

    if (selectedDialog) {
      dialog = dialogs.find((item) => {
        // return item.id === selectedDialog.id;
      });
    }
    return dialog ? dialog.isAdmin : dialog;
  };

  return (
    <div
      className={`message-chat ${selectedDialog ? 'message-chat--active' : ''}`}
    >
      <form className="message-chat-nav" onSubmit={submit}>
        <TypedController
          name="search"
          render={(props) => (
            <FormTextInput
              className="message-chat-nav__search"
              type="text"
              name="search"
              placeholder="Search…"
              preffix={<Icon className="icon-search" />}
              {...props}
            />
          )}
        />
        <div className="message-chat-persons" ref={navRef}>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows as any}
            rowCount={remoteRowCount}
          >
            {({ onRowsRendered, registerChild }) => {
              return (
              <AutoSizer>
                {() => (
                  <List
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    rowCount={remoteRowCount}
                    rowHeight={81}
                    rowRenderer={renderRow}
                    height={navRef.current?.clientHeight || 0}
                    width={navRef.current?.clientWidth || 0}
                  />
                )}
              </AutoSizer>
            )
            }}
          </InfiniteLoader>
        </div>
      </form>
      <div className={`message-chat__board${isBoardActive ? ' active' : ''}`}>
        <MessageBoard
          isAdmin={isAdmin()}
          handleCloseDialog={handleCloseDialog}
        />
      </div>
    </div>
  );
};
