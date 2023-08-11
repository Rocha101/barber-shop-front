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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
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

const Login = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("http://localhost:8080/api/login", values, config)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.data));
        toast({
          title: "Login realizado com sucesso!",
        });
        router.push("/admin/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <div className="flex flex-col border p-4 rounded-md w-96">
        <h1 className="text-3xl font-bold mb-5">Login</h1>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button>Login</Button>
          </form>
        </Form>
        <div className="w-full flex items-center justify-center mt-3">
          <Link href="/register" passHref>
            <Button variant="link">Quero criar minha conta</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
