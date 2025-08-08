"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Carousel from "@/components/carrusel";
import CardsProduct from "@/components/cardsProducts";
import Noticias from "@/components/Noticias";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchProducts } from "@/features/products/thunksProduct";

export default function Home() {
  const [imageCarrusel, setImageCarrusel] = useState<string[]>([]);
  const [allNoticias, setAllNoticias] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.productReducer
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow p-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenidos a Petshop
        </h1>

        <section className="mb-12">
          {imageCarrusel.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay imágenes disponibles para el carrusel
            </p>
          ) : (
            <Carousel images={imageCarrusel} />
          )}
        </section>

        <section className="w-full max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Productos destacados
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Cargando productos...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay productos disponibles
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <CardsProduct key={index} product={product} />
              ))}
            </div>
          )}
        </section>

        <section className="w-full max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Últimas noticias
          </h2>
          {allNoticias.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay noticias disponibles
            </p>
          ) : (
            <Noticias noticias={allNoticias} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
