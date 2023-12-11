"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import * as z from "zod";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import axios from "axios";

const formSchema = z
  .object({
    name: z
      .string({
        required_error: "Nome obrigatório",
      })
      .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
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
    confirmPassword: z
      .string({
        required_error: "Senha obrigatória",
      })
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    start_time: z.string(),
    end_time: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

const Entrar = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      start_time: "",
      end_time: "",
    },
  });

  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);

    const formData = {
      email: values.email,
      password: values.password,
      start_time: values.start_time,
      end_time: values.end_time,
      username: values.name,
    };

    api
      .post("/auth/register", formData)
      .then((res) => {
        console.log(res);
        toast({
          title: "Você foi cadastrado com sucesso!",
        });
        router.push("/login");
        form.reset();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível cadastrar",
        });
      })
      .finally(() => setLoading(false));
  }

  if (loading)
    return (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-background backdrop-blur-md">
        <AiOutlineLoading3Quarters className="h-20 w-20 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <div className="flex flex-col border p-4 rounded-md w-96">
        <h1 className="text-3xl font-bold mb-5">Cadastro</h1>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Input
                        type={visibleConfirmPass ? "text" : "password"}
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setVisibleConfirmPass(!visibleConfirmPass);
                      }}
                    >
                      {visibleConfirmPass ? (
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

            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Início Expediente</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fim Expediente</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button>Cadastrar</Button>
          </form>
        </Form>
        <div className="w-full flex items-center justify-center mt-3">
          <Link href="/login" passHref>
            <Button variant="link">Já tenho uma conta</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Entrar;
