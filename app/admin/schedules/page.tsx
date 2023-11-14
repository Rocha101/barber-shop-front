"use client";

import react, { useEffect, useState } from "react";

import Calendar from "@/components/calendar";
import { startOfMonth } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns } from "./columns";
import { BiCalendar, BiTable } from "react-icons/bi";
import Cookies from "js-cookie";
import axios from "axios";

const SchedulesPage = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  const [filterValue, setFilterValue] = useState<string>("all");

  const [events, setEvents] = useState<any[]>([]);

  /*  const events: Schedule[] = [
    {
      title: "Degradê",
      description: "Cliente: Joãozinho",
      date: new Date(),
      start_time: "08:00",
      end_time: "08:30",
      location: "Pinheirinho",
      color: "blue",
    },
    {
      title: "Degradê",
      description: "Cliente: Joãozinho",
      date: new Date(),
      start_time: "09:00",
      end_time: "08:30",
      location: "Próspera",
      color: "blue",
    },
    {
      title: "Degradê",
      description: "Cliente: Joãozinho",
      date: new Date(),
      start_time: "18:00",
      end_time: "18:45",
      location: "Centro",
      color: "blue",
    },
    {
      title: "Degradê",
      description: "Cliente: Joãozinho",
      date: new Date("2023-01-10"),
      start_time: "18:00",
      end_time: "18:45",
      location: "Centro",
      color: "blue",
    },
  ]; */

  const filteredEvents = events.filter((event) => {
    const date = new Date(event.events.end_time);

    switch (filterValue) {
      case "today":
        return (
          date.getDate() === new Date().getDate() &&
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear()
        );

      case "week":
        return (
          date.getDate() >= new Date().getDate() &&
          date.getDate() <= new Date().getDate() + 7 &&
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear()
        );

      case "month":
        return (
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear()
        );

      default:
        return true;
    }
  });

  useEffect(() => {
    const token = Cookies.get("token");
    const user = JSON.parse(Cookies.get("user") || "{}");
    console.log(token);
    const url = `http://localhost:8080/api/schedule`;
    const config = {
      headers: { Authorization: `${token}` },
    };
    axios
      .get(url, config)
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Tabs defaultValue="table">
        <TabsList className="grid w-[300px] grid-cols-2">
          <TabsTrigger value="table" className="flex gap-1">
            <BiTable className="inline-block" />
            Tabela
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex gap-1">
            <BiCalendar className="inline-block" />
            Calendário
          </TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <Calendar events={events} />
        </TabsContent>
        <TabsContent value="table">
          <div className="flex justify-end items-center">
            <Select value={filterValue} onValueChange={setFilterValue}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Tudo</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Essa semana</SelectItem>
                  <SelectItem value="month">Esse mês</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DataTable data={filteredEvents} columns={columns} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchedulesPage;
