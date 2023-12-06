"use client";

import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { useHookFormMask } from "use-mask-input";
import { toast } from "@/components/ui/use-toast";
import { Service } from "../admin/services/service";
import { UserT } from "@/app/admin/users/user";
import { LocationT } from "../admin/locations/locations";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import api from "@/utils/api";

dayjs.extend(customParseFormat);

const formSchema = z.object({
  username: z
    .string({
      required_error: "Nome obrigatório",
    })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  email: z
    .string({
      required_error: "Email obrigatório",
    })
    .email({ message: "Email inválido" }),
  phone: z
    .string({
      required_error: "Telefone obrigatório",
    })
    .min(10, { message: "Telefone deve ter no mínimo 10 caracteres" })
    .max(15, { message: "Telefone deve ter no máximo 15 caracteres" }),
  serviceId: z.string({
    required_error: "Empresa obrigatória",
  }),
  userId: z.string({
    required_error: "Profissional obrigatória",
  }),
  locationId: z.string({
    required_error: "Filial obrigatória",
  }),
});

const CustomerSchedulePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      phone: "",
    },
  });

  const registerWithMask = useHookFormMask(form.register);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<any>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();
  const [services, setServices] = useState<Service[]>([]);
  const [locations, setLocations] = useState<LocationT[]>([]);
  const [barbers, setBarbers] = useState<UserT[]>([]);

  // const freeTimes = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30"];

  const freeTimes = () => {
    const selectedBarberEvents = selectedBarber?.events || [];
    const selectedBarberStartTime = selectedBarber?.start_time;
    const selectedBarberEndTime = selectedBarber?.end_time;

    if (
      !selectedBarberStartTime ||
      !selectedBarberEndTime ||
      !serviceDuration
    ) {
      return [];
    }

    const [startHour, startMinute] = selectedBarberStartTime
      .split(":")
      .map(Number);
    const [endHour, endMinute] = selectedBarberEndTime.split(":").map(Number);

    const occupiedTimes = new Set();

    selectedBarberEvents.forEach((event) => {
      const [eventStartHour, eventStartMinute] = event.start_time
        .split(":")
        .map(Number);
      const [eventEndHour, eventEndMinute] = event.end_time
        .split(":")
        .map(Number);

      for (let h = eventStartHour; h < eventEndHour; h++) {
        for (let m = 0; m < 60; m++) {
          if (
            (h === eventStartHour && m >= eventStartMinute) ||
            (h === eventEndHour && m <= eventEndMinute)
          ) {
            occupiedTimes.add(`${h}:${m.toString().padStart(2, "0")}`);
          }
        }
      }
    });

    const availableTimes = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (
        let minute = 0;
        minute < 60;
        minute += Number(serviceDuration.split(":")[1])
      ) {
        const time = `${hour}:${minute.toString().padStart(2, "0")}`;
        if (!occupiedTimes.has(time)) {
          availableTimes.push(time);
        }
      }
    }

    return availableTimes;
  };

  const ProgressPercentage = step * 33.33;

  const watchuserId = form.watch("userId");
  const watchAll = form.watch();

  const selectedBarberName = barbers.find(
    (barber: any) => barber.id === +watchAll.userId
  )?.username;

  const selectedServiceName = services.find(
    (service) => service.id === +watchAll.serviceId
  )?.description;

  const selectedLocationName = locations.find(
    (location) => location?.id === +watchAll.serviceId
  )?.description;

  const selectedBarber = barbers.find(
    (barber: any) => barber.id === +watchAll.userId
  );

  const serviceDuration = services.find(
    (service) => service.id === +watchAll.serviceId
  )?.total_time;

  const handleNextStep = async () => {
    const isFirstStepValid = await form.trigger(["username", "email", "phone"]);
    const isSecondStepValid = await form.trigger([
      "locationId",
      "serviceId",
      "userId",
    ]);
    /*  const isThirdStepValid = await form.trigger(["date", "time"]); */
    const isThirdStepValid = selectedTime !== undefined && date !== undefined;

    if (!isFirstStepValid && step === 0) {
      toast({
        title: "Erro ao avançar",
        description: "Verifique todos os campos",
      });
      return;
    }

    if (!isSecondStepValid && step === 1) {
      toast({
        title: "Erro ao avançar",
        description: "Verifique todos os campos",
      });
      return;
    }

    if (!isThirdStepValid && step === 2) {
      toast({
        title: "Erro ao avançar",
        description: "Verifique todos os campos",
      });
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSelectTime = (item: string) => {
    setSelectedTime(item);
  };

  const onSubmit = () => {
    const url = `/schedule`;

    const selectedStartTime = selectedTime;

    if (!selectedStartTime) return;
    if (!serviceDuration) return;

    const [hours, minutes] = selectedStartTime.split(":").map(Number);
    const [serviceHours, serviceMinutes] = serviceDuration
      .split(":")
      .map(Number);

    const startDateTime = new Date(date);
    startDateTime.setHours(hours, minutes, 0);

    const endDateTime = new Date(date);
    endDateTime.setHours(hours + serviceHours, minutes + serviceMinutes, 0);

    const data = {
      ...form.getValues(),
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
    };
    console.log(data);
    api
      .post(url, data)
      .then((res) => {
        console.log(res);
        toast({
          title: "Agendado com sucesso!",
        });
        form.reset();
        setSelectedTime("");
        setStep(0);
        setDate(new Date());
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Não foi possível agendar!",
        });
      });
  };

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        console.log(res.data);
        setBarbers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .get("/location/list/barber/" + watchuserId)
      .then((res) => {
        console.log(res.data);
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [form.watch, watchuserId]);

  useEffect(() => {
    api
      .get("/service/list/barber/" + watchuserId)
      .then((res) => {
        console.log(res.data);
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [form.watch, watchuserId]);

  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <div className="flex items-center justify-between gap-3 w-full h-16 border px-3 bg-white">
        <div className="flex gap-3 items-center">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
          <h2 className="text-lg font-bold hidden md:block">
            Barber Shop Manager
          </h2>
        </div>
        <Link href={"/"} passHref>
          <Button variant="link">Sou Barbeiro</Button>
        </Link>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center px-2 md:px-0">
        <div className="p-4 border rounded w-full md:min-w-[500px] md:max-w-[300px] md:min-h-[400px] flex flex-col justify-between">
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
              <Form {...form}>
                <form
                  className="flex flex-col gap-4 w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {step === 0 && (
                    <>
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel>E-mail</FormLabel>
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
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Barbeiro</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {barbers.length > 0 ? (
                                  barbers.map((barber: any) => (
                                    <SelectItem
                                      key={barber.id}
                                      value={`${barber.id}`}
                                    >
                                      {barber.username}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem disabled value="0">
                                    Não há barbeiros disponíveis
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="locationId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Filial</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {locations.length > 0 ? (
                                  locations.map((location: any) => (
                                    <SelectItem
                                      key={location.id}
                                      value={`${location.id}`}
                                    >
                                      {location.description}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem disabled value="0">
                                    Não há filiais disponíveis
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="serviceId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Serviço</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {services.length > 0 ? (
                                  services.map((service: Service) => (
                                    <SelectItem
                                      key={service.id}
                                      value={`${service.id}`}
                                    >
                                      {service.description}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem disabled value="0">
                                    Não há serviços disponíveis
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="flex border mb-3 rounded">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className=""
                          locale={ptBR}
                        />
                        <div className="h-full grid grid-cols-3 gap-3 p-4 items-start">
                          {freeTimes().map((time) => (
                            <Button
                              key={time}
                              className="text-xs"
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSelectTime(time);
                              }}
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
                              {selectedServiceName}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableHead>Local</TableHead>
                            <TableCell className="font-medium">
                              {selectedLocationName}
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
                              {selectedBarberName}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>
          <div
            className={`flex mt-4 ${
              step > 0 ? "justify-between" : "justify-end"
            }`}
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
