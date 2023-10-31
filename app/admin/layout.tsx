"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNav from "@/components/top-nav";
import { AdminSidebar } from "@/components/admin-sidebar";
import Cookies from "js-cookie";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  });

  return (
    <>
      <div className="relative flex min-h-screen flex-col h-full">
        <TopNav />
        <div className="h-full flex flex-1">
          <AdminSidebar />
          <div className="h-full flex-1 p-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
