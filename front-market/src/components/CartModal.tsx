"use client";

import { RootState } from "@/app/redux/store";
import { cartActions } from "@/features/cart/cartSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartModal() {
  const dispatch = useDispatch();
  const [tokenExists, setTokenExists] = useState(false);

  const { isOpen } = useSelector((state: RootState) => state.cartView);
  const { cart, loading } = useSelector(
    (state: RootState) => state.cartProduct
  );
  const user = useSelector((state: RootState) => state.authLogin.user);

  useEffect(() => {
    setTokenExists(!!localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    dispatch(cartActions.resetCartState());
  }, [user, dispatch]);

  if (!isOpen || !user) return null;

  return (
    <aside className="fixed top-[56px] right-4 z-50 w-80 max-h-[70vh] bg-white shadow-lg rounded-md overflow-auto border border-gray-200">
      <header className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h2 className="text-lg font-semibold">Carrito</h2>
        <button
          aria-label="Cerrar carrito"
          className="text-gray-600 hover:text-gray-900 transition"
          onClick={() => dispatch(cartActions.closeCart())}
        >
          ✕
        </button>
      </header>

      <section className="p-4">
        {loading ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : cart.length === 0 ? (
          <p className="text-center text-gray-500">Tu carrito está vacío</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.name + item.price} className="py-3 flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-600">
                  Cantidad: {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
}
