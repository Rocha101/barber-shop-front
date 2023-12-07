"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Order } from "./sales";
import formatMoney from "@/lib/moneyMask";

export const columns: ColumnDef<Order>[] = [
  // {
  //   accessorKey: "",
  //   header: "Cliente",
  //   cell: ({ row }) => {
  //     const { buyerInfos } = row.original;
  //     return <p>{buyerInfos[0].name}</p>;
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      return (
        <p>{new Date(row.original.createdAt).toLocaleDateString("pt-Br")}</p>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Valor total",
    cell: ({ row }) => {
      return <span>{formatMoney(+row.original.totalPrice)}</span>;
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
