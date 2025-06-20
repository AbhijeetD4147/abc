import React, { useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isWithinInterval,
  isBefore,
  startOfDay,
} from "date-fns";

interface CalendarDateRangePickerProps {
  onChange: (range: { start: Date; end: Date }) => void;
  value: { start: Date; end: Date };
  restrictPastDates?: boolean;
  maxRangeInDays?: number; 
}

const CalendarDateRangePicker: React.FC<CalendarDateRangePickerProps> = ({ 
  onChange, 
  value,
  restrictPastDates = false,
  maxRangeInDays = 6
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(value.start);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(value.end);
  const [isRestrictPastDates, setIsRestrictPastDates] = useState(restrictPastDates);

  useEffect(() => {
    setSelectedStartDate(value.start);
    setSelectedEndDate(value.end);
  }, [value]);

  const isDateSelectable = (day: Date) => {
    if (!isRestrictPastDates) return true;
    const today = startOfDay(new Date());
    return !isBefore(day, today);
  };

  const isValidRange = (start: Date, end: Date) => {
    const diffInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= maxRangeInDays;
  };

  const handleDayClick = (day: Date) => {
    if (!isDateSelectable(day)) return;

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day);
      setSelectedEndDate(null);
    } else {
      if (isBefore(day, selectedStartDate)) {
        setSelectedStartDate(day);
        setSelectedEndDate(selectedStartDate);
      } else {
        // Check if the new range is within the allowed limit
        if (isValidRange(selectedStartDate, day)) {
          setSelectedEndDate(day);
          onChange({ start: selectedStartDate, end: day });
        } else {
          // If range is too long, set the end date to maximum allowed range
          const maxEndDate = addDays(selectedStartDate, maxRangeInDays);
          setSelectedEndDate(maxEndDate);
          onChange({ start: selectedStartDate, end: maxEndDate });
        }
      }
    }
  };

  const isInRange = (day: Date) => {
    if (selectedStartDate && selectedEndDate) {
      return isWithinInterval(day, { start: selectedStartDate, end: selectedEndDate });
    }
    return false;
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center px-2 sm:px-5 py-2 sm:py-4 bg-blue-500 text-white rounded-t-md">
      <button className="bg-blue-500 text-white text-xl sm:text-3xl px-2 sm:px-4 py-1 sm:py-2 hover:bg-blue-600" 
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</button>
      <div className="text-base sm:text-xl font-medium mx-2 sm:mx-4">{format(currentMonth, "MMMM yyyy")}</div>
      <button className="bg-blue-500 text-white text-xl sm:text-2xl px-2 sm:px-4 py-1 sm:py-2 hover:bg-blue-600" 
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const date = new Date();
    const startDate = startOfWeek(date, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold text-gray-700 text-sm sm:text-lg py-1 sm:py-2">
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }

    return <div className="grid grid-cols-7 px-2 sm:px-4 py-1 sm:py-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDateGrid = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDateGrid = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDateGrid;
    let formattedDate = "";

    while (day <= endDateGrid) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const isSelected = selectedStartDate && isSameDay(day, selectedStartDate) || 
                       selectedEndDate && isSameDay(day, selectedEndDate);
        const isOutsideMonth = !isSameMonth(day, monthStart);
        const inRange = isInRange(day);
        const selectable = isDateSelectable(day);
        const isStartDate = selectedStartDate && isSameDay(day, selectedStartDate);
        const isEndDate = selectedEndDate && isSameDay(day, selectedEndDate);

        days.push(
          <div
            key={day.toString()}
            className={`relative flex items-center justify-center h-8 sm:h-10 w-8 sm:w-10 p-4 sm:p-7 px-6 sm:px-8 text-sm sm:text-md
              ${isOutsideMonth ? "text-gray-400" : selectable ? "text-gray-900" : "text-gray-300"}
              ${selectable ? "cursor-pointer hover:bg-blue-50" : "cursor-not-allowed"}
            `}
            onClick={() => handleDayClick(cloneDay)}
          >
            <div
              className={`
                absolute inset-0 flex items-center justify-center text-xs sm:text-base
                ${isSelected || inRange ? "bg-blue-100" : ""}
                ${isStartDate ? "rounded-l-full bg-blue-500" : ""}
                ${isEndDate ? "rounded-r-full bg-blue-500" : ""}
                ${isSelected ? "text-white" : ""}
              `}
            >
              {formattedDate}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-0">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="p-1 sm:p-2 px-2 sm:px-3">{rows}</div>;
  };

  return (
    <div className="w-full max-w-md border rounded-md shadow-lg bg-white border-2 border-blue m-1 sm:m-2">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default CalendarDateRangePicker;
