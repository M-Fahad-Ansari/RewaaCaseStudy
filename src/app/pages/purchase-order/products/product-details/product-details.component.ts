import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  items: any[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    // Add more items as needed
  ];
  constructor() {}

  ngOnInit(): void {}
}
