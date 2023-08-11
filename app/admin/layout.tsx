"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNav from "@/components/top-nav";
import { AdminSidebar } from "@/components/admin-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  });
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <TopNav />
        <div className="flex flex-1">
          <AdminSidebar />
          <div className="flex-1 p-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
