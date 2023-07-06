import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;

    // Mock the inputs
    component.purchaseOrderForm = new FormGroup({
      payment: new FormGroup({
        // Mock form controls here if needed
      }),
    });

    component.totalAmount = 50;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the paymentForm', () => {
    expect(component.paymentForm).toBeDefined();
  });

  it('should set the paymentForm correctly', () => {
    expect(component.paymentForm).toEqual(
      component.purchaseOrderForm.get('payment') as FormGroup
    );
  });

  it('should allow only numeric input in numberOnly method', () => {
    const event = new KeyboardEvent('keydown', {
      which: 65, // Simulate a non-numeric key press (A)
    });

    const allowOnlyNumeric = component.numberOnly(event);

    expect(allowOnlyNumeric).toBeFalse();
  });

  it('should allow numeric input in numberOnly method', () => {
    const event = new KeyboardEvent('keydown', {
      which: 49, // Simulate a numeric key press (1)
    });

    const allowOnlyNumeric = component.numberOnly(event);

    expect(allowOnlyNumeric).toBeTrue();
  });

  it('should format the paidAmount control', () => {
    const paidAmountControl = new FormControl('50.1234');
    component.paymentForm?.addControl('paidAmount', paidAmountControl);

    component.formatAmount();

    expect(paidAmountControl.value).toBe('50.12');
  });
});