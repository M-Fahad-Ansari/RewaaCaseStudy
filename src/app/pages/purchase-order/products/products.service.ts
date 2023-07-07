import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductList } from './products.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  // Abstract Function to get apiEndpoint (demo data)
  get apiUrl(): string {
    return '/demo-data' + environment.api_url;
  }

  getProducts(): Observable<ProductList[]> {
    return this.httpClient.get<ProductList[]>(this.apiUrl + '/Products').pipe(
      map((items: ProductList[]) => {
        return items;
      })
    );
  }

  deleteProduct(id: number): Observable<ProductList> {
    return this.httpClient
      .delete<ProductList>(this.apiUrl + '/Products/' + id)
      .pipe(
        map((response: ProductList) => {
          return response;
        })
      );
  }
}
