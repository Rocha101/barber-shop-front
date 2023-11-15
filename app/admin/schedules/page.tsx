"use client";

import { useEffect, useState } from "react";

import Calendar from "@/components/calendar";
import { startOfMonth } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns } from "./columns";
import { BiCalendar, BiTable } from "react-icons/bi";
import Cookies from "js-cookie";
import { Schedule } from "./schedule";
import api from "@/utils/api";

const SchedulesPage = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  const [filterValue, setFilterValue] = useState<string>("all");

  const [events, setEvents] = useState<Schedule[]>([]);

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
    const url = `/schedule`;
    api
      .get(url)
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const eventsOnSchedule = events.map((event) => {
    return {
      ...event.events,
    };
  });

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
          <Calendar events={eventsOnSchedule} />
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
          <DataTable data={eventsOnSchedule} columns={columns} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchedulesPage;
