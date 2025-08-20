"use client";
import CardsProduct from "@/components/cardsProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchProducts } from "@/features/products/thunksProduct";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

export default function Productos() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.productReducer
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductClick = (id: string) => {
    router.push(`/productos/${id}`);
  };

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        {loading ? (
          <h2 className="text-center text-4xl font-bold text-blue-600 animate-pulse">
            Cargando Productos...
          </h2>
        ) : error ? (
          <p className="text-center text-3xl font-semibold text-red-500 animate-pulse">
            {error}
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-3xl font-semibold text-gray-700">
            No hay productos disponibles
          </p>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <CardsProduct
                key={product.idProduct}
                product={product}
                onClick={() => handleProductClick(product.idProduct)}
              />
            ))}
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
