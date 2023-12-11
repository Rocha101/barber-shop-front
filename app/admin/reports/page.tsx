"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ReportT } from "./report-type";
import api from "@/utils/api";
import { TbLoader2 } from "react-icons/tb";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { title } from "process";
import { BiMoney } from "react-icons/bi";
import { AiFillMoneyCollect } from "react-icons/ai";
import {
  MdAttachMoney,
  MdMoney,
  MdPeople,
  MdPrint,
  MdToday,
} from "react-icons/md";

const ReportsPage = () => {
  const [data, setData] = useState<ReportT>();
  const [initialDate, setInitialDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const getReports = async () => {
    if (!initialDate || !endDate) {
      toast({
        title: "Erro",
        description: "Informe o período.",
      });
      return;
    }
    console.log(initialDate, endDate);
    setLoading(true);
    const url = `/report?startDate=${initialDate}&endDate=${endDate}`;
    api
      .get(url)
      .then((response) => {
        setLoading(false);
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    const url = `/report?startDate=2023-09-23&endDate=2023-11-29`;
    api
      .get(url)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="h-screen w-full flex flex-col gap-3">
      <h1 className="text-xl font-bold">Relatórios</h1>
      <div className="flex gap-2 items-end">
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Data Inicio</Label>
          <Input
            value={initialDate}
            onChange={(event) => setInitialDate(event.target.value)}
            type="date"
            className="w-64"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Data Fim</Label>
          <Input
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            type="date"
            className="w-64"
          />
        </div>

        <Button onClick={getReports} disabled={loading}>
          {loading && <TbLoader2 className="mr-2 h-4 w-4 animate-spin" />}
          Gerar Relatório
        </Button>
        <Button
          variant="ghost"
          className="ml-auto"
          onClick={() => window.print()}
        >
          <MdPrint className="mr-2" />
          PDF
        </Button>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3">
        {[
          {
            title: "Total de vendas",
            value: data?.totalSales || "",
            icon: <MdAttachMoney />,
          },
          {
            title: "Faturamento total",
            value: data?.totalMoney || "",
            icon: <MdMoney />,
          },
          {
            title: "Total de clientes",
            value: data?.numberOfCustomers || "",
            icon: <MdPeople />,
          },
        ].map((item) => (
          <Card key={item.title} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {item.value || "Não informado"}{" "}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className=" w-full md:w-1/2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-sm font-medium">
            Faturamento por dia
          </CardTitle>
          <MdToday />
        </CardHeader>
        <CardContent className="pl-4">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data?.sales}>
              <XAxis
                dataKey="created_at"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value}
              />

              <Bar fill="#000000" dataKey="total_price" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
