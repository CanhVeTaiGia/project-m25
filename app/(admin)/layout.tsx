"use client";
import AdminNavbar from "@/layouts/navbar/AdminNavbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Admin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const route = useRouter();
  const [currentId, setCurrentId] = useState<number | undefined>(() => {
    localStorage.getItem("userId");
    return localStorage.getItem("userId")
      ? parseInt(localStorage.getItem("userId")!)
      : undefined;
  });

  useEffect(() => {
    if (!currentId) {
      route.push("/sign-in");
    }
  }, []);
  return (
    <main className="w-[100%] overflow-hidden flex h-[100vh]">
      <AdminNavbar></AdminNavbar>
      <div className="flex flex-col w-[87%]">{children}</div>
    </main>
  );
};

export default Admin;
