import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import products from '../../../assets/dummy-data/products.json';
import { Product } from '../../pages/purchase-order/products/products.model';
@Injectable()
export class FakeBackendService implements InMemoryDbService {
  createDb(): DbResponse {
    return {
      Products: products,
    };
  }
}

export interface DbResponse {
  Products: Product[];
}
