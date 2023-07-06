import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { PurchaseOrderComponent } from './purchase-order.component';

describe('PurchaseOrderComponent', () => {
  let component: PurchaseOrderComponent;
  let fixture: ComponentFixture<PurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseOrderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the purchaseOrderForm', () => {
    expect(component.purchaseOrderForm).toBeDefined();
  });

  it('should initialize the notesMaxLength', () => {
    expect(component.notesMaxLength).toEqual(200);
  });

  it('should create the form with required fields', () => {
    const orderDetails = component.purchaseOrderForm.get('orderDetails') as FormGroup;
    expect(orderDetails.get('supplierName')).toBeTruthy();
    expect(orderDetails.get('location')).toBeTruthy();

    const payment = component.purchaseOrderForm.get('payment') as FormGroup;
    expect(payment.get('method')).toBeTruthy();
    expect(payment.get('paidAmount')).toBeTruthy();
    expect(payment.get('dueDate')).toBeTruthy();
  });

  it('should validate the currency format with currencyValidator', () => {
    function currencyValidator(control: FormControl): { currency: boolean } | null {
      const value = control.value;
      if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
        return { currency: true };
      }
      return null;
    }
    const control = new FormControl('1.234');
    const result = currencyValidator(control);
    expect(result).toBeNull();

    control.setValue('12.345');
    const invalidResult = currencyValidator(control);
    expect(invalidResult).toEqual({ currency: true });
  });

  
  it('should log form value on completeOrder if form is valid', () => {
    spyOn(console, 'log');
    const validFormValue = {
      id: 1,
      orderDetails: {
        supplierName: 'Supplier',
        location: 'Location',
        invoiceNumber: 234,
        notes: 'Hello',
      },
      product: [],
      payment: {
        period: 'now',
        method: 'cash',
        paidAmount: 100,
        dueDate: new Date(),
      },
    };
    component.purchaseOrderForm.setValue(validFormValue);
    component.completeOrder();
    expect(console.log).toHaveBeenCalledWith(validFormValue);
  });

  it('should not log form value on completeOrder if form is invalid', () => {
    spyOn(console, 'log');
    component.completeOrder();
    expect(console.log).not.toHaveBeenCalled();
  });
});