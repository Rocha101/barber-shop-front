"use client";
import React, { useState } from "react";
import GeneralReport from "./report";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";
import { ReportT } from "./report-type";
import api from "@/utils/api";

const ReportsPage = () => {
  const [data, setData] = useState<ReportT>();
  const [initialDate, setInitialDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getReports = async () => {
    if (!initialDate || !endDate) {
      toast({
        title: "Erro",
        description: "Informe o período.",
      });
      return;
    }
    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user") || "{}");
    console.log(token);
    const url = `/report?startDate=${initialDate}&endDate=${endDate}`;
    const config = {
      headers: { Authorization: `${token}` },
    };
    api
      .get(url, config)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <Button onClick={getReports}>Gerar Relatório</Button>
      </div>
      <div className="h-full w-full">
        <GeneralReport data={data} />
      </div>
    </div>
  );
};

export default ReportsPage;
