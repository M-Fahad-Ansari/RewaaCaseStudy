import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from './products.service';
import { take } from 'rxjs';
import { ProductList, TAX_CODE } from './products.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() purchaseOrderForm: FormGroup = new FormGroup({});

  products: ProductList[] = [];
  filteredProducts: ProductList[] = [];

  searchCriteria = '';
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((products: ProductList[]) => {
        this.products = products;
        this.filteredProducts = this.products;
      });
  }

  // Method to filter products based on search criteria
  filterProducts(): void {
    if (!this.searchCriteria) {
      this.filteredProducts = this.products; // Show all products when search criteria is empty
    } else {
      this.filteredProducts = this.products.filter(
        (product: ProductList) =>
          product.id.toString().includes(this.searchCriteria.toString()) ||
          product.name
            .toLowerCase()
            .includes(this.searchCriteria.toString().toLowerCase())
      );
    }
  }

  onProductSelect(event: any): void {
    const productID = event.option.value;

    let selectedProduct = this.products.find(
      (product: ProductList) => product.id === productID
    );
    const productsArray = this.purchaseOrderForm.get('product') as FormArray;
    const productGroup = this.createProductForm(selectedProduct);
    productsArray.push(productGroup);
    this.purchaseOrderForm.markAsDirty();
  }

  private createProductForm(product: ProductList | undefined): FormGroup {
    return this.formBuilder.group({
      id: [product?.id ?? null],
      name: [product?.name ?? ''],
      quantity: [0, [Validators.required]],
      cost: [0, [Validators.required]],
      taxCode: [TAX_CODE.TAX, [Validators.required]],
    });
  }
}
