import React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatForSql(date: Date | undefined): string {
  if (!date) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime());
}

type Props = {
  onStartChange?: (date: string) => void;
  onEndChange?: (date: string) => void;
};

export default function DatePickerComponent({ onStartChange, onEndChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<Date | undefined>(selectedDate);
  const [value, setValue] = React.useState(formatDate(selectedDate));

  const [openTill, setOpenTill] = React.useState(false);
  const [selectedDateTill, setSelectedDateTill] = React.useState<Date | undefined>(new Date());
  const [monthTill, setMonthTill] = React.useState<Date | undefined>(selectedDateTill);
  const [valueTill, setValueTill] = React.useState(formatDate(selectedDateTill));

  return (
    <div className="flex gap-6">
      {/* From Date */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="date-from" className="mb-1">From</Label>
        <div className="relative flex gap-2">
          <Input
            id="date-from"
            value={value}
            placeholder="From"
            className="bg-background pr-10"
            onChange={(e) => {
              const inputDate = new Date(e.target.value);
              setValue(e.target.value);
              if (isValidDate(inputDate)) {
                setSelectedDate(inputDate);
                setMonth(inputDate);
                onStartChange?.(formatForSql(inputDate));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker-from"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
              <Calendar
                mode="single"
                selected={selectedDate}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setValue(formatDate(date));
                  setOpen(false);
                  if (date) onStartChange?.(formatForSql(date));
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Till Date */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="date-till" className="mb-1">Till</Label>
        <div className="relative flex gap-2">
          <Input
            id="date-till"
            value={valueTill}
            placeholder="Till"
            className="bg-background pr-10"
            onChange={(e) => {
              const inputDate = new Date(e.target.value);
              setValueTill(e.target.value);
              if (isValidDate(inputDate)) {
                setSelectedDateTill(inputDate);
                setMonthTill(inputDate);
                onEndChange?.(formatForSql(inputDate));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpenTill(true);
              }
            }}
          />
          <Popover open={openTill} onOpenChange={setOpenTill}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker-till"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
              <Calendar
                mode="single"
                selected={selectedDateTill}
                captionLayout="dropdown"
                month={monthTill}
                onMonthChange={setMonthTill}
                onSelect={(date) => {
                  setSelectedDateTill(date);
                  setValueTill(formatDate(date));
                  setOpenTill(false);
                  if (date) onEndChange?.(formatForSql(date));
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
