export interface Product {
  idProduct: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export type newProduct = Product;

export type updateProduct = Partial<Product>;

export interface ProductState {
  products: Product[];
  selectedProduct?: Product | null;
  loading: boolean;
  error: string | null;
  status: "Inactivo" | "Pendiente" | "Activo" | "Fallido";
}
