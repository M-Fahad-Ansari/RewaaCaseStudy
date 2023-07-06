import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() purchaseOrderForm: FormGroup = new FormGroup({});
  @Input() notesMaxLength: number | null = null;
  @Input() errors: { [key: string]: string } = {};
  orderDetailsForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.orderDetailsForm = this.purchaseOrderForm.get(
      'orderDetails'
    ) as FormGroup;
  }

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
