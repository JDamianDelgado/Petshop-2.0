"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CardsProduct from "@/components/cardsProducts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { fetchProducts } from "@/features/products/thunksProduct";
import { fetchCarrousel } from "@/features/carrousel/thunksCarrousel";
import Carrousel from "@/components/carrusel";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.productReducer
  );
  const {
    item: carrousel,
    loading: loadingCarrousel,
    error: errorCarrousel,
  } = useSelector((state: RootState) => state.carrouselReducer);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCarrousel());
  }, [dispatch]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow p-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenidos a Petshop
        </h1>

        {/* Carrusel */}
        <section className="mb-12">
          {loadingCarrousel ? (
            <p className="text-center text-gray-500">Cargando imágenes...</p>
          ) : errorCarrousel ? (
            <p className="text-center text-red-500">{errorCarrousel}</p>
          ) : carrousel.length === 0 ? (
            <p className="text-center text-gray-500">
              No hay imágenes disponibles para el carrusel
            </p>
          ) : (
            <Carrousel items={carrousel} />
          )}
        </section>

        {/*productos*/}
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
              {products.map((product) => (
                <CardsProduct key={product.idProduct} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
