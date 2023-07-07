import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductList } from './products.model';
import { ProductService } from './products.service';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve products', () => {
    const mockProducts: ProductList[] = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];

    productService.getProducts().subscribe((products: ProductList[]) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne('/demo-data/api_url/Products');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });
});
