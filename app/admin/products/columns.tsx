"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

interface Product {
  description: string;
  price: number;
  quantity: number;
  status: string;
  userId: string;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "price",
    header: "Valor",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade em estoque",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  /*  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4 items-center">
          <Link href={`/admin/users/edit/${row.getValue("id")}`} passHref>
            <Button variant="link" key="Editar" className="h-8 w-8 p-0">
              Editar
            </Button>
          </Link>
        </div>
      );
    },
  }, */
];
