"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Service } from "./service";
import formatMoney from "@/lib/moneyMask";

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "totalTime",
    header: "Tempo total",
  },
  {
    accessorKey: "price",
    header: "Valor",
    cell: ({ row }) => {
      return <span>{formatMoney(+row.original.price)}</span>;
    },
  },
];
