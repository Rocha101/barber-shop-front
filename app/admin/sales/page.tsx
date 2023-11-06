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
  AiFillDelete,
  AiOutlineArrowLeft,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlinePlus,
} from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useHookFormMask } from "use-mask-input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: number;
  description: string;
  price: number;
  quantity: number;
  status: string;
  userId: string;
}

interface Sale {
  customerInfo: {
    name: string;
    document?: string;
    phone?: string;
  };
  products: any[];
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

  const [products, setProducts] = useState<Product[]>();
  const [selectedProducts, setSelectedProducts] = useState<any[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    const token = Cookies.get("token");
    axios;
    const data: Sale = {
      customerInfo: {
        name: values.name,
        document: values.document,
        phone: values.phone,
      },
      products: selectedProducts || [],
      userId: JSON.parse(Cookies.get("user") || "{}").id,
    };
    console.log(data);
    const url = `http://localhost:8080/api/sale`;
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

  const [data, setData] = useState([]);

  const handleAddProduct = (product: Product) => {
    if (selectedProducts?.find((p) => p.id === product.id)) {
      // if product already exists, update quantity
      const newProducts = (selectedProducts || []).map((p) => {
        if (p.id === product.id) {
          // increment quantity by 1
          p.quantity = p.quantity + 1;
        }
        return p;
      });
      setSelectedProducts(newProducts); // set selectedProducts to the new array with updated quantities
    } else {
      // if product doesn't exist, add it with quantity 1
      setSelectedProducts([
        ...(selectedProducts || []),
        { ...product, quantity: 1 },
      ]);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user") || "{}");
    console.log(token);
    const url = `http://localhost:8080/api/product`;
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .get(url, config)
      .then((response) => {
        console.log(response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredProducts = products?.filter((product) =>
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-4 relative"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="border p-4 rounded-md h-full w-full col-span-2">
              <div className="py-2 font-bold">
                <p>Informações Cliente</p>
              </div>
              <div className="flex gap-3">
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
                        <Input {...field} />
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-3 p-4 rounded-md border">
              <p className="font-bold">Produtos Selecionados</p>
              <div className="flex flex-wrap gap-2 w-full col-span-2 ">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Quantidade</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProducts && selectedProducts?.length > 0 ? (
                      selectedProducts?.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.description}</TableCell>
                          <TableCell>R$ {product.price}</TableCell>
                          <TableCell>
                            <Input
                              className="max-w-[100px]"
                              type="number"
                              value={product.quantity}
                              onChange={(e) => {
                                if (+e.target.value < 0) return;
                                if (+e.target.value === 0) {
                                  setSelectedProducts((prev) => {
                                    return prev?.filter(
                                      (p) => p.id !== product.id
                                    );
                                  });
                                  return;
                                }
                                const newProducts = (
                                  selectedProducts || []
                                ).map((p) => {
                                  if (p.id === product.id) {
                                    p.quantity = +e.target.value;
                                  }
                                  return p;
                                });
                                setSelectedProducts(newProducts);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          Nenhum resultado encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>

                  <TableRow className="border-t">
                    <TableCell className="font-bold col-span-2">
                      Total
                    </TableCell>
                    <TableCell>
                      R${" "}
                      {selectedProducts && selectedProducts?.length > 0
                        ? selectedProducts?.reduce(
                            (sum, product) => sum + product.price,
                            0
                          ) *
                          selectedProducts?.reduce(
                            (sum, product) => sum + product.quantity,
                            0
                          )
                        : 0}
                    </TableCell>
                    <TableCell>
                      {selectedProducts && selectedProducts?.length > 0
                        ? selectedProducts?.reduce(
                            (sum, product) => sum + product.quantity,
                            0
                          )
                        : 0}
                    </TableCell>
                  </TableRow>
                </Table>
              </div>
            </div>

            <div className="col-span-2 flex flex-col">
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Pesquisar..."
                className="w-[200px]"
              />
              <div className="py-4 max-h-full flex-1 overflow-y-auto flex-wrap gap-2">
                {filteredProducts && filteredProducts.length > 0 ? (
                  filteredProducts?.map((product) => (
                    <div
                      key={product.id}
                      className="w-[200px] border p-4 rounded-md flex flex-col items-start gap-3"
                    >
                      <p className="text-md">
                        {product.description.toUpperCase()}
                      </p>
                      <div className="w-full flex justify-between items-center">
                        <p className="font-bold">R$ {product.price}</p>
                        <Button
                          className="bg-emerald-500 hover:bg-emerald-600"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddProduct(product);
                          }}
                        >
                          <AiOutlinePlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nenhum produto encontrado</p>
                )}
              </div>
            </div>

            <div className="h-full w-full col-span-2 justify-end items-end flex">
              <Button
                className="w-32 flex gap-1"
                type="submit"
                variant="outline"
              >
                <AiOutlineCheck className="h-4 w-4" />
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
