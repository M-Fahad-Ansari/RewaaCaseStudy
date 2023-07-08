export interface ProductList {
  id: number;
  name: string;
}
export interface SelectedProduct extends ProductList {
  quantity: number;
  taxCode: TAX_CODE;
  cost: number;
}

export interface TaxCodeOption {
  viewValue: string;
  value: TAX_CODE;
}

export enum TAX_CODE {
  TAX = 'value_added_tax',
  NO_TAX = 'no_tax',
}

export const TAX_CODE_OPTIONS: TaxCodeOption[] = [
  {
    viewValue: 'No Tax',
    value: TAX_CODE.NO_TAX,
  },
  {
    viewValue: 'Value added Tax',
    value: TAX_CODE.TAX,
  },
];
