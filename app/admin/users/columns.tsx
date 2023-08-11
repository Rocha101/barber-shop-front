"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import formatPhoneNumber from "@/lib/phoneMask";

export type Users = {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

const actionButtons = [{ icon: "Editar", label: "Editar" }];

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Nome",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => {
      return <div>{formatPhoneNumber(row.original.phone)}</div>;
    },
  },

  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <div>
          <Link href={`/admin/users/edit/${row.getValue("id")}`} passHref>
            <Button variant="link" key="Editar" className="h-8 w-8 p-0">
              Editar
            </Button>
          </Link>
        </div>
      );
    },
  },
];
