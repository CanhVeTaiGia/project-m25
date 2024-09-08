"use client"; // Đánh dấu là Client Component

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const currentUser = localStorage.getItem("userId");
    if (!currentUser) {
      router.push("/sign-in");
    }
  }, [router]);

  return <>{children}</>;
}
