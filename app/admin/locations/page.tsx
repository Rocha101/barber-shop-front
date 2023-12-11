"use client";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LocationT } from "./locations";
import api from "@/utils/api";

export default function Locations() {
  const [data, setData] = useState<LocationT[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  useEffect(() => {
    const url = `/locations`;

    api
      .get(url)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pagination.page, pagination.size]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Localidades</h2>
        <Link href="/admin/locations/create" passHref>
          <Button>Nova Localidade</Button>
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
