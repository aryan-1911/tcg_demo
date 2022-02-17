import React, { ReactElement } from 'react';

import Countdown, { CountdownRenderProps } from 'react-countdown';

import './count-down-timer.scss';

interface ICountDownTimerProps {
  date: number | Date;
  afterContent?: ReactElement;
  onComplete(): void;
}

export const CountDownTimer = (props: ICountDownTimerProps) => {
  const { date, afterContent, onComplete } = props;

  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return afterContent || null;
    }
    return (
      <span className="count-down">
        <span className="count-down__item count-down__hour">{hours}</span>
        <span className="count-down__separator">:</span>
        <span className="count-down__item count-down__min">{minutes}</span>
        <span className="count-down__separator">:</span>
        <span className="count-down__item count-down__sec">{seconds}</span>
      </span>
    );
  };

  return <Countdown date={date} renderer={renderer} onComplete={onComplete} />;
};
