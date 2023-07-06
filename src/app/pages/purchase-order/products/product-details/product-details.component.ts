import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() purchaseOrderForm: FormGroup = new FormGroup({});
  panelState: { [key: string]: boolean } = {
    product: false,
    subTotal: false,
  };
  extraTax = 9000;
  subTotal = 60000;

  ngOnInit(): void {
    if(this.purchaseOrderForm) this.purchaseOrderForm.get('product') as FormArray;
  }
  
  GetControls(name: string): AbstractControl[] {
    return (this.purchaseOrderForm.get(name) as FormArray).controls;
  }
}
