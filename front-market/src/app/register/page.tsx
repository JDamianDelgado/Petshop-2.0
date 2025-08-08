"use client";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { registerUser } from "@/features/auth/authSlice";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.authRegister
  );
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, age } = userData;

    if (!name || !email || !password || !age) {
      alert("Completa todos los campos");
      return;
    }

    dispatch(
      registerUser({
        name,
        email,
        password,
        age: Number(age),
      })
    );
    setUserData({
      name: "",
      email: "",
      password: "",
      age: "",
    });
  };

  useEffect(() => {
    if (user) alert("Usuario registrado correctamente");
    if (error) alert("Error: " + error);
  }, [user, error]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 bg-white rounded shadow">
          <h1 className="text-3xl font-bold text-center mb-6">Registro</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Nombre Completo
              </label>
              <input
                id="name"
                type="text"
                className="w-full border rounded p-2 mt-1"
                placeholder="Tu nombre"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="age" className="text-sm font-semibold">
                Edad
              </label>
              <input
                id="age"
                type="number"
                className="w-full border rounded p-2 mt-1"
                value={userData.age}
                onChange={(e) =>
                  setUserData({ ...userData, age: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded p-2 mt-1"
                placeholder="usuario@correo.com"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-semibold">
                Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded p-2 pr-10"
                  placeholder="********"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600 transition mt-2"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
