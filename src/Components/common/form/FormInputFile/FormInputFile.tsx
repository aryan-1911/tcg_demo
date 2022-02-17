import { Icon } from '@material-ui/core';
import { errorFileSize, errorFilesLimit, errorFileType } from 'const';
import { Weaken } from 'interfaces';
import React, { useEffect, useState } from 'react';

import './form-input-file.scss';

interface IFormInputFileProps extends Weaken<IFormInput, 'value'> {
  multiple?: boolean;
  value: File[];
  btnName: string;
  handleChangeField?: (e: any, fieldName: string) => void;
  fieldName?: string;
}

export const FormInputFile = React.forwardRef<
  HTMLInputElement,
  IFormInputFileProps
>((props, ref) => {
  const {
    multiple,
    onChange,
    value = [],
    btnName,
    handleChangeField,
    fieldName,
    ...rest
  } = props;

  const [errors, setError] = useState([] as string[]);

  const clearErrors = () => {
    setError([]);
  };

  useEffect(() => {
    document.addEventListener('click', clearErrors);
    return () => document.removeEventListener('click', clearErrors);
  }, [value]);

  const handleAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [...value];

    if (event.target.files) {
      const files = [...event.target.files];

      const currentErrors = new Set(errors.filter(Boolean));

      const notDuplicatedFiles = files.filter((file) => {
        return !newValue.find((item) => {
          return (
            item.name === file.name && item.lastModified === file.lastModified
          );
        });
      });

      notDuplicatedFiles.forEach((file) => {
        const errorResult = [
          errorFileType(file.type),
          errorFileSize(file.size),
          errorFilesLimit(newValue.length),
        ];

        const errorsFile = errorResult.filter(Boolean);

        if (errorsFile.length) {
          errorsFile.forEach((error) => {
            currentErrors.add(error);
          });
        }

        if (!errorsFile.length) {
          newValue.push(file);
        }
      });

      setError([...currentErrors]);
    }

    handleChangeField && fieldName && handleChangeField(newValue, fieldName);

    onChange(newValue);
  };

  const handleRemove = (idx: number) => {
    const newValue = [...value];
    newValue.splice(idx, 1);

    handleChangeField && fieldName && handleChangeField(newValue, fieldName);
    onChange(newValue);
  };

  const renderFile = (file: File, i: number) => {
    return (
      <div className="input-file-card" key={i}>
        <span className="input-file-card__name">{file.name}</span>
        <button
          className="input-file-card__close"
          type="button"
          onClick={handleRemove.bind(null, i)}
        >
          <Icon className="icon-close " />
        </button>
      </div>
    );
  };

  return (
    <div className="attach input-file">
      <label className="input-file__label">
        <input
          {...rest}
          type="file"
          className="input-file__input"
          multiple={multiple}
          onChange={handleAdd}
          value=""
          ref={ref}
          accept="image/jpeg,image/png,text/plain,video/mp4"
        />
        <span className="input-file__label-text">
          <Icon className={`icon-atach`} />
          {btnName}
        </span>
      </label>
      <div className="input-file__box">{value.map(renderFile)}</div>
      {errors.map((error) => {
        return (
          <div className="input-error" key={error}>
            {error}
          </div>
        );
      })}
    </div>
  );
});
