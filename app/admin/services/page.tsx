"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { DataTable } from "@/components/data-table";
import { Service } from "./service";
import { columns } from "./columns";
import api from "@/utils/api";

const Services = () => {
  const router = useRouter();

  const [service, setService] = useState<Service[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  useEffect(() => {
    api
      .get(`/services?page=${pagination.page}&size=${pagination.size}`)
      .then((res) => {
        console.log(res.data);
        setService(res.data.content);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível buscar os serviços",
        });
      });
  }, [pagination.page, pagination.size]);

  const removeLabor = (id: number) => {
    api
      .delete(`/services/` + id)
      .then((res) => {
        console.log(res);
        toast({
          title: "serviço removido com sucesso!",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível remover o serviço",
        });
      });
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Serviços</h2>
        <Link href="/admin/services/create" passHref>
          <Button>Novo serviço</Button>
        </Link>
      </div>
      <DataTable
        data={service}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default Services;
