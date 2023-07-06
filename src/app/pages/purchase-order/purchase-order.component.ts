import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  PAYMENT_METHOD,
  PAYMENT_PERIOD,
} from './products/payment/payment.model';
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss'],
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrderForm: FormGroup = new FormGroup({});
  notesMaxLength = 200;
  errors: { [key: string]: string } = {};
  private unsubscribe$ = new Subject<void>();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.purchaseOrderForm = this.formBuilder.group({
      id: [1],
      orderDetails: this.formBuilder.group({
        supplierName: ['', [Validators.required]],
        location: ['', [Validators.required]],
        invoiceNumber: [''],
        notes: ['', [Validators.maxLength(this.notesMaxLength)]],
      }),
      product: this.formBuilder.array([]),
      payment: this.formBuilder.group({
        period: [PAYMENT_PERIOD.NOW],
        method: ['', [Validators.required]],
        paidAmount: [null, [Validators.required, this.currencyValidator]],
        dueDate: [new Date(), [Validators.required]],
      }),
    });
    this.listenValueChanges();
  }

  currencyValidator(control: FormControl) {
    const value = control.value;
    if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
      return { currency: true };
    }
    return null;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.errors = {};
  }

  completeOrder(): void {
    if (this.purchaseOrderForm.valid) {
      console.log(this.purchaseOrderForm.value);
    }
  }

  private listenValueChanges(): void {
    for (const key in this.purchaseOrderForm.controls) {
      const control = this.purchaseOrderForm.get(key) as FormControl;
      control.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          if (control.invalid && (control.dirty || control.touched)) {
            for (const errorKey in control.errors) {
              this.errors[key] = '';
              const message = this.getErrorMessagesByType(errorKey, key);
              this.errors[key] = message;
            }
          }
        });
    }
  }

  private getErrorMessagesByType(type: string, controlName: string): string {
    let message = '';
    switch (type) {
      case 'required':
        message = controlName + 'is required';
        break;
      case 'maxlength':
        message =
          controlName +
          'can have maximum of ' +
          this.notesMaxLength +
          ' characters';
        break;
    }
    return message;
  }
}
