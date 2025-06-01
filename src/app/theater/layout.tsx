"use client";

import { Toaster } from "react-hot-toast";
import TheaterLayout from "@/layouts/theater/layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TheaterLayout>
      {children}
      <Toaster />
    </TheaterLayout>
  );
}
