"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";
import { ReportT } from "./report-type";
import api from "@/utils/api";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

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
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <GeneralReport data={data} />
        </PDFViewer>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    width: "100%",
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
    border: "1px solid #CCCCCC",
    borderRadius: 5,
  },
  topics: {
    fontSize: 14,
    marginVertical: 8,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
});

// Create Document Component
const GeneralReport = ({ data }: { data: ReportT | undefined }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Relatório Barbearia - Vendas</Text>
        <Text style={styles.topics}>
          Total de vendas: {data?.totalSales || "Não informado"}
        </Text>
        <Text style={styles.topics}>
          Faturamento total: {data?.totalMoney || "Não informado"}
        </Text>
        <Text style={styles.topics}>
          Total de clientes: {data?.numberOfCustomers || "Não informado"}
        </Text>
      </View>
    </Page>
  </Document>
);

export default ReportsPage;
