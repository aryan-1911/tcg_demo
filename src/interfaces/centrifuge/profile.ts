export interface ICentrifugeBalance {
  data: {
    action: 'stripe_deposit';
    amount: number;
  };
}
