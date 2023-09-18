"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { BiCut, BiSolidTrashAlt } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Services = () => {
  const router = useRouter();

  const [service, setService] = useState([
    {
      description: "",
      total_time: "",
      price: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/labor")
      .then((res) => {
        console.log(res.data);
        setService(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível buscar os serviços",
        });
      });
  }, []);

  const removeLabor = (id: number) => {
    axios
      .delete(`http://localhost:8080/api/labor/` + id)
      .then((res) => {
        console.log(res);
        toast({
          title: "serviço removido com sucesso!",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível remover o serviço",
        });
      });
  };

  return (
    <div className="">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Serviços</h2>
        <Button
          onClick={() => {
            router.push("/admin/services/new");
          }}
        >
          Novo Serviço
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {service.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-start justify-between border p-3 rounded-md gap-2 relative group"
            >
              <div className="w-full h-32 border flex items-center justify-center">
                <BiCut className="h-12 w-12" />
              </div>
              <h1 className="text-lg font-bold">{item.description}</h1>
              <div className="flex flex-col gap-1 items-start w-full">
                <p>Tempo Total: {item.total_time}</p>
                <p>Preço: R${item.price}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="absolute bottom-3 right-3 hidden group-hover:block">
                    <BiSolidTrashAlt />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    Tem certeza que deseja apagar o serviço?
                  </DialogTitle>
                  <DialogDescription>
                    Essa ação não poderá ser desfeita.
                  </DialogDescription>

                  <DialogFooter>
                    <DialogTrigger asChild>
                      <Button variant="link">Cancelar</Button>
                    </DialogTrigger>
                    <Button onClick={() => removeLabor(item.id)}>
                      Confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
