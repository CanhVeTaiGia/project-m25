import AdminHeader from "@/layouts/header/AdminHeader";
import AdminNavbar from "@/layouts/navbar/AdminNavbar";
import React from "react";

const Admin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="vi">
      <body>
        <main className="w-[100%] flex h-[100vh]">
          <AdminNavbar></AdminNavbar>
          <div className="flex flex-col w-[87%]">
            <AdminHeader />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default Admin;
