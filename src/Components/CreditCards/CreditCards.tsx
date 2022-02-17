import { useTypedController } from '@hookform/strictly-typed';
import { Icon } from '@material-ui/core';
import { chooseDepositCardAction, deleteDepositCardAction } from 'actions';
import { Button } from 'Components/common/form';
import { CreateCreditCardModal } from 'Components/Modals';
import { creditCardIcons } from 'const';
import { InfoModalContext, CreateCreditCardContex } from 'context';
import {
  formatCreditCardNumber,
  formatExpDate,
  getCardIconByNumber,
} from 'helpers';
import { useFormInModal } from 'hooks';
import { ICreditCard } from 'interfaces';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import './credit-cards.scss';

interface ICreditCardsProps {
  cards: ICreditCard[];
}

function CreditCards(props: ICreditCardsProps) {
  const dispatch = useDispatch();
  const { cards } = props;

  const { openInfoModal } = useContext(InfoModalContext);

  const { openCreateCardModal } = useContext(CreateCreditCardContex);

  const handleDeleteCard = (id: string) => () => {
    dispatch(deleteDepositCardAction(id));
  };

  const handleChoose = (
    id: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    dispatch(chooseDepositCardAction(id));
  };

  const renderCards = () => {
    return cards.map((card, i) => {
      const { brand, last4, name, expMonth, expYear, id, isMain } = card;
      const expDate = formatExpDate(expMonth, expYear);
      return (
        <div className="credit-cards-item" key={i}>
          <div
            className="credit-cards-item__box"
            onClick={!isMain ? handleChoose.bind(null, id) : undefined}
          >
            <div className="credit-cards-item__top">
              <div className="credit-cards-item__img">
                {creditCardIcons[brand]}
              </div>
              {isMain && (
                <span className="credit-cards-item__default">Default</span>
              )}
            </div>
            <span className="credit-cards-item__number">
              **** **** **** {last4}
            </span>
            <div className="credit-cards-item__bottom">
              <div className="credit-cards-item__bottom-col">
                <span className="credit-cards-item__title">Card Holder</span>
                <span className="credit-cards-item__value">{name}</span>
              </div>
              <div className="credit-cards-item__bottom-col">
                <span className="credit-cards-item__title">Exp. date</span>
                <span className="credit-cards-item__value">{expDate}</span>
              </div>
              <Button
                onClick={openInfoModal({
                  onOk: handleDeleteCard(id),
                  title: 'delete card',
                  type: 'delete',
                })}
                preffix={<Icon className="icon-trash" />}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="credit-cards">
        {renderCards()}
        <Button
          className="credit-cards__add"
          onClick={openCreateCardModal()}
          preffix={<Icon className="icon-ic_credit_card" />}
        >
          Add new payment method
        </Button>
      </div>
    </>
  );
}

export default CreditCards;
