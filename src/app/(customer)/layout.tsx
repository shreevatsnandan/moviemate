"use client";

import { Toaster } from "react-hot-toast";
import CustomerLayout from "@/layouts/customer/layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomerLayout>
      {children}
      <Toaster />
    </CustomerLayout>
  );
}
