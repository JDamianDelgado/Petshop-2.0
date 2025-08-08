"use client";

import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RegisterLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
