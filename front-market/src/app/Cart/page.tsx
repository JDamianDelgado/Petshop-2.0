"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import CardsProduct from "@/components/cardsProducts";

export default function Cart() {
  const [addProducts, setAddProducts] = useState<any[]>([]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full p-6 bg-white rounded shadow">
          <h1 className="text-3xl font-bold text-center mb-6">
            Carrito de Compras
          </h1>

          {addProducts.length === 0 ? (
            <p className="text-center text-gray-500">Tu carrito está vacío.</p>
          ) : (
            <div className="space-y-4">
              {addProducts.map((product, index) => (
                <CardsProduct key={index} products={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
