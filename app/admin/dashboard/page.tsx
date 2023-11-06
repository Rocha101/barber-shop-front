"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  phone?: string;
  start_time: string;
  end_time: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") || "{}");
    console.log(user);
    setUser(user);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-10 gap-10">
      <h1 className="text-3xl font-bold">
        Seja Bem-vindo (a) {user?.username?.toUpperCase()}
      </h1>
      <div className="flex">
        <Image src="/logo.png" width={250} height={250} alt={""} />
      </div>
    </div>
  );
};

export default Dashboard;
