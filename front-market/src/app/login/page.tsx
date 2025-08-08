"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authSlice";
import type { RootState, AppDispatch } from "../store";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.authLogin
  );

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (error) {
      setErrorMsg(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userLogin;
    if (email && password) {
      setErrorMsg("");
      await dispatch(loginUser({ email, password }));
    } else {
      setErrorMsg("Email y contraseña son requeridos");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 bg-white rounded shadow">
          <h1 className="text-3xl font-bold text-center mb-6">
            Iniciar Sesión
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="email" className="text-sm font-semibold">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded p-2"
              placeholder="usuario@correo.com"
              value={userLogin.email}
              onChange={(e) =>
                setUserLogin({ ...userLogin, email: e.target.value })
              }
              required
            />

            <label htmlFor="password" className="text-sm font-semibold">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="w-full border rounded p-2"
              placeholder="********"
              value={userLogin.password}
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
              required
            />

            {errorMsg && (
              <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white rounded py-2 hover:bg-blue-600 transition mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
