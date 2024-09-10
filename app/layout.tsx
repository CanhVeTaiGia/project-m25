import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./provider";
import { ClientRootLayout } from "./ClientRootLayout";


export const metadata: Metadata = {
  title: "Minh Vỹ - Laptop",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/m25-project.appspot.com/o/logo%2FPC.png?alt=media&token=1e0a6997-a3d7-44f9-9781-0e3add488d45"
          type="image/png"
        />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <ClientRootLayout>{children}</ClientRootLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
