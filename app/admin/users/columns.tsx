"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import formatPhoneNumber from "@/lib/phoneMask";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { BiSolidTrashAlt, BiTrashAlt } from "react-icons/bi";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export type Users = {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

const actionButtons = [{ icon: "Editar", label: "Editar" }];

const removeUser = (id: number) => {
  axios
    .delete(`http://localhost:8080/api/barbers/` + id)
    .then((res) => {
      console.log(res);
      toast({
        title: "Usuário removido com sucesso!",
      });
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
      toast({
        title: "Não foi possível remover o usuário",
      });
    });
};

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
        <div className="flex gap-4 items-center">
          <Link href={`/admin/users/edit/${row.getValue("id")}`} passHref>
            <Button variant="link" key="Editar" className="h-8 w-8 p-0">
              Editar
            </Button>
          </Link>
          <Button
            variant="destructive"
            key="Apagar"
            className="h-7 w-7 p-0"
            onClick={() => removeUser(row.getValue("id"))}
          >
            <BiSolidTrashAlt />
          </Button>
        </div>
      );
    },
  },
];
