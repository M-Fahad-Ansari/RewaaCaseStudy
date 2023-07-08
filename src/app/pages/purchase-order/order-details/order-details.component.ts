import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseCommonCodeComponent } from 'src/app/shared/utils/base-common-code-component';

export enum FILTER_CONTROLS {
  SUPPLIER = 'supplier',
  LOCATION = 'location',
}
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent
  extends BaseCommonCodeComponent
  implements OnInit
{
  @Input() purchaseOrderForm: FormGroup = new FormGroup({});
  @Input() notesMaxLength: number | null = null;
  @Input() errors: { [key: string]: string } = {};
  supplierNameOptions = ['Apple', 'Samsung', 'Nokia', 'OnePlus'];
  locationOptions = ['Pakistan', 'India', 'SriLanka', 'DFE default'];
  filteredSuppliers: string[] = [];
  filteredLocations: string[] = [];
  filterControls = FILTER_CONTROLS;
  orderDetailsForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.orderDetailsForm = this.purchaseOrderForm.get(
      'orderDetails'
    ) as FormGroup;

    this.filteredSuppliers = this.supplierNameOptions;
    this.filteredLocations = this.locationOptions;
  }

  filterByItem(itemName: string): void {
    itemName === FILTER_CONTROLS.SUPPLIER
      ? (this.filteredSuppliers = this.filterItems(
          this.purchaseOrderForm.get('orderDetails')?.get('supplierName')
            ?.value,
          this.supplierNameOptions
        ))
      : (this.filteredLocations = this.filterItems(
          this.purchaseOrderForm.get('orderDetails')?.get('location')?.value,
          this.locationOptions
        ));
  }

  private filterItems(searchCriteria: string, items: string[]): string[] {
    let filteredItems: string[] = [];
    if (!searchCriteria) {
      return items; // Show all products when search criteria is empty
    } else {
      filteredItems = items.filter((item: string) =>
        item.toLowerCase().includes(searchCriteria.toLowerCase())
      );
    }
    return filteredItems;
  }
}
