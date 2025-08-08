import { CartItems } from 'src/Entities/CartItems.entity';

export interface ProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  stock?: number;
  cartItems?: CartItems[];
}
