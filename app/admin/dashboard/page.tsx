"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-10 gap-10">
      <h1 className="text-3xl font-bold">
        Seja Bem-vindo (a){" "}
        {JSON.parse(
          sessionStorage.getItem("user") || "{}"
        )?.username.toUpperCase()}
      </h1>
      <div className="flex">
        <Image src="/logo.png" width={250} height={250} alt={""} />
      </div>
    </div>
  );
};

export default Dashboard;
