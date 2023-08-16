"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

const SchedulesPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  React.useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <div className="flex">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md"
        locale={ptBR}
      />
      {date?.toLocaleDateString() === new Date().toLocaleDateString() ? (
        <div className="p-3 border w-full flex flex-col">
          <div className="bg-black text-white p-3 rounded-md">
            <h3 className="text-xl font-bold mb-3">Cabelo</h3>
            <p>Cliente: José</p>
          </div>
          <div className="bg-black text-white p-3 rounded-md mt-2">
            <h3 className="text-xl font-bold mb-3">Cabelo + Barba</h3>
            <p>Cliente: João</p>
          </div>
        </div>
      ) : (
        <div className="p-3 border w-full flex flex-col">Outro dia</div>
      )}
    </div>
  );
};

export default SchedulesPage;
