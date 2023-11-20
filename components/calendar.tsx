import React, { useState } from "react";
import {
  addDays,
  addMonths,
  format,
  getDay,
  isSameMonth,
  startOfMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Schedule } from "@/app/admin/schedules/schedule";

const Calendar = ({ events }: { events: Schedule[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfMonthDate = startOfMonth(currentDate);
  const daysInMonth = Array.from({ length: 42 }, (_, index) =>
    addDays(startOfMonthDate, index)
  );

  const weekdayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, -1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  // Filter events to display only those in the current month
  const eventsInCurrentMonth = events.filter((event: any) =>
    isSameMonth(new Date(event.events.start_time), currentDate)
  );

  return (
    <div className="flex min-w-[40rem] flex-col">
      <div className="mb-2 flex items-center justify-end gap-3">
        <Button onClick={goToPreviousMonth}>
          <AiOutlineArrowLeft className="h-4 w-4" />
        </Button>
        <h2>
          {format(currentDate, "MMMM yyyy", { locale: ptBR }).toUpperCase()}
        </h2>
        <Button onClick={goToNextMonth}>
          <AiOutlineArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-flow-row auto-rows-max grid-cols-7 gap-1">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`group relative flex h-40 flex-col rounded border p-2 ${
              !isSameMonth(day, currentDate)
                ? "border-none text-gray-400 dark:text-gray-400"
                : "text-gray-800 dark:text-white"
            } ${
              day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth() &&
              day.getFullYear() === new Date().getFullYear()
                ? "border-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-white"
                : ""
            }`}
          >
            <span className="text-sm">{format(day, "d")}</span>
            <span className="mt-1 text-xs text-gray-600 dark:text-gray-300">
              {weekdayNames[getDay(day)]}
            </span>

            <ScrollArea className=" max-h-full">
              <div className="mt-1 flex flex-col gap-1">
                {eventsInCurrentMonth.map((event: any) => {
                  if (
                    day.getDate() ===
                      new Date(event.events.start_time).getDate() &&
                    day.getMonth() ===
                      new Date(event.events.start_time).getMonth() &&
                    day.getFullYear() ===
                      new Date(event.events.start_time).getFullYear()
                  ) {
                    return (
                      <div
                        key={event.events.id}
                        className={`flex w-full justify-start rounded border p-1 bg-gray-900 text-white `}
                      >
                        <p>{event.events.title}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
