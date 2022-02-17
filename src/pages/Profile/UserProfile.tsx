import { fetchUserInfoAction, getMatchesAction, getUserAction } from 'actions';
import PageHeader from 'Components/PageHeader';
import { ProfileRoute } from 'const';
import { makeSelector } from 'helpers';
import { usePagination } from 'hooks';
import { ISpecificProfileResp, IUserProfileResp, MatchList } from 'interfaces';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import './user-profile.scss';
import { UserCompletedProfile } from './UserCompletedProfile/UserCompletedProfile';

const UserProfile = (props: RouteChildrenProps<{ id: string }>) => {
  const { history, match } = props;

  const specificId = match?.params.id;
  const isSpecificPage = Boolean(specificId);

  const reducerName = isSpecificPage ? 'userReducer' : 'profileReducer';

  const dispatch = useDispatch();

  const userData = useSelector<any, IUserProfileResp | ISpecificProfileResp>(
    makeSelector([reducerName, 'userData']),
  );

  const matchList = useSelector<any, MatchList>(
    makeSelector([reducerName, 'matchList']),
  );

  const { id: myProfileId } = useSelector<any, IUserProfileResp>(
    makeSelector(['profileReducer', 'userData']),
  );

  const handleRedirect = (path: string) => () => history.push(path);

  const { getList, queryParams, sortValue, filters, isLoading } = usePagination({
    getListAction: getMatchesAction,
    queryName: 'matchesQueryParams',
    reducerName: 'matchesReducer',
  });


  useEffect(() => {
    getList(queryParams, sortValue, filters)
  }, [])

  useEffect(() => {
    if (specificId) {
      dispatch(getUserAction(specificId));
      return;
    }

    dispatch(fetchUserInfoAction(null));
  }, [specificId, dispatch]);

  const renderComponent = () => {
    return (
      <UserCompletedProfile
        userData={userData}
        matchList={matchList}
        handleRedirect={handleRedirect}
        isSpecificPage={isSpecificPage}
        myProfileId={myProfileId}
        specificId={specificId}
      />
    );
  };

  return (
    <div className="user-profile-wrapper">
      <PageHeader
        title={isSpecificPage ? `User Profile` : 'My Profile'}
        btns={
          !isSpecificPage ? (
            <>
              <div
                className="user-profile-header__settings"
                onClick={handleRedirect(ProfileRoute.USER_PROFILE_SETTINGS)}
              >
                <span className={`icon-settings`} />
                <span>Account settings</span>
              </div>
            </>
          ) : null
        }
      />

      {renderComponent()}
    </div>
  );
};

export default UserProfile;
