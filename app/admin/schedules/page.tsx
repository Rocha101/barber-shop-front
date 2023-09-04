"use client";

import * as React from "react";

import Calendar from "@/components/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import {
  WeeklyCalendar,
  WeeklyContainer,
  WeeklyDays,
  WeeklyBody,
  DefaultWeeklyEventItem,
} from "@zach.codes/react-calendar";
import { format, startOfMonth, subHours } from "date-fns";
import { MonthlyNav } from "@/components/monthlyNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SchedulesPage = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  const events = [
    {
      title: "Degradê",
      description: "Cliente: Joãozinho",
      date: new Date(),
      start_time: "08:00",
      end_time: "08:00",
      location: "string",
      color: "blue",
    },
  ];

  return (
    <div className="flex flex-col uppercase gap-2">
      <Tabs defaultValue="monthly">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="weekly">Semanal</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <Calendar events={events} />
        </TabsContent>
        <TabsContent value="weekly">
          <div className="border p-3 bg-slate-100 rounded-md">
            <WeeklyCalendar week={new Date()} locale={ptBR}>
              <WeeklyContainer>
                <WeeklyDays />
                <WeeklyBody
                  events={[
                    { title: "Degradê - Cliente: Joãozinho", date: new Date() },
                  ]}
                  renderItem={({ item, showingFullWeek }) => (
                    <DefaultWeeklyEventItem
                      key={item.date.toISOString()}
                      title={item.title}
                      date={
                        showingFullWeek
                          ? format(item.date, "MMM do k:mm")
                          : format(item.date, "k:mm")
                      }
                    />
                  )}
                />
              </WeeklyContainer>
            </WeeklyCalendar>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchedulesPage;
