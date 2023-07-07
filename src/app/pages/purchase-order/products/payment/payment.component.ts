import { Component, Input, OnInit } from '@angular/core';
import {
  PAYEMNT_METHOD_OPTIONS,
  PAYEMNT_PERIOD_OPTIONS,
  PAYMENT_PERIOD,
  PaymentMethodOption,
  PaymentPeriodOption,
} from './payment.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { BaseCommonCodeComponent } from 'src/app/pages/utils/base-common-code-component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent
  extends BaseCommonCodeComponent
  implements OnInit
{
  @Input() purchaseOrderForm: FormGroup = new FormGroup({});
  @Input() totalAmount: number | null = null;
  paymentPeriod = PAYMENT_PERIOD;
  paymentMethods: PaymentMethodOption[] = PAYEMNT_METHOD_OPTIONS;
  paymentPeriods: PaymentPeriodOption[] = PAYEMNT_PERIOD_OPTIONS;
  paymentForm: FormGroup | undefined = undefined;

  ngOnInit(): void {
    if (this.purchaseOrderForm)
      this.paymentForm = this.purchaseOrderForm.get('payment') as FormGroup;
  }

  onPaymentPeriodChange(event: MatRadioChange): void {
    const paymentGroup = this.purchaseOrderForm.get('payment') as FormGroup;

    paymentGroup.get('method')?.setValue('');
    paymentGroup.get('paidAmount')?.setValue(0);
    
    if (event.value === PAYMENT_PERIOD.LATER) {
      paymentGroup.get('method')?.setValidators(null);
      paymentGroup.get('paidAmount')?.setValidators(null);
    } else {
      paymentGroup.get('method')?.setValidators([Validators.required]);
      paymentGroup.get('paidAmount')?.setValidators([Validators.required]);
    }
    paymentGroup.get('method')?.updateValueAndValidity();
    paymentGroup.get('paidAmount')?.updateValueAndValidity();
  }

  formatAmount(): void {
    const paidAmountControl = this.paymentForm?.get('paidAmount');
    if (paidAmountControl && paidAmountControl.value) {
      const amount = parseFloat(paidAmountControl.value);
      const formattedAmount = amount.toFixed(2);
      paidAmountControl.setValue(formattedAmount);
    }
  }

  currencyValidator(control: FormControl): { currency: boolean } | null {
    const value = control.value;
    if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
      return { currency: true };
    }
    return null;
  }
}
