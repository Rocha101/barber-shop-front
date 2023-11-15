"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { BiSolidTrashAlt } from "react-icons/bi";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/utils/api";

export type Users = {
  id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

const removeUser = (id: number) => {
  api
    .delete(`/user/` + id)
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
  },
  {
    accessorKey: "start_time",
    header: "Horário inicial",
  },
  {
    accessorKey: "end_time",
    header: "Horário final",
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
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                key="Apagar"
                className="h-7 w-7 p-0"
              >
                <BiSolidTrashAlt />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Tem certeza que deseja apagar?</DialogTitle>
              <DialogDescription>
                Essa ação não poderá ser desfeita.
              </DialogDescription>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button variant="link">Cancelar</Button>
                </DialogTrigger>
                <Button onClick={() => removeUser(row.getValue("id"))}>
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
