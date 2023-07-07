import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PAYMENT_PERIOD } from './products/payment/payment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseCommonCodeComponent } from '../utils/base-common-code-component';
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss'],
})
export class PurchaseOrderComponent extends BaseCommonCodeComponent implements OnInit, OnDestroy {
  purchaseOrderForm: FormGroup = new FormGroup({});
  notesMaxLength = 200;
  snackBarDuration = 3000;
  errors: { [key: string]: string } = {};

  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.listenToFormValueChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  completeOrder(): void {
    if (this.purchaseOrderForm.valid) {
      console.log(this.purchaseOrderForm.value);
      this.snackBar.open('Congratulations! Order completed correctly.', '', {
        duration: this.snackBarDuration,
      });
    }
  }

  saveAsDraft(): void {
    console.log('Order Drafted' + this.purchaseOrderForm.value);
  }

  cancelOrder(): void {
    this.purchaseOrderForm.reset();
  }

  private createForm(): void {
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
        paidAmount: [0, [Validators.required, this.currencyValidator]],
        dueDate: [new Date(), [Validators.required]],
      }),
    });
  }

  findInvalidControlsRecursive(formToInvestigate:FormGroup|FormArray):string[] {
    var invalidControls:string[] = [];
    let recursiveFunc = (form:FormGroup|FormArray) => {
      Object.keys(form.controls).forEach(field => { 
        const control = form.get(field);
        if (control?.invalid) invalidControls.push(field);
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }        
      });
    }
    recursiveFunc(formToInvestigate);
    return invalidControls;
  }

  private currencyValidator(
    control: FormControl
  ): { currency: boolean } | null {
    const value = control.value;
    if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
      return { currency: true };
    }
    return null;
  }

  listenToFormValueChanges(): void {
    this.purchaseOrderForm.valueChanges.subscribe(() => {
      this.updateErrors(this.purchaseOrderForm);
    });
  }

  updateErrors(control: AbstractControl, controlPath: string = ''): void {
    if (control instanceof FormGroup) {
      for (const nestedControlName in control.controls) {
        const nestedControl = control.get(nestedControlName) as FormControl;
        const nestedControlPath = controlPath
          ? `${controlPath}.${nestedControlName}`
          : nestedControlName;
        this.updateErrors(nestedControl, nestedControlPath);
      }
    } else if (control instanceof FormControl) {
      if (control.invalid && (control.dirty || control.touched)) {
        for (const errorKey in control.errors) {
          const message = this.getErrorMessagesByType(errorKey, controlPath);
          this.errors[controlPath] = message;
        }
      }
    }
  }

  getErrorMessagesByType(type: string, controlName: string): string {
    let message = '';
    const transformedControlName = controlName.includes('.')
      ? controlName.split('.')[1].charAt(0).toUpperCase() +
        controlName.split('.')[1].slice(1)
      : controlName;
    switch (type) {
      case 'required':
        message = `${transformedControlName} is required`;
        break;
      case 'maxlength':
        message = `${transformedControlName} can have a maximum of ${this.notesMaxLength} characters`;
        break;
      case 'currency':
        message = `${transformedControlName} have incorrect format`;
        break;
    }
    return message;
  }
}
