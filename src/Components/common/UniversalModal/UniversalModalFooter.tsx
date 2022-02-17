import { useTypedController } from '@hookform/strictly-typed';
import { Button, FormCheckbox, IButtonProps } from 'Components/common/form';
import { REQUIRED } from 'const';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface IUniversalModalFooterProps {
  onSubmit(): void;
  title?: string;
  btnType?: IButtonProps['btnType'];
  submitButtonDisabled?: boolean;
  isLoading?: boolean;
}

export const UniversalModalFooter = (props: IUniversalModalFooterProps) => {
  const { onSubmit, title, submitButtonDisabled, isLoading = false } = props;
  const { control, errors } = useFormContext();
  const TypedController: any = useTypedController({ control });

  return (
    <div className="modal-footer-terms">
      <TypedController
        name="terms_and_conditions"
        rules={REQUIRED}
        render={(props) => (
          <FormCheckbox
            name="terms_and_conditions"
            label={
              <span>
                I agree to <b>Terms & Conditions</b> and <b>Privacy Policy</b>
              </span>
            }
            {...props}
            error={errors.terms_and_conditions}
          />
        )}
      />
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={submitButtonDisabled || Boolean(errors.terms_and_conditions) || isLoading}
        isLoading={isLoading}
      >
        {title}
      </Button>
    </div>
  );
};
