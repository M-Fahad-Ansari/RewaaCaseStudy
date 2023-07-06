import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from './products.service';
import { take } from 'rxjs';
import { Product } from './products.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() purchaseOrderForm: FormGroup = new FormGroup({});

  products: Product[] = [];
  searchCriteria = '';
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  onOptionSelected(event: any): void {
    const selectedOption = event.option.value;
    console.log('Selected option:', selectedOption);
    // Perform any additional logic based on the selected option
  }
}
