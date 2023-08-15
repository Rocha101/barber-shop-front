"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();

  const [service, setService] = useState([
    {
      name: "",
      description: "",
      icon: "",
    },
  ]);

  return (
    <div className="">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Serviços</h2>
        <Button
          onClick={() => {
            router.push("/admin/services/new");
          }}
        >
          Novo Serviço
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {service.map((item, index) => {
          return (
            <div key={index} className="flex flex-col border p-3 rounded-md">
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
