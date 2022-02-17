import { clearSelectedDialogAction, getAllDialogsAction, getMatchesAction } from 'actions';
import { Button } from 'Components/common/form';
import PageHeader from 'Components/PageHeader';
import { MessagesRoute } from 'const';
import { useFormInModal, usePagination } from 'hooks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { MessageChat } from './Components/MessageChat';
import { MessageModal } from './Components/MessageModal';
import './messages-page.scss';


function MessagesPage() {
  // New message modal
  const dispatch = useDispatch();
  const { getList, queryParams, sortValue, filters, isLoading } = usePagination({
    getListAction: getMatchesAction,
    queryName: 'matchesQueryParams',
    reducerName: 'matchesReducer',
  });
  const { username } = useParams<{ username: string }>();
  const history = useHistory();
  const { isPrompt, closeEditor, openEditor } = useFormInModal([], '');


  const createBtn = (
    <Button onClick={openEditor()} btnType="create" btnStyle="white-fill">
      New message
    </Button>
  );

  useEffect(() => {
    dispatch(getAllDialogsAction(null));
    getList(queryParams, sortValue, filters)
    return () => {
      dispatch(clearSelectedDialogAction(null));
    };
  }, []);

  useEffect(() => {
    if (username) {
      openEditor()();
    }
  }, [username]);

  const handleClose = () => {
    history.replace(MessagesRoute.ROOT);
    closeEditor();
  };

  return (
    <div className="messages-page">
      <PageHeader title="My Messages" btns={createBtn} />
      <div className="messages-page__box">
        <MessageChat />
      </div>
      <MessageModal
        defaultValues={{ username }}
        isPrompt={isPrompt}
        closeEditor={handleClose}
      />
    </div>
  );
}

export default MessagesPage;
