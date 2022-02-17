export interface ICardInputData {
  number: string;
  expDate: string;
  cvc: string;
  name: string;
  type: 'credit' | 'paypal' | '';
}

export interface ICreditCardRequest {
  cvc: string;
  expMonth: number;
  expYear: number;
  name: string;
  number: string;
}

export interface ICreditCard {
  brand: string;
  expMonth: number;
  expYear: number;
  id: string;
  isMain: boolean;
  last4: string;
  name: string;
  provider: 'stripe';
}
