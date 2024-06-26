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

interface Product {
  description: string;
  price: number;
  quantity: number;
  status: string;
  userId: string;
}

const formSchema = z.object({
  description: z
    .string({
      required_error: "Descrição obrigatório",
    })
    .min(3, { message: "Descrição deve ter no mínimo 3 caracteres" }),
  price: z.string({
    required_error: "Descrição obrigatório",
  }),
  quantity: z.string({
    required_error: "Descrição obrigatório",
  }),
  status: z.string({
    required_error: "Descrição obrigatório",
  }),
});

const EditUser = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      price: "0",
      quantity: "0",
      status: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      description: values.description,
      price: parseFloat(Number(values.price).toFixed(2)),
      quantity: Number(values.quantity),
      status: "Ativo",
      userId: JSON.parse(Cookies.get("user") || "{}").id,
    };
    console.log(data);
    const url = `/products`;
    api
      .post(url, data)
      .then((res) => {
        console.log(res);
        toast({
          title: "Produto foi cadastrado com sucesso!",
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
        <h2 className="text-lg font-bold">Novo Produto</h2>
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
                    <Input placeholder="Shampoo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade em estoque</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
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
