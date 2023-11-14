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

  useEffect(() => {
    const url = `/location`;

    api
      .get(url)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Localidades</h2>
        <Link href="/admin/locations/create" passHref>
          <Button>Nova Localidade</Button>
        </Link>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
