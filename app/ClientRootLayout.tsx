"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<number | null>(() => {
    const id = localStorage.getItem("userId");
    return id ? parseInt(id) : null;
  });

  useEffect(() => {
    if (!currentUserId) {
      router.push("/sign-in");
    }else if(pathname === '/'){
      router.push("/home");
    }
  }, []);

  return <>{children}</>;
}
