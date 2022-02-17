import defaultAvatar from 'assets/images/default-avatar.svg';
import React from 'react';

interface IProps {
  avatar: string | null | undefined;
  className?: string;
  isOnline?:any
}

export const Avatar = (props: IProps) => {
  const { avatar, className,isOnline } = props;
  let isOnlineI;
  if(isOnline !== undefined){
    isOnlineI = <span className={isOnline?'isonline-isoffline online':'isonline-isoffline offline'} ></span>
  }else{
    isOnlineI = null;
  }
  return (
    <>
      <span className='avatar-img-wrap'>
        <img
          className={`${className || ''} avatar`}
          src={avatar || defaultAvatar}
          alt="user avatar"
          />
          {isOnlineI}
      </span>
    </>
  );
};
