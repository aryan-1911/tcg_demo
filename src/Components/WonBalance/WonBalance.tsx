import { Icon } from '@material-ui/core';
import { formatPrice } from 'helpers';
import React from 'react';

import './won-balance.scss';

interface IWonBalanceProps {
  balance: number;
}

function WonBalance(props: IWonBalanceProps) {
  const { balance } = props;
  return (
    <div className="won-balance">
      <span className="won-balance__ico">
        <Icon className="icon-ic_cup" />
      </span>
      <span className="won-balance__price">
        <span>$</span>
        {balance > 0 ? formatPrice(balance, true) : 0}
      </span>
      <span className="won-balance__text">won</span>
    </div>
  );
}

export default WonBalance;
