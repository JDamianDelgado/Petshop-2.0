"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newPassword) return alert("Ingresa una nueva contraseña");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al restablecer la contraseña");
      } else {
        alert(data.message || "Contraseña restablecida con éxito");
        router.push("/login"); // Redirige al login
      }
    } catch (err) {
      console.error(err);
      alert("Error al restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Ingresa tu nueva contraseña</h2>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-sm"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full max-w-sm ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Cargando..." : "Restablecer contraseña"}
      </button>
    </div>
  );
}
