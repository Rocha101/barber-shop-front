"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

interface Schedule {
  title: string;
  description: string;
  date: Date;
  start_time: string;
  end_time: string;
  location: string;
  color: string;
}

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "title",
    header: "Titulo",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">{row.original.events.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">{row.original.events.start_time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "",
    header: "Horário",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="">
            {row.original.events.start_time} - {row.original.events.end_time}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "locationId",
    header: "Localização",
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
