import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { ProductService } from './products.service';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductsComponent],
      providers: [ProductService, FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    spyOn(productService, 'getProducts').and.returnValue(of(products));

    component.ngOnInit();

    expect(component.products).toEqual(products);
  });

  it('should filter products based on search criteria', () => {
    const products = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' },
    ];
    component.products = products;

    // Case 1: Empty search criteria
    component.searchCriteria = '';
    component.filterProducts();
    expect(component.filteredProducts).toEqual(products);

    // Case 2: Non-empty search criteria
    component.searchCriteria = '2';
    component.filterProducts();
    expect(component.filteredProducts).toEqual([{ id: 2, name: 'Product 2' }]);
  });

  it('should add a product to the form array on product selection', () => {
    const product = { id: 1, name: 'Product 1' };
    const productForm = formBuilder.group({
      id: [product.id],
      name: [product.name],
      quantity: [null],
      cost: [null],
      taxCode: ['TAX'],
    });
    component.purchaseOrderForm = formBuilder.group({
      product: formBuilder.array([]),
    });

    component.onProductSelect({ option: { value: 1 } });

    const productsArray = component.purchaseOrderForm.get('product') as FormArray;
    expect(productsArray.length).toBe(1);
    expect(productsArray.at(0).value).toEqual(productForm.value);
  });

  // Add more test cases as needed for other methods and scenarios
});