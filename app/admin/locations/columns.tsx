"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LocationT } from "./locations";

export const columns: ColumnDef<LocationT>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  /*  {
    accessorKey: "price",
    header: "Valor",
    cell: ({ row }) => {
      return <span>{formatMoney(+row.original.price)}</span>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantidade em estoque",
  },
  {
    accessorKey: "status",
    header: "Estado",
  }, */
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
