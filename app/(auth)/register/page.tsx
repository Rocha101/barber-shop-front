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
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as z from "zod";

const formSchema = z
  .object({
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
    confirmPassword: z
      .string({
        required_error: "Senha obrigatória",
      })
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      phone: "",
      confirmPassword: "",
    },
  });

  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };
    axios
      .post("http://localhost:8080/api/barbers", data, config)
      .then((res) => {
        toast({
          title: "Você foi cadastrado com sucesso!",
        });
        form.reset();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível cadastrar",
        });
      });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <div className="flex flex-col border p-4 rounded-md w-96">
        <h1 className="text-3xl font-bold mb-5">Registro</h1>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
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

            <Button>Registrar</Button>
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

export default Login;
