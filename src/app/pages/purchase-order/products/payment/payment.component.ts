import { Component, Input, OnInit } from '@angular/core';
import {
  PAYEMNT_METHOD_OPTIONS,
  PAYEMNT_PERIOD_OPTIONS,
  PaymentMethodOption,
  PaymentPeriodOption,
} from './payment.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() purchaseOrderForm: FormGroup = new FormGroup({});
  @Input() totalAmount: number = 100;
  paymentMethods: PaymentMethodOption[] = PAYEMNT_METHOD_OPTIONS;
  paymentPeriods: PaymentPeriodOption[] = PAYEMNT_PERIOD_OPTIONS;
  paymentForm: FormGroup | undefined = undefined;

  ngOnInit(): void {
    this.paymentForm = this.purchaseOrderForm.get('payment') as FormGroup;
  }

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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
