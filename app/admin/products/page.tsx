"use client";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import api from "@/utils/api";

export default function Produtos() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });
  useEffect(() => {
    const url = `/products?page=${pagination.page}&size=${pagination.size}`;
    api
      .get(url)
      .then((response) => {
        console.log(response);
        setData(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pagination.page, pagination.size]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Produtos</h2>
        <Link href="/admin/products/create" passHref>
          <Button>Novo Produto</Button>
        </Link>
      </div>
      <DataTable
        data={data}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}
