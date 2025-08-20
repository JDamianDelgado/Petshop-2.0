import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "example.com",
      "otro-dominio.com",
      "imagenes-externas.net",
    ],
  },
};

export default nextConfig;
