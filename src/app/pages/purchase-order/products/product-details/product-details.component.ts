import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import {
  SelectedProduct,
  TAX_CODE,
  TAX_CODE_OPTIONS,
  TaxCodeOption,
} from '../products.model';
import { BaseCommonCodeComponent } from 'src/app/pages/utils/base-common-code-component';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends BaseCommonCodeComponent {
  @Input() purchaseOrderForm: FormGroup = new FormGroup({});
  products: FormArray | undefined = undefined;
  panelState: { [key: string]: boolean } = {
    product: false,
    subTotal: false,
  };

  taxCodes: TaxCodeOption[] = TAX_CODE_OPTIONS;
  extraTaxAmount = 0;
  subTotalAmount = 0;

  ngOnInit(): void {
    (this.purchaseOrderForm.get('product') as FormArray).valueChanges.subscribe(
      (instance: SelectedProduct[]) => {
        this.calculateSubTotalAndTaxes(instance);
      }
    );
  }

  calculateTotalCostTE(productInstance: SelectedProduct): number {
    const quantity = productInstance.quantity?.toString();
    const cost = productInstance.cost?.toString();
    return quantity && cost ? parseInt(quantity) * parseInt(cost) : 0;
  }

  calculateTaxAmount(productInstance: SelectedProduct): number {
    const taxCode = productInstance.taxCode;

    if (taxCode === TAX_CODE.TAX) {
      return (15 / 100) * this.calculateTotalCostTE(productInstance);
    } else {
      return 0;
    }
  }

  GetControls(name: string): AbstractControl[] {
    return (this.purchaseOrderForm.get(name) as FormArray).controls;
  }

  deleteProduct(index: number): void {
    (this.purchaseOrderForm?.get('product') as FormArray).removeAt(index);
  }

  private calculateSubTotalAndTaxes(productArray: SelectedProduct[]): void {
    let subTotal = 0;
    let taxes = 0;

    for (const product of productArray) {
      const totalCost = this.calculateTotalCostTE(product);
      const totalTax = this.calculateTaxAmount(product);
      const itemTotal = totalCost + totalTax;

      subTotal += totalCost;
      taxes += totalTax;
    }

    this.subTotalAmount = subTotal;
    this.extraTaxAmount = taxes;
  }
}
