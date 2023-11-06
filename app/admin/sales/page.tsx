"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { infer, z } from "zod";

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
import {
  AiFillCheckCircle,
  AiOutlineArrowLeft,
  AiOutlineCheck,
} from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import { useHookFormMask } from "use-mask-input";

interface Sale {
  customerInfo: {
    name: string;
    document?: string;
    phone?: string;
  };
  products: {
    productId: string;
    quantity: number;
  }[];
  userId: string;
}

const formSchema = z.object({
  name: z.string({
    required_error: "Nome do cliente obrigatório",
  }),
  document: z
    .string({
      required_error: "Documento obrigatório",
    })
    .optional(),
  phone: z
    .string({
      required_error: "Telefone obrigatório",
    })
    .optional(),
});

const EditUser = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      document: "",
      phone: "",
    },
  });

  const registerWithMask = useHookFormMask(form.register);

  const [products, setProducts] = useState<any>(null);
  const [selectedProducts, setSelectedProducts] = useState<any>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const token = Cookies.get("token");
    axios;
    const data: Sale = {
      customerInfo: {
        name: values.name,
        document: values.document,
        phone: values.phone,
      },
      products: selectedProducts,
      userId: JSON.parse(Cookies.get("user") || "{}").id,
    };
    console.log(data);
    const url = `http://localhost:8080/api/product`;
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .post(url, data, config)
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
        <h2 className="text-lg font-bold">Nova Venda</h2>
      </div>
      <div className="mb-3 flex items-center gap-3">
        <Form {...form}>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="border p-4 rounded-md">
              <div className="py-2 font-bold">
                <p>Informações Cliente</p>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Shampoo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documento</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(xx)xxxxx-xxxx"
                        {...registerWithMask(
                          "phone",
                          ["(99) 99999-9999", "99999-9999"],
                          {
                            required: true,
                          }
                        )}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full col-span-2 justify-end flex">
              <Button
                size="lg"
                className="w-32"
                type="submit"
                variant="outline"
              >
                <AiOutlineCheck className="h-16 w-16" />
                Finalizar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
