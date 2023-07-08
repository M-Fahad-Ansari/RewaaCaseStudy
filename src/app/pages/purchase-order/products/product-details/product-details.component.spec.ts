import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { ProductDetailsComponent } from './product-details.component';
import { SelectedProduct, TAX_CODE, TAX_CODE_OPTIONS } from '../products.model';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductDetailsComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total cost', () => {
    const productInstance = {
      id: 1,
      name: 'iphone',
      quantity: 2,
      cost: 10,
      taxCode: TAX_CODE.TAX,
    };
    const totalCost = component.calculateTotalCostTE(productInstance);
    expect(totalCost).toEqual(20);
  });

  it('should calculate the tax amount', () => {
    const taxCode = 'TAX';
    const productInstance = {
      id: 1,
      name: 'iphone',
      quantity: 2,
      cost: 10,
      taxCode: TAX_CODE.TAX,
    };
    const taxAmount = component.calculateTaxAmount(productInstance);
    expect(taxAmount).toEqual(6);
  });

  it('should get controls from form array', () => {
    const formArray = formBuilder.array([
      formBuilder.control('1'),
      formBuilder.control('2'),
    ]);
    component.purchaseOrderForm = formBuilder.group({
      product: formArray,
    });

    const controls = component.GetControls('product');
    expect(controls.length).toBe(2);
    expect(controls[0].value).toEqual('1');
    expect(controls[1].value).toEqual('2');
  });

  it('should delete a product from form array', () => {
    const formArray = formBuilder.array([
      formBuilder.control('1'),
      formBuilder.control('2'),
    ]);
    component.purchaseOrderForm = formBuilder.group({
      product: formArray,
    });

    component.deleteProduct(0);

    const controls = component.purchaseOrderForm.get('product') as FormArray;
    expect(controls.length).toBe(1);
    expect(controls.at(0).value).toEqual('2');
  });

  it('should calculate subTotal and taxes', () => {
    const productArray = [
      { id: 2, name: 'iphone x', quantity: 2, cost: 10, taxCode: TAX_CODE.TAX },
      {
        id: 1,
        name: 'iphone 13',
        quantity: 1,
        cost: 20,
        taxCode: TAX_CODE.NO_TAX,
      },
    ];

    function calculateSubTotalAndTaxes(productArray: SelectedProduct[]): void {
      let subTotal = 0;
      let taxes = 0;

      for (const product of productArray) {
        const totalCost = component.calculateTotalCostTE(product);
        const totalTax = component.calculateTaxAmount(product);
        const itemTotal = totalCost + totalTax;

        subTotal += totalCost;
        taxes += totalTax;
      }

      component.subTotalAmount = subTotal;
      component.extraTaxAmount = taxes;
    }

    calculateSubTotalAndTaxes(productArray);

    expect(component.subTotalAmount).toBe(40);
    expect(component.extraTaxAmount).toBe(6);
  });

  // Add more test cases as needed for other methods and scenarios
});
