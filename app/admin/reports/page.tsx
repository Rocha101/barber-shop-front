"use client";
import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import GeneralReport from "./report";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ReportsPage = () => {
  return (
    <div className="h-screen w-full flex flex-col gap-3">
      <h1 className="text-xl font-bold">Relatórios</h1>
      <div className="flex gap-2 items-end">
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Data Inicio</Label>
          <Input type="date" className="w-64" />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Data Fim</Label>
          <Input type="date" className="w-64" />
        </div>
        <Button>Gerar Relatório</Button>
      </div>
      <div className="h-full w-full">
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <GeneralReport />
        </PDFViewer>
      </div>
    </div>
  );
};

export default ReportsPage;
