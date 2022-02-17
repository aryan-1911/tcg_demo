import { Icon } from '@material-ui/core';
import { copyTextToClipboard } from 'helpers';
import React, { useEffect, useRef, useState } from 'react';

import './copy-button.scss';

interface ICopyButton {
  value: string;
  className?: string;
}

export const CopyButton = (props: ICopyButton) => {
  const { value, className = '' } = props;
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const [isShowTooltip, toggleTooltip] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      toggleTooltip(false);
    }, 1000);
  }, [isShowTooltip]);

  return (
    <span className={`copy-button ${className}`}>
      <Icon
        className={`copy-button__icon icon-copy`}
        title={'copy'}
        onClick={async () => {
          await copyTextToClipboard(value, textareaRef.current || undefined);
          toggleTooltip(true);
        }}
      />
      <span
        className={`copy-button__tooltip ${
          isShowTooltip ? 'copy-button__tooltip--visible' : ''
        }`}
      >
        Copied!
      </span>
      <textarea
        value={value}
        ref={textareaRef}
        className="copy-button__textarea"
        readOnly
      />
    </span>
  );
};
