import React from 'react';
import PictureImg from 'assets/images/avatar_upload.svg';

export const FormPhotoUpload = () => {
  return (
    <div className="photo-upload-block">
      <div className="photo-upload-block__image">
        <img src={PictureImg} alt="upload avatar" />
      </div>
      <div className="photo-upload-block__text">
        <div className="red-text">Upload avatar</div>
        <div className="gray-text">max. file size 1 Mb</div>
      </div>
    </div>
  );
};
