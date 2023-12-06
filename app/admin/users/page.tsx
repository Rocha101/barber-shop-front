"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import exportExcel from "@/lib/excelExport";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";

import { columns } from "./columns";
import Cookies from "js-cookie";
import api from "@/utils/api";

const UsersPage = () => {
  const router = useRouter();

  const [barbers, setBarbers] = useState<any>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
  });

  useEffect(() => {
    const url = `/users?page=${pagination.page}&size=${pagination.size}`;
    api
      .get(url)
      .then((response) => {
        console.log(response);
        setBarbers(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pagination.page, pagination.size]);

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
        pagination={pagination}
        setPagination={setPagination}
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
