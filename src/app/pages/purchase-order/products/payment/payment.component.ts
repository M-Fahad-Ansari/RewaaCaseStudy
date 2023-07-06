import { Component, Input, OnInit } from '@angular/core';
import {
  PAYEMNT_METHOD_OPTIONS,
  PAYEMNT_PERIOD_OPTIONS,
  PAYMENT_PERIOD,
  PaymentMethodOption,
  PaymentPeriodOption,
} from './payment.model';
import { FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
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

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.key;
    if (charCode > '31' && (charCode < '48' || charCode > '57')) {
      return false;
    }
    return true;
  }

  onPaymentPeriodChange(event: MatRadioChange): void {
    if (event.value === PAYMENT_PERIOD.LATER) {
      (this.purchaseOrderForm.get('payment') as FormGroup)
        .get('method')
        ?.setValidators([]);
    } else {
      (this.purchaseOrderForm.get('payment') as FormGroup)
        .get('method')
        ?.setValidators([Validators.required]);
    }
  }

  formatAmount(): void {
    const paidAmountControl = this.paymentForm?.get('paidAmount');
    if (paidAmountControl && paidAmountControl.value) {
      const amount = parseFloat(paidAmountControl.value);
      const formattedAmount = amount.toFixed(2);
      paidAmountControl.setValue(formattedAmount);
    }
  }
}
