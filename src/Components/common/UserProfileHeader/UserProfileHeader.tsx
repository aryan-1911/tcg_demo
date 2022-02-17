import React from 'react';

interface IUserProfileHeader {
  title: string;
  handleRedirect: (path?:string) => () => void;
}

export const UserProfileHeader = (props: IUserProfileHeader) => {
  const {
    title,
    handleRedirect,
  } = props;
  return (
    <div>

    </div>
  );
};
