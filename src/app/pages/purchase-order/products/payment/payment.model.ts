export interface PaymentPeriodOption {
  viewValue: string;
  value: PAYMENT_PERIOD;
}

export interface PaymentMethodOption {
  viewValue: string;
  value: PAYMENT_METHOD;
}

export enum PAYMENT_PERIOD {
  NOW = 'now',
  LATER = 'later',
}

export enum PAYMENT_METHOD {
  CASH = 'card',
  CREDIT_CARD = 'credit_card',
}

export const PAYEMNT_PERIOD_OPTIONS: PaymentPeriodOption[] = [
  {
    viewValue: 'Pay Now',
    value: PAYMENT_PERIOD.NOW,
  },
  {
    viewValue: 'Pay Later',
    value: PAYMENT_PERIOD.LATER,
  },
];

export const PAYEMNT_METHOD_OPTIONS: PaymentMethodOption[] = [
  {
    viewValue: 'Cash',
    value: PAYMENT_METHOD.CASH,
  },
  {
    viewValue: 'Credit Card',
    value: PAYMENT_METHOD.CREDIT_CARD,
  },
];
