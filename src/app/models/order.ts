import { CartItem } from './cart-item';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  createdAt: string;
}
