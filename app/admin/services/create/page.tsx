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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import api from "@/utils/api";

const formSchema = z.object({
  description: z.string(),
  price: z.string(),
  total_time: z.string(),
});

const EditService = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      price: "",
      total_time: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user = JSON.parse(Cookies.get("user") || "{}");
    const data = {
      description: values.description,
      price: Number(values.price),
      userId: user.id,
      total_time: values.total_time,
    };
    console.log(data);
    api
      .post("/services", data)
      .then((res) => {
        console.log(res);
        router.push("/admin/services");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível realizar o login",
        });
      });
  }
  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Corte" {...field} />
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
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input placeholder="R$0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="total_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duração Total</FormLabel>
                <FormControl>
                  <Input placeholder="00:45" {...field} type="time" max={2} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Criar Serviço</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditService;
