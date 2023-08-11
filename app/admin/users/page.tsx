"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import exportExcel from "@/lib/excelExport";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";

const UsersPage = () => {
  const router = useRouter();

  const [barbers, setBarbers] = useState<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const url = `http://localhost:8080/api/barbers`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(url, config)
      .then((response) => {
        console.log(response);
        setBarbers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [table, setTable] = useState<any>(null);
  const handleExport = (table: any) => {
    setTable(table);
  };

  return (
    <div className="">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="text-lg font-bold">Usuários</h2>
      </div>
      <DataTable
        data={barbers}
        columns={columns}
        onTableChange={handleExport}
        onRowClick={(row: any) => {
          router.push(`/admin/users/edit/${row.id}`);
        }}
        actions={
          <>
            <Button
              variant={"outline"}
              size={"sm"}
              className="flex items-center gap-2"
              onClick={() => exportExcel(table, "usuários")}
            >
              Exportar em XLSX
            </Button>
          </>
        }
      />
    </div>
  );
};

export default UsersPage;
