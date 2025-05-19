"use client";

import { Toaster } from "react-hot-toast";
import AdminLayout from "@/layouts/admin/layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminLayout>
      {children}
      <Toaster />
    </AdminLayout>
  );
}
