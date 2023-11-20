"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Schedule } from "./schedule";

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "title",
    header: "Cliente",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">{row.original.events.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "",
    header: "Serviço",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">
            {row.original.services[0].description}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">
            {new Date(row.original.events.end_time).toLocaleDateString("pt-BR")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "",
    header: "Horário",
    cell: ({ row }) => {
      const start_time = new Date(row.original.events.start_time)
        .toLocaleString()
        .split(" ")[1];
      const end_time = new Date(row.original.events.end_time)
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
    accessorKey: "location",
    header: "Localização",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">{row.original.location.description}</span>
        </div>
      );
    },
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
