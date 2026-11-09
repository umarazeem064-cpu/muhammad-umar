import { Product, ProductSize } from './data/products';

export interface CartItem {
  cartId: string;
  product: Product;
  selectedSize?: ProductSize;
  selectedCrust?: string;
  quantity: number;
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'placed' | 'kitchen_prep' | 'oven_baking' | 'rider_dispatched' | 'on_the_way' | 'delivered';

export type PaymentMethodType = 'cod' | 'card' | 'easypaisa' | 'jazzcash' | 'payoneer' | 'sadapay' | 'nayapay' | 'raast';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  area: string;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'paid' | 'pending';
  transactionId?: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  createdAt: string;
  status: OrderStatus;
  estimatedDeliveryTime: string;
  riderName: string;
  riderPhone: string;
  riderVehicle: string;
  trackingStep: number; // 0 to 5
}

export interface Reservation {
  id: string;
  token: string;
  name: string;
  phone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingArea: string;
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'completed';
  createdAt: string;
}

export interface UserReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  favoriteItem: string;
  verifiedOrder: boolean;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'deal' | 'system';
  read: boolean;
}
