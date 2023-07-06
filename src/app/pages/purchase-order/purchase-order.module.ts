import { NgModule } from '@angular/core';
import { PurchaseOrderComponent } from './purchase-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PaymentComponent } from './products/payment/payment.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { CommonModule } from '@angular/common';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from 'src/app/shared/services/fake-backend.service';
import { ProductService } from './products/products.service';
import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PurchaseOrderComponent,
    OrderDetailsComponent,
    ProductsComponent,
    PaymentComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PurchaseOrderRoutingModule,
    InMemoryWebApiModule.forRoot(FakeBackendService, {
      passThruUnknownUrl: true,
      dataEncapsulation: false,
      apiBase: 'demo-data/api/',
    }),

    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  providers: [ProductService],
})
export class PurchaseOrderModule {}
