import { SelectedProduct } from './products/products.model';

export interface PurchaseOrder {
  id: number;
  orderDetails: Order;
  product: SelectedProduct[];
  payment: Payment;
}

export interface Order {
  supplierName: string;
  location: string;
  invoiceNumber: string;
  notes: string;
}

export interface Payment {
  period: string;
  method: string;
  paidAmount: number;
  dueDate: string;
}
