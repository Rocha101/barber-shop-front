"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/utils/api";

interface Location {
  description: string;
  userId: string;
}

const formSchema = z.object({
  description: z
    .string({
      required_error: "Descrição obrigatório",
    })
    .min(3, { message: "Descrição deve ter no mínimo 3 caracteres" }),
});

const EditUser = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const token = Cookies.get("token");
    const data: Location = {
      description: values.description,
      userId: JSON.parse(Cookies.get("user") || "{}").id,
    };
    console.log(data);
    const url = `/location`;
    const config = {
      headers: { Authorization: `${token}` },
    };
    api
      .post(url, data, config)
      .then((res) => {
        console.log(res);
        toast({
          title: "Localidade foi cadastrada com sucesso!",
        });
        form.reset();
        router.back();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível cadastrar",
        });
      });
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <Button
          variant={"secondary"}
          size={"sm"}
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <AiOutlineArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <h2 className="text-lg font-bold">Nova Localidade</h2>
      </div>
      <div className="mb-3 flex items-center gap-3">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Pinheirinho" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-32" type="submit">
              Cadastrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
