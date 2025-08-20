"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { viewProduct } from "@/features/products/thunksProduct";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ProductDetail() {
  const { idProduct } = useParams() as { idProduct: string };
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, selectedProduct } = useSelector(
    (state: RootState) => state.productReducer
  );

  useEffect(() => {
    if (idProduct) dispatch(viewProduct(idProduct));
  }, [dispatch, idProduct]);

  if (loading)
    return (
      <p className="text-center text-2xl animate-pulse">Cargando producto...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!selectedProduct)
    return <p className="text-center text-gray-700">Producto no encontrado</p>;

  const product = selectedProduct;

  return (
    <div className="p-6">
      <Navbar />
      <Image
        src={"/image.png"}
        alt={product.name}
        width={600}
        height={400}
        className="mx-auto mb-4 rounded"
        priority={true}
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="text-lg font-semibold">Precio: ${product.price}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Comprar
      </button>
      <Footer />
    </div>
  );
}
