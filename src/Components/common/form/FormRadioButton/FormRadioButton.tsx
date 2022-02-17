import React from 'react';
import Radio from '@material-ui/core/Radio';

interface IFormRadioButton extends IFormInput {
  checked?: boolean;
  showImage?: boolean;
  image?: any;
}

export const FormRadioButton = React.forwardRef<
  HTMLDivElement,
  IFormRadioButton
>(({ showImage, image, ...res }, ref) => {
  return (
    <div className="radio-button-block" ref={ref}>
      <Radio {...res} />
      {showImage && (
        <div className="radio-button-image-block">
          <img src={image} alt="card image" className="card-image" />
        </div>
      )}
    </div>
  );
});
