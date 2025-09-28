"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      router.replace("/sign-in");
    }
  }, []);

  return <div className="p-4 text_change">{children}</div>;
}
