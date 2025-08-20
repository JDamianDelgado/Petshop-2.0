"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, loginUser } from "@/features/auth/authSlice";
import type { RootState, AppDispatch } from "../redux/store";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.authLogin
  );
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
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
  const handleForgotPassword = async () => {
    setForgot(true);
  };

  const handleSendEmail = async () => {
    if (!forgotEmail) return;
    try {
      const resultAction = await dispatch(forgotPassword(forgotEmail));
      if (forgotPassword.fulfilled.match(resultAction)) {
        alert("Se ha enviado un correo para recuperar la contraseña");
        setForgot(false);
        setForgotEmail("");
      } else {
        alert(resultAction.payload || "Error al enviar el correo");
      }
    } catch (err) {
      console.error(err);
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
            <p className="text-center">
              Haz olvidado tu{" "}
              <a className="text-blue-500" onClick={handleForgotPassword}>
                contraseña
              </a>
            </p>
          </form>
        </div>
      </main>
      <Footer />

      {forgot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Recuperar contraseña
            </h2>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setForgot(false);
                  setForgotEmail("");
                }}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSendEmail}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
