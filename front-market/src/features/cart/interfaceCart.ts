export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartState {
  cart: Product[];
  loading: boolean;
  error: string | null;
  status: "Inactivo" | "Pendiente" | "Activo" | "Fallido";
}
