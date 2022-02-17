import { useHistory } from 'react-router-dom';
import { ProfileRoute } from 'const';

export const useRedirectToUserProfile = () => {
  const history = useHistory();

  const handleRedirectToUser = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    redirectData,
  ) => {
    e.stopPropagation();
    const { isSelf, userId, callback } = redirectData;

    const path = isSelf
      ? ProfileRoute.ROOT
      : ProfileRoute.getSpecificRoute(userId);
    history.push(path);
    callback && callback();
  };

  return { handleRedirectToUser };
};
