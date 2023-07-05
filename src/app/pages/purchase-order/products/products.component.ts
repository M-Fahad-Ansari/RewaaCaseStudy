import { Component, OnInit } from '@angular/core';
import { ProductService } from './products.service';
import { take } from 'rxjs';
import { Product } from './products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }
}
