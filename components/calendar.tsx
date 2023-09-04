import React, { useEffect, useState } from "react";
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

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Toggle } from "./ui/toggle";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineClose,
} from "react-icons/ai";
import { BsCalendarPlus } from "react-icons/bs";
import { IoMdSave } from "react-icons/io";

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

  /* const onSubmit = () => {
    const data = {
      title: eventInfo?.title,
      description: eventInfo?.description,
      date: eventInfo?.date,
      start_time: eventInfo?.start_time,
      end_time: eventInfo?.end_time,
      location_id: eventInfo?.location || 1,
      color: selectedColor,
    };
    console.log(data);
    apiBase
      .post("/calendar", data)
      .then((response) => {
        console.log(response.data);
        toast({
          title: "Evento criado com sucesso!",
        });
        setEventDialogOpen(0);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro ao criar evento",
        });
      });
  };

  const onDelete = (id: number) => {
    apiBase
      .post(`/calendar/deactivate`, { id: id })
      .then((response) => {
        console.log(response.data);
        setViewMoreDialogOpen(0);
        toast({
          title: "Evento apagado com sucesso!",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro ao apagar evento",
        });
      });
  };

  const onEdit = (id: number) => {
    const data = {
      title: eventEditInfo.title,
      description: eventEditInfo.description,
      date: eventEditInfo.date,
      start_time: eventEditInfo.start_time,
      end_time: eventEditInfo.end_time,
      color: eventEditInfo.color,
      location_id: eventEditInfo.location.id,
    };
    console.log(data);
    apiBase
      .put(`/calendar/${id}`, data)
      .then((response) => {
        console.log(response.data);
        setViewMoreDialogOpen(0);
        toast({
          title: "Evento editado com sucesso!",
        });
        window.location.reload();
        setEditMode(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro ao editar evento",
        });
      });
  };

  const createLocation = () => {
    if (searchParam === "") {
      toast({
        title: "Insira um nome para o local",
      });
      return;
    }
    const data = { description: searchParam };
    apiBase
      .post("/location", data)
      .then((response) => {
        console.log(response.data);
        apiBase
          .get("/location")
          .then((response) => {
            setLocations(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        setSearchParam("");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro ao criar local",
        });
      });
  };



  useEffect(() => {
    apiBase
      .get("/location")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 */

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
            <Dialog
              open={eventDialogOpen === day.getDate()}
              onOpenChange={() => {
                if (eventDialogOpen === day.getDate()) {
                  setEventDialogOpen(0);
                  handleClear();
                } else {
                  setEventDialogOpen(day.getDate());
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  className={`absolute right-3 top-3 z-10 hidden h-8 w-8 items-center justify-center rounded-md bg-blue-600 
                p-1 text-black transition-all duration-300 delay-150 ease-in-out hover:-translate-y-1 hover:scale-110 group-hover:flex`}
                  onClick={() => {
                    setEventInfo({
                      ...eventInfo,
                      date: new Date(day),
                    });
                    setEventDialogOpen(day.getDate());
                  }}
                >
                  <BsCalendarPlus className="flex h-4 w-4 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-80 p-0">
                <div className="flex w-full flex-col">
                  <div className="flex w-full items-center justify-start gap-4 border-b p-2 pr-10">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          <div
                            // eslint-disable-next-line tailwindcss/classnames-order
                            className={`h-4 w-4 rounded-full bg-${selectedColor}-600`}
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="grid w-48 grid-cols-3">
                        {[
                          "blue",
                          "yellow",
                          "red",
                          "green",
                          "purple",
                          "pink",
                        ].map((color) => (
                          <Toggle
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            pressed={selectedColor === color}
                          >
                            <div
                              // eslint-disable-next-line tailwindcss/classnames-order
                              className={`h-4 w-4 rounded-full bg-${color}-600`}
                            />
                          </Toggle>
                        ))}
                      </PopoverContent>
                    </Popover>
                    <span>Adicionar evento ao dia {day.getDate()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <Input
                      placeholder="Título"
                      className="col-span-2"
                      value={eventInfo?.title}
                      onChange={(e) =>
                        setEventInfo({ ...eventInfo, title: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Descrição"
                      className="col-span-2"
                      value={eventInfo?.description}
                      onChange={(e) =>
                        setEventInfo({
                          ...eventInfo,
                          description: e.target.value,
                        })
                      }
                    />
                    <Select>
                      <SelectTrigger className="col-span-2 w-full">
                        <SelectValue placeholder={eventInfo?.location} />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="mb-2 flex items-start">
                          <Input
                            value={searchParam}
                            onChange={(e) => setSearchParam(e.target.value)}
                            className="h-8 w-full"
                          />
                          <Button
                            className="h-8"
                            variant={"link"}
                            /* onClick={createLocation} */
                          >
                            Criar
                          </Button>
                        </div>
                        {locations.map((location: any) => (
                          <SelectItem key={location.id} value={location.id}>
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

                    <Input
                      placeholder="Horário Inicio"
                      type="time"
                      value={eventInfo?.start_time}
                      onChange={(e) =>
                        setEventInfo({
                          ...eventInfo,
                          start_time: e.target.value,
                        })
                      }
                    />
                    <Input
                      placeholder="Horário Fim"
                      type="time"
                      value={eventInfo?.end_time}
                      onChange={(e) =>
                        setEventInfo({ ...eventInfo, end_time: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex w-full justify-end gap-2 border-t p-2">
                  <Button
                    className="gap-2"
                    variant="outline"
                    /* onClick={onSubmit} */
                  >
                    <AiOutlineClose className="h-4 w-4" />
                    Cancelar
                  </Button>
                  <Button className="gap-2" /* onClick={onSubmit} */>
                    <IoMdSave className="h-4 w-4" />
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

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
                            // eslint-disable-next-line tailwindcss/classnames-order
                            className={`flex w-full justify-start rounded border p-1 bg-${event.color}-600 text-white cursor-pointer`}
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
                              {!editMode ? (
                                <Button
                                  variant={"link"}
                                  className="m-0 p-0"
                                  onClick={() => setEditMode(true)}
                                >
                                  Editar
                                </Button>
                              ) : (
                                <Button
                                  variant={"link"}
                                  className="m-0 p-0"
                                  /* onClick={() => onEdit(event.id)} */
                                >
                                  Salvar
                                </Button>
                              )}

                              <Button
                                variant={"link"}
                                className="m-0 p-0 text-red-600"
                                /* onClick={() => onDelete(event.id)} */
                              >
                                Apagar
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
                            <Label>Cor</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" disabled={!editMode}>
                                  <div
                                    // eslint-disable-next-line tailwindcss/classnames-order
                                    className={`h-4 w-4 rounded-full bg-${eventEditInfo.color}-600`}
                                  />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="grid w-48 grid-cols-3">
                                {[
                                  "blue",
                                  "yellow",
                                  "red",
                                  "green",
                                  "purple",
                                  "pink",
                                ].map((color) => (
                                  <Toggle
                                    onClick={() =>
                                      setEventEditInfo({
                                        ...eventEditInfo,
                                        color: color,
                                      })
                                    }
                                    key={color}
                                  >
                                    <div
                                      className={`h-4 w-4 rounded-full bg-${color}-600`}
                                    />
                                  </Toggle>
                                ))}
                              </PopoverContent>
                            </Popover>
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
