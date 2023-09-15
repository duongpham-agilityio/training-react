import { Product } from './product';

export type CartType = Omit<Product, 'quantity' | 'description' | 'isAdd'> & {
  quantity: number;
};
