import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { OrderDetailsComponent } from './order-details.component';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;

    // Mock the inputs
    component.purchaseOrderForm = new FormGroup({
      orderDetails: new FormGroup({
        // Mock form controls here
      }),
    });

    component.notesMaxLength = 10;
    component.errors = {};

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the orderDetailsForm', () => {
    expect(component.orderDetailsForm).toBeDefined();
  });

  it('should set the orderDetailsForm correctly', () => {
    expect(component.orderDetailsForm).toEqual(
      component.purchaseOrderForm.get('orderDetails') as FormGroup
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
});