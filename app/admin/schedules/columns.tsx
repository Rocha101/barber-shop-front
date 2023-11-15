"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Schedule } from "./schedule";

type Event = {
  id: number;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  userId: number;
  customerId: number;
  serviceId: number;
  scheduleId: number;
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: "Titulo",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">{row.original.title}</span>
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
          <span className="text-sm">
            {new Date(row.original.end_time).toLocaleDateString("pt-BR")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "",
    header: "Horário",
    cell: ({ row }) => {
      const start_time = new Date(row.original.start_time)
        .toLocaleString()
        .split(" ")[1];
      const end_time = new Date(row.original.end_time)
        .toLocaleString()
        .split(" ")[1];

      return (
        <div className="flex flex-col gap-1">
          <span className="">
            {start_time} - {end_time}
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
