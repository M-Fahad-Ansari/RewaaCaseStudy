import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
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
    });
    this.listenValueChanges();
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
      control.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
        console.log(res);
        console.log(control.invalid);
        console.log(control.dirty);
        
        if (control.invalid && (control.dirty || control.touched)) {
          for (const errorKey in control.errors) {
            console.log("here");
            
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
