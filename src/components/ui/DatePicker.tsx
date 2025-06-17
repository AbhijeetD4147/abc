import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import Calender from "/calendar-logo.png";
import { getTheme } from "../../utils/ThemeSelection";
import type { ThemeColors } from "../../utils/ThemeSelection";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DatePickerProps {
  selected?: Date;
  onChange?: (date: Date) => void;
  maxDate?: Date;
  error?: boolean;
  className?: string;
  value?: string;
  onChangeRaw?: (value: string) => void;
  onError?: (error: string | null) => void;
  restrictDateSelection?: "before" | "after" | "none";
  minYear?: number;
  maxYear?: number;
  enhancedInput?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  maxDate,
  error,
  className,
  value = "",
  onChangeRaw,
  onError,
  restrictDateSelection = "none",
  minYear,
  maxYear,
  enhancedInput = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(selected ? dayjs(selected) : dayjs());
  const [visibleMonth, setVisibleMonth] = useState(dayjs(selected || new Date()));
  const [isYearView, setIsYearView] = useState(false);
  const [theme, setTheme] = useState<ThemeColors | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getTheme().then(setTheme);
  }, []);

  const startOfMonth = visibleMonth.startOf("month").startOf("week");
  const endOfMonth = visibleMonth.endOf("month").endOf("week");

  const generateCalendar = () => {
    const days = [];
    let date = startOfMonth.clone();
    const end = endOfMonth.clone();

    while (date.isBefore(end) || date.isSame(end, "day")) {
      days.push(date);
      date = date.add(1, "day").clone();
    }
    return days;
  };

  const changeMonth = (direction: "prev" | "next") => {
    setVisibleMonth(direction === "prev" ? visibleMonth.subtract(1, "month") : visibleMonth.add(1, "month"));
  };

  const handleDateClick = (date: dayjs.Dayjs) => {
    const currentDate = dayjs();
    let isSelectable = true;

    if (restrictDateSelection === "before" && date.isBefore(currentDate, "day")) {
      isSelectable = false;
    } else if (restrictDateSelection === "after" && date.isAfter(currentDate, "day")) {
      isSelectable = false;
    }

    if (isSelectable) {
      setSelectedDate(date);
      onChange?.(date.toDate());
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (enhancedInput) {
      const numbersOnly = inputValue.replace(/\D/g, "");

      let formattedDate = "";
      for (let i = 0; i < numbersOnly.length && i < 8; i++) {
        if (i === 2 || i === 4) formattedDate += "/";
        formattedDate += numbersOnly[i];
      }
      inputValue = formattedDate;
      onChangeRaw?.(formattedDate);

      if (numbersOnly.length === 8) {
        const mm = parseInt(numbersOnly.substring(0, 2));
        const dd = parseInt(numbersOnly.substring(2, 4));
        const yyyy = parseInt(numbersOnly.substring(4, 8));
        const now = new Date().getFullYear();
        const min = minYear ?? now - 150;
        const max = maxYear ?? now;

        let errorMessage = null;
        if (mm < 1 || mm > 12) errorMessage = "Invalid month";
        else if (dd < 1 || dd > 31) errorMessage = "Invalid day";
        else if (yyyy < min || yyyy > max) errorMessage = `Invalid year. Allowed: ${min} - ${max}`;

        onError?.(errorMessage);
      } else {
        onError?.(null);
      }
    } else {
      onChangeRaw?.(inputValue);
    }
  };

  const handleYearSelect = (year: number) => {
    const updated = visibleMonth.year(year);
    setVisibleMonth(updated);
    setIsYearView(false);
  };

  const renderCalendarBody = () => {
    if (isYearView) {
      const currentYear = dayjs().year();
      return (
        <div ref={yearRef} className="grid grid-cols-4 gap-3 p-2 overflow-y-auto" style={{ maxHeight: "12rem" }}>
          {Array.from({ length: 100 }, (_, i) => currentYear - i).map((year) => (
            <button key={year} className="p-2 rounded hover:bg-white text-sm" onClick={() => handleYearSelect(year)}>
              {year}
            </button>
          ))}
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-7 text-center text-xs text-black mb-2">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center gap-y-1">
          {generateCalendar().map((date) => {
            const isCurrentMonth = date.month() === visibleMonth.month();
            const isSelected = date.isSame(selectedDate, "day");
            const isDisabled = maxDate ? date.isAfter(maxDate) : false;

            return (
              <button
                key={date.toString()}
                disabled={isDisabled}
                className={cn(
                  "py-1 rounded-full text-sm",
                  isSelected && "bg-blue-500 text-white",
                  !isSelected && isCurrentMonth && "text-black",
                  !isSelected && !isCurrentMonth && "text-gray-400",
                  isDisabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handleDateClick(date)}
              >
                {date.date()}
              </button>
            );
          })}
        </div>
      </>
    );
  };

  if (!theme) return null;

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          onKeyDown={(e) => {
            if (!enhancedInput) return;
            const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];
            if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
              e.preventDefault();
            }
          }}
          style={{
            backgroundColor: theme.textfieldFilledColor ?? "#fff",
            borderColor: theme.textfieldDefaultBorderColor ?? "#ccc",
          }}
          className={cn(
            "flex h-10 w-full rounded-md border px-3 py-2 pr-9 text-base focus-visible:ring-2",
            error && "border-red-500",
            className
          )}
          value={value}
          onChange={handleInputChange}
          placeholder="MM/DD/YYYY"
        />
        <img
          src={Calender}
          alt="calendar"
          className="absolute right-2 w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity opacity-30"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Popup */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl">
                <div className="flex max-w-md overflow-hidden border-none rounded-2xl">
                  <div className="bg-white text-white w-40 flex flex-col items-center pt-8 p-4 border-2 border-left-black-800">
                    <span className="text-xs uppercase tracking-widest" style={{ color: theme.primaryTextColor }}>
                      Select Date
                    </span>
                    <span className="mt-4 text-2xl font-semibold" style={{ color: theme.primaryTextColor }}>
                      {selectedDate.format("ddd, MMM D")}
                    </span>
                  </div>

                  <div className="bg-white w-full p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium cursor-pointer" onClick={() => setIsYearView(!isYearView)}>
                        {visibleMonth.format("MMMM YYYY")}
                      </span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeMonth("prev")}>
                          <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => changeMonth("next")}>
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </div>

                    {renderCalendarBody()}

                    <div className="flex justify-end gap-4 mt-4 text-sm font-medium text-black">
                      <button onClick={() => setIsOpen(false)} className="hover:underline-black">
                        Cancel
                      </button>
                      <button onClick={() => setIsOpen(false)} className="hover:underline">
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
