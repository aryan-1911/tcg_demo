import { useTypedController } from '@hookform/strictly-typed';
import { Icon } from '@material-ui/core';
import {
  deleteDialogAction,
  getDialogAction,
  sendMessageAction
} from 'actions';
import { IDropDownOption } from 'Components/common/DropDownMenu';
import { Button, FormTextArea } from 'Components/common/form';
import { LoadingButton } from 'Components/common/form/LoadingButton/LoadingButton';
import { ShowToastError } from 'Components/Toast';
import {
  MESSAGE_CANT_MESSAGE,
  MESSAGE_QUERY_LIMIT,
  MESSAGE_VALIDATION
} from 'const';
import { makeSelector } from 'helpers';
import { useLoading, usePrevious } from 'hooks';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
  ListRowProps
} from 'react-virtualized';
import { MessagesReducerState } from 'reducers';
import { EmptyState, MessageBoardHead, SingleMessage } from './components';

interface IProps {
  isAdmin: boolean;
  handleCloseDialog: () => void;
}

function MessageBoard(props: IProps) {
  const { isAdmin, handleCloseDialog } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const [scrollTopIdx, setScrollTopIdx] = useState<number | undefined>(
    MESSAGE_QUERY_LIMIT - 1,
  );

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 50,
  });

  const { selectedDialog } = useSelector<any, MessagesReducerState>(
    makeSelector(['messagesReducer']),
  );

  const selectedDialogLink = useSelector<any, any>((state: any) =>
    state.getIn(['messagesReducer', 'selectedDialog']),
  );

  const isLoading = useLoading('messagesReducer');
  const prevSelectedDialog = usePrevious(selectedDialog);

  const debounceScrollTop = debounce((idx) => {
    setScrollTopIdx(idx);
  }, 10);

  const scrollToBottom = () => {
    const hasDialogs = Boolean(prevSelectedDialog) && Boolean(selectedDialog);
    const lastIdx = (selectedDialog?.messages.length || 0) - 1;
    const prevMessages = [...(prevSelectedDialog?.messages || [])];
    const currentMessages = [...(selectedDialog?.messages || [])];

    // change dialogs
    if (
      (!prevSelectedDialog && selectedDialog) ||
      (hasDialogs && prevSelectedDialog?.id !== selectedDialog?.id)
    ) {
      setScrollTopIdx(lastIdx);
      return;
    }

    // new messages
    if (hasDialogs) {
      const prevMsg = prevMessages.pop();
      const currentMsg = currentMessages.pop();

      if (
        new Date(prevMsg?.created.date || 0) <
        new Date(currentMsg?.created.date || 0)
      ) {
        setScrollTopIdx(lastIdx - 1);
        debounceScrollTop(lastIdx);
        return;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, selectedDialogLink]);

  const { control, handleSubmit, reset, errors, watch } = useForm<{
    message: string;
  }>({
    defaultValues: {
      message: '',
    },
  });

  const watchedMessage = watch('message');

  const TypedController: any = useTypedController({ control });

  const submit = handleSubmit((data) => {
    const receiver = selectedDialog?.partner.id || '';
    dispatch(
      sendMessageAction(
        {
          receiver,
          message: data.message,
        },
        {
          redirect: () => {
            dispatch(getDialogAction({ id: receiver, queryParam: {} }));
            reset();
          },
        },
      ),
    );
  });

  const handleDeleteDialog = () => {
    if (selectedDialog) {
      dispatch(deleteDialogAction(selectedDialog.id));
      handleCloseDialog();
    }
  };

  const handleRedirect = (path: string) => () => {
    history.push(path);
  };

  const loadMoreRows = useCallback(() => {
    if (selectedDialog && !isLoading) {
      const { itemCount, currentPage, pageCount } = selectedDialog.pagination;
      const nextPage = currentPage + 1;
      const needLoad =
        selectedDialog.messages.length < itemCount && nextPage <= pageCount;

      if (needLoad) {
        dispatch(
          getDialogAction({
            id: selectedDialog.partner.id,
            queryParam: { page: nextPage },
          }),
        );
      }
    }

    return Promise.resolve();
  }, [dispatch, isLoading, selectedDialog]);

  const menuOptions: IDropDownOption[] = [
    {
      label: 'Delete dialog',
      onClick: handleDeleteDialog,
    },
  ];

  const handlerFocusDisabledInput = () => {
    isAdmin &&
      ShowToastError({
        title: MESSAGE_CANT_MESSAGE,
      });
  };

  const renderEmptyState = () => {
    return <EmptyState />;
  };

  const renderMessage = ({ index, key, style, parent }: ListRowProps) => {
    if (!selectedDialog) return null;

    const { messages, user, partner } = selectedDialog;

    const message = messages[index];
    if (!message) return null;

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <SingleMessage
          handleRedirect={handleRedirect}
          message={message}
          partner={partner}
          user={user}
          style={style}
        />
      </CellMeasurer>
    );
  };

  const renderContent = () => {
    if (!selectedDialog) return renderEmptyState();

    const { messages, user, partner, pagination } = selectedDialog;

    return (
      <>
        <MessageBoardHead
          handleCloseDialog={handleCloseDialog}
          handleRedirect={handleRedirect}
          menuOptions={menuOptions}
          partner={partner}
        />
        <div className="message-board-messages">
      {isLoading ? <LoadingButton></LoadingButton>:<InfiniteLoader
            isRowLoaded={({ index }) => {
              if (index > 0 || isLoading) {
                return true;
              }
              return !Boolean(prevSelectedDialog);
            }}
            threshold={1}
            loadMoreRows={loadMoreRows}
            rowCount={pagination.itemCount}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={renderMessage}
                    rowClassName="table-row"
                    width={width}
                    height={height}
                    rowHeight={cache.rowHeight}
                    deferredMeasurementCache={cache}
                    scrollToIndex={scrollTopIdx}
                    scrollToAlignment="end"
                    rowCount={messages.length}
                    rowGetter={({ index }) => messages[index]}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader> } 

        </div>
        <form className="message-board-answer" onSubmit={submit}>
          <div className="message-board-answer__input">
            {/* <TypedController
              name="message"
              rules={MESSAGE_VALIDATION}
              render={(props) => (
                <FormTextInput
                  type="text"
                  name="search"
                  placeholder="Enter message…"
                  {...props}
                  handlerFocusDisabledInput={handlerFocusDisabledInput}
                />
                )}
                /> */}
            <TypedController
              name="message"
              rules={MESSAGE_VALIDATION}
              render={(props) => (
                  <FormTextArea
                  name="textarea"
                  placeholder="Enter message…"
                  {...props}
                  />
                )}
                />                
          </div>
          <Button
            preffix={<Icon className="icon-message-letter" />}
            btnStyle="red"
            onClick={submit}
            className="message-board-answer__btn"
            disabled={Boolean(errors.message || !watchedMessage)}
          >
            send message
          </Button>
        </form>
      </>
    );
  };

  return <div className="message-board">{renderContent()}</div>;
}

export default MessageBoard;
