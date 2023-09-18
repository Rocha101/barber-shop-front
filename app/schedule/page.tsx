"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

const CustomerSchedulePage = () => {
  const [generalInfo, setGeneralInfo] = useState({
    name: "",
    email: "",
    phone: "",
    labor: "",
    barber: "",
    service: "",
    location: "",
  });
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();
  const freeTimes = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"];

  const ProgressPercentage = step * 33.33;

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSelectTime = (item: string) => {
    setSelectedTime(item);
  };

  const onSubmit = () => {
    const data = {
      ...generalInfo,
      date,
      time: selectedTime,
    };
    console.log(data);
  };

  return (
    <div className="relative p-4">
      <div className="absolute left-0 top-0 flex items-center justify-between gap-3 w-full h-16 border px-3 bg-white">
        <div className="flex gap-3 items-center">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
          <h2 className="text-lg font-bold">Barber Shop Manager</h2>
        </div>
        <Link href={"/"} passHref>
          <Button variant="link">Sou Barbeiro</Button>
        </Link>
      </div>
      <div className="h-screen flex items-center justify-center">
        <div className="p-4 border rounded min-w-[500px] min-h-[400px] flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-col items-start">
                    <p className="text-xs">{step}/3</p>
                    <Progress value={ProgressPercentage} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {step === 0
                      ? "Dados do cliente"
                      : step === 1
                      ? "Dados do serviço"
                      : "Dados do agendamento"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <h1 className="font-bold">Agendamento</h1>
            <div className="flex flex-col gap-3">
              {step === 0 && (
                <>
                  <Label>Nome do cliente</Label>
                  <Input
                    placeholder="Nome do cliente"
                    value={generalInfo.name}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, name: e.target.value })
                    }
                  />
                  <Label>E-mail do cliente</Label>
                  <Input
                    placeholder="E-mail do cliente"
                    value={generalInfo.email}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, email: e.target.value })
                    }
                  />
                  <Label>Telefone do cliente</Label>
                  <Input
                    placeholder="Telefone do cliente"
                    value={generalInfo.phone}
                    onChange={(e) =>
                      setGeneralInfo({ ...generalInfo, phone: e.target.value })
                    }
                  />
                </>
              )}
              {step === 1 && (
                <>
                  <Label>Serviço</Label>
                  <Input
                    placeholder="Serviço"
                    value={generalInfo.service}
                    onChange={(e) =>
                      setGeneralInfo({
                        ...generalInfo,
                        service: e.target.value,
                      })
                    }
                  />
                  <Label>Profissional</Label>
                  <Input
                    placeholder="Nome do barbeiro"
                    value={generalInfo.barber}
                    onChange={(e) =>
                      setGeneralInfo({
                        ...generalInfo,
                        barber: e.target.value,
                      })
                    }
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <Label>Local</Label>
                  <Input
                    placeholder="Local"
                    value={generalInfo.location}
                    onChange={(e) =>
                      setGeneralInfo({
                        ...generalInfo,
                        location: e.target.value,
                      })
                    }
                  />
                  <Label>Data</Label>
                  <div className="flex border mb-3 rounded">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className=""
                      locale={ptBR}
                    />
                    <div className="h-full grid grid-cols-3 gap-3 p-4 items-start">
                      {freeTimes.map((time) => (
                        <Button
                          key={time}
                          className="text-xs"
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          onClick={() => handleSelectTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableHead className="w-[100px]">Serviço</TableHead>
                        <TableCell className="font-medium">
                          {generalInfo.service}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Local</TableHead>
                        <TableCell className="font-medium">
                          {generalInfo.location}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableCell className="font-medium">
                          {date?.toLocaleDateString("pt-BR")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Hora</TableHead>
                        <TableCell className="font-medium">
                          {selectedTime}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Profissional</TableHead>
                        <TableCell className="font-medium">
                          {generalInfo.barber}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
          <div
            className={`flex ${step > 0 ? "justify-between" : "justify-end"}`}
          >
            {step > 0 && (
              <Button variant="outline" onClick={handlePreviousStep}>
                Anterior
              </Button>
            )}
            {step === 3 ? (
              <Button onClick={onSubmit}>Salvar</Button>
            ) : (
              <Button onClick={handleNextStep}>Próximo</Button>
            )}
          </div>
        </div>
      </div>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={"#whatsapp"}
              className="fixed right-0 bottom-0 m-4 p-4 border rounded-full hover:bg-green-400"
            >
              <BsWhatsapp className="h-8 w-8" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Entre em contato via Whatsapp</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CustomerSchedulePage;
