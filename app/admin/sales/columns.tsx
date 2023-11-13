"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Order } from "./sales";
import formatMoney from "@/lib/moneyMask";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "",
    header: "Cliente",
    cell: ({ row }) => {
      const { customerInfo } = row.original;
      return <p>{customerInfo.name}</p>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Data",
    cell: ({ row }) => {
      return (
        <p>{new Date(row.original.created_at).toLocaleDateString("pt-Br")}</p>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: "Valor total",
    cell: ({ row }) => {
      return <span>{formatMoney(+row.original.total_price)}</span>;
    },
  },
  /* {
    accessorKey: "status",
    header: "Produtos",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2">
          {row.original.products.map((product) => (
            <p key={product.id} className="bg-green-600 text-black text-lg">
              {product.name}
            </p>
          ))}
        </div>
      );
    },
  }, */
];
