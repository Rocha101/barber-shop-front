import { useMonthlyCalendar } from "@zach.codes/react-calendar";
import { addMonths, format, getYear, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const MonthlyNav = () => {
  let { currentMonth, onCurrentMonthChange } = useMonthlyCalendar();

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => onCurrentMonthChange(subMonths(currentMonth, 1))}
        className="cursor-pointer border p-1 rounded-md"
      >
        <AiOutlineArrowLeft />
      </button>
      <div className="mx-1 w-32 text-center">
        {format(
          currentMonth,
          getYear(currentMonth) === getYear(new Date()) ? "LLLL" : "LLLL yyyy",
          { locale: ptBR }
        ).toUpperCase()}
      </div>
      <button
        onClick={() => onCurrentMonthChange(addMonths(currentMonth, 1))}
        className="cursor-pointer border p-1 rounded-md"
      >
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};
