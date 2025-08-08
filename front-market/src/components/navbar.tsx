"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { authActions } from "../features/auth/authSlice";
import { cartActions } from "@/features/cart/cartSlice";
import CartModal from "./CartModal";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.authLogin.user);
  const isLoggedIn = Boolean(user);

  const handleLogout = () => {
    dispatch(authActions.logout());
    alert("Se cerró la sesión");
    router.push("/login");
  };

  return (
    <>
      <nav className="bg-gray-100 p-4 flex justify-between items-center">
        <div>
          <Link href="/" className="font-bold text-xl">
            Petshop
          </Link>
        </div>

        <ul className="flex gap-6 items-center list-none">
          <li>
            <Link href="/">Home</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link href="/profile">Perfil</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-600">
                  Cerrar sesión
                </button>
              </li>
              <li>
                <button onClick={() => dispatch(cartActions.openCart())}>
                  Carrito
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Iniciar sesión</Link>
              </li>
              <li>
                <Link href="/register">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <CartModal />
    </>
  );
}
