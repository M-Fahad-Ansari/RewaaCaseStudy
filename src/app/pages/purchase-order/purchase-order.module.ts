import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PurchaseOrderComponent } from './purchase-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PaymentComponent } from './products/payment/payment.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PurchaseOrderComponent,
    OrderDetailsComponent,
    ProductsComponent,
    PaymentComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule
  ],
})
export class PurchaseOrderModule { }
