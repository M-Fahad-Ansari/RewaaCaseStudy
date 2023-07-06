import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Product } from './products.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  // Abstract Function to get apiEndpoint (demo data)
  get apiUrl(): string {
    return '/demo-data' + environment.api_url;
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl + '/Products').pipe(
      map((items: Product[]) => {
        return items;
      })
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.httpClient
      .delete<Product>(this.apiUrl + '/Products/' + id)
      .pipe(
        map((response: Product) => {
          return response;
        })
      );
  }
}
