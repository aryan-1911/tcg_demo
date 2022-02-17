import { createDisputeAction, fetchUserInfoAction, getMatchesAction, saveDisputeDataAction, toggleSecondaryMatchModalAction } from 'actions';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import PageHeader from 'Components/PageHeader';
import { DisputeRoute } from 'const';
import { checkCurrentMatchOnCreateDispute, makeSelector } from 'helpers';
import { useFormInModal, usePagination } from 'hooks';
import { IDisputeFormValues, IUserProfileResp } from 'interfaces';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './dispute-page.scss';
import DisputeForm from './DisputeForm';


function DisputePage() {
  const dispatch = useDispatch();
  const { activeCompetitionId } = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );



  const history = useHistory();

  const handleSubmit = (data: IDisputeFormValues, reset: () => void) => {
    dispatch(createDisputeAction(data, {
      redirect: (res) => {
        savedCallback(reset);
        let disputeMatchId = res.payload.competition;
        let closeActiveMatch = checkCurrentMatchOnCreateDispute(disputeMatchId, activeCompetitionId);
        let isError = res.res.error;
        dispatch(fetchUserInfoAction(null));
        dispatch(getMatchesAction({}));
        if (!isError) {
          //Clear the data we store on history locatin state through 2nd attempt dispute btn at result submition    
          history.push({ pathname: DisputeRoute.ROOT, state: {} });
          history.replace({});
          dispatch(saveDisputeDataAction({
            attachments: [],
            competition: '',
            game_partner_name: '',
            game_user_name: '',
            text: '',
          }));
        }
        if (closeActiveMatch && !isError) {
          dispatch(
            toggleSecondaryMatchModalAction({
              competition: null,
              type: null,
              isCollapse: false,
            }),
          );
        }
      }
    }));
  };

  const { getList, queryParams, sortValue, filters, isLoading } = usePagination({
    getListAction: getMatchesAction,
    queryName: 'matchesQueryParams',
    reducerName: 'matchesReducer',
  });

  useEffect(() => {
    getList(queryParams, sortValue, filters)
  }, [])

  const savedCallback = (reset: () => void) => () => {
    reset();
    openEditor()();
  };

  // PROMPTS
  const { isPrompt, closeEditor, openEditor } = useFormInModal([], '');

  return (
    <>
      <PageHeader title="Create Dispute" />
      <DisputeForm onSubmit={handleSubmit} />
      <UniversalModal
        title="Submitted"
        type="info"
        onCancel={closeEditor}
        visible={isPrompt}
        onOk={closeEditor}
        promptText="Please give us up to 24 hours to solve your dispute"
      />
    </>
  );
}

export default DisputePage;
