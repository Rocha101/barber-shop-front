"use client";

import Link from "next/link";
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
import {
  AiOutlineArrowLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const formSchema = z.object({
  id: z.number(),
  username: z
    .string({
      required_error: "Nome obrigatório",
    })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  phone: z
    .string({
      required_error: "Telefone obrigatório",
    })
    .min(10, { message: "Telefone deve ter no mínimo 10 caracteres" })
    .max(11, { message: "Telefone deve ter no máximo 11 caracteres" }),
  email: z
    .string({
      required_error: "Email obrigatório",
    })
    .email({ message: "Email inválido" }),
  password: z
    .string({
      required_error: "Senha obrigatória",
    })
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

const EditUser = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      email: "",
      password: "",
      username: "",
      phone: "",
    },
  });

  const [visiblePass, setVisiblePass] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put("http://localhost:8080/api/barbers", values, config)
      .then((res) => {
        console.log(res);
        toast({
          title: "Você foi cadastrado com sucesso!",
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/barbers/" + params.id)
      .then((res) => {
        form.setValue("email", res.data.email);
        form.setValue("password", res.data.password);
        form.setValue("username", res.data.username);
        form.setValue("phone", res.data.phone);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível carregar o usuário",
        });
      });
  }, [form, params.id]);

  useEffect(() => {
    form.setValue("id", +params.id);
  }, [form, params.id]);

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
        <h2 className="text-lg font-bold">Editar Usuário: {params.id}</h2>
      </div>
      <div className="mb-3 flex items-center gap-3">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="joao" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="joaobarbeiro@gmail.com" {...field} />
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
                    <Input placeholder="(xx)xxxxx-xxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Input
                        type={visiblePass ? "text" : "password"}
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setVisiblePass(!visiblePass);
                      }}
                    >
                      {visiblePass ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-32" type="submit">
              Registrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
