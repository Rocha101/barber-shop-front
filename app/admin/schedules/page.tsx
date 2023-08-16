"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import {
  MonthlyBody,
  MonthlyDay,
  MonthlyCalendar,
  DefaultMonthlyEventItem,
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

  return (
    <div className="flex flex-col uppercase gap-2">
      <Tabs defaultValue="monthly">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="weekly">Semanal</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <div className="border p-3 rounded-md">
            <MonthlyCalendar
              currentMonth={currentMonth}
              onCurrentMonthChange={(date) => setCurrentMonth(date)}
              locale={ptBR}
            >
              <MonthlyNav />
              <MonthlyBody
                events={[
                  {
                    title: "Barba - Cliente: José",
                    date: subHours(new Date(), 2),
                  },
                  {
                    title: "Barba - Cliente: João",
                    date: subHours(new Date(), 1),
                  },
                  { title: "Degradê - Cliente: Bob", date: new Date() },
                ]}
              >
                <MonthlyDay<any>
                  renderDay={(data) =>
                    data.map((item, index) => (
                      <DefaultMonthlyEventItem
                        key={index}
                        title={item.title}
                        // Format the date here to be in the format you prefer
                        date={format(item.date, "k:mm", { locale: ptBR })}
                      />
                    ))
                  }
                />
              </MonthlyBody>
            </MonthlyCalendar>
          </div>
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
