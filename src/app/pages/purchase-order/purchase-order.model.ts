import { Order } from './order-details/order-details.model';
import { Payment } from './products/payment/payment.model';
import { SelectedProduct } from './products/products.model';

export interface PurchaseOrder {
  id: number;
  orderDetails: Order;
  product: SelectedProduct[];
  payment: Payment;
}
