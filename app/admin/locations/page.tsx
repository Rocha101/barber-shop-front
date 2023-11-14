"use client";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LocationT } from "./locations";
import api from "@/utils/api";

export default function Locations() {
  const [data, setData] = useState<LocationT[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user") || "{}");
    console.log(token);
    const url = `/location`;
    const config = {
      headers: { Authorization: `${token}` },
    };
    api
      .get(url, config)
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
