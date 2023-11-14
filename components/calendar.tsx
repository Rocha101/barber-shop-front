import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Close } from "@radix-ui/react-dialog";
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
import { Label } from "./ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineClose,
} from "react-icons/ai";

type Local = {
  id: number;
  name: string;
}[];

type EventInfo = {
  title: string;
  description: string;
  date: Date;
  start_time: string;
  end_time: string;
  location: string;
  color: string;
};

type EventEditInfo = {
  title: string;
  description: string;
  date: Date;
  start_time: string;
  end_time: string;
  location: { id: number; description: string };
  color: string;
};

const Calendar = ({ events, dayChildren }: any) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState("blue");
  const [eventInfo, setEventInfo] = useState<EventInfo>({
    title: "",
    description: "",
    date: new Date(),
    start_time: "",
    end_time: "",
    location: "",
    color: "",
  });

  const [eventEditInfo, setEventEditInfo] = useState<EventEditInfo>({
    title: "",
    description: "",
    date: new Date(),
    start_time: "",
    end_time: "",
    location: { id: 1, description: "" },
    color: "",
  });
  const [eventDialogOpen, setEventDialogOpen] = useState(0);
  const [viewMoreDialogOpen, setViewMoreDialogOpen] = useState(0);
  const [locations, setLocations] = useState<Local>([]);
  const [searchParam, setSearchParam] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfMonthDate = startOfMonth(currentDate);
  const [editMode, setEditMode] = useState(false);
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
    isSameMonth(new Date(event.date), currentDate)
  );

  const handleClear = () => {
    setEventInfo({
      title: "",
      description: "",
      date: new Date(),
      start_time: "",
      end_time: "",
      location: "",
      color: "",
    });
  };
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
                    day.getDate() === new Date(event.date).getDate() &&
                    day.getMonth() === new Date(event.date).getMonth() &&
                    day.getFullYear() === new Date(event.date).getFullYear()
                  ) {
                    console.log(event);
                    return (
                      <Dialog
                        key={event.id}
                        open={viewMoreDialogOpen === event.id}
                        onOpenChange={() => {
                          if (viewMoreDialogOpen === event.id) {
                            setViewMoreDialogOpen(0);
                          } else {
                            setViewMoreDialogOpen(event.id);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <div
                            key={event.id}
                            className={`flex w-full justify-start rounded border p-1 bg-gray-900 text-white cursor-pointer`}
                            onClick={() => {
                              setViewMoreDialogOpen(event.id);
                              setEventEditInfo(event);
                            }}
                          >
                            <p>{event.title}</p>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="w-80 p-0">
                          <div className="flex w-full items-center justify-between border-b p-3 py-0.5">
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                            <div className="flex items-center justify-center gap-3">
                              <Button
                                variant={"link"}
                                className="m-0 p-0 text-red-600"
                                /* onClick={() => onDelete(event.id)} */
                              >
                                Cancelar
                              </Button>
                              <Close>
                                <AiOutlineClose className="h-4 w-4" />
                              </Close>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 px-3 pb-3">
                            <Label>Título</Label>
                            <Input
                              placeholder="Título"
                              value={eventEditInfo.title}
                              onChange={(e) =>
                                setEventEditInfo({
                                  ...eventEditInfo,
                                  title: e.target.value,
                                })
                              }
                              disabled={!editMode}
                            />
                            <Label>Detalhes</Label>
                            <Input
                              placeholder="Detalhes"
                              value={eventEditInfo.description}
                              disabled={!editMode}
                              onChange={(e) =>
                                setEventEditInfo({
                                  ...eventEditInfo,
                                  description: e.target.value,
                                })
                              }
                            />
                            <Label>Horário</Label>
                            <div className="flex flex-col items-center md:flex-row">
                              <Input
                                value={eventEditInfo.start_time}
                                disabled={!editMode}
                                type="time"
                                onChange={(e) =>
                                  setEventEditInfo({
                                    ...eventEditInfo,
                                    start_time: e.target.value,
                                  })
                                }
                              />
                              <span className="mx-4">até</span>
                              <Input
                                value={eventEditInfo.end_time}
                                disabled={!editMode}
                                type="time"
                                onChange={(e) =>
                                  setEventEditInfo({
                                    ...eventEditInfo,
                                    end_time: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <Label>Local</Label>
                            <Select disabled={!editMode}>
                              <SelectTrigger className="col-span-2 w-full">
                                <SelectValue
                                  placeholder={
                                    eventEditInfo?.location.description
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {locations.map((location: any) => (
                                  <SelectItem
                                    key={location.id}
                                    value={location.id}
                                  >
                                    {location.description}
                                  </SelectItem>
                                ))}
                                {locations.length === 0 && (
                                  <div className="flex w-full items-center justify-center py-3 underline">
                                    Nenhuma localidade encontrada
                                  </div>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </DialogContent>
                      </Dialog>
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
