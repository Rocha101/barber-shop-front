"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Schedule } from "./schedule";

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
      const date = new Date(row.original.events.start_time);
      const hourMinute = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date);

      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm">{hourMinute}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "",
    header: "Horário",
    cell: ({ row }) => {
      const start_date = new Date(row.original.events.start_time);
      const start_hourMinute = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(start_date);

      const end_date = new Date(row.original.events.start_time);
      const end_hourMinute = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(end_date);
      return (
        <div className="flex flex-col gap-1">
          <span className="">
            {start_hourMinute} - {end_hourMinute}
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
