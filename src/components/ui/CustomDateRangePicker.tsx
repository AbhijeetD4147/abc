import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@ketan_nimase/ui';

interface CustomDateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
}

export const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({ startDate, endDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [nextMonth, setNextMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1));
  const [isMobile, setIsMobile] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const presetOptions = [
    { label: 'Today', getValue: () => ({ start: new Date(), end: new Date() }) },
    {
      label: 'Yesterday', getValue: () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return { start: yesterday, end: yesterday };
      }
    },
    {
      label: 'Last 7 days', getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 6);
        return { start, end };
      }
    },
    {
      label: 'Last 30 days', getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 29);
        return { start, end };
      }
    },
    {
      label: 'This Month', getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { start, end };
      }
    },
    {
      label: 'Last Month', getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return { start, end };
      }
    },
    {
      label: 'This Year', getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear(), 11, 31);
        return { start, end };
      }
    }
  ];

  const formatDateRange = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 'Select date range';
    const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const handlePresetClick = (preset: typeof presetOptions[0]) => {
    const { start, end } = preset.getValue();
    setTempStartDate(start);
    setTempEndDate(end);
  };

  const handleConfirm = () => {
    onDateChange(tempStartDate, tempEndDate);
    setIsOpen(false);
    setShowPresets(true);
  };

  const handleCancel = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setIsOpen(false);
    setShowPresets(true);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newMonth);
    setNextMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1));
  };

  const renderCalendar = (date: Date, isNext = false) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'}`}></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isSelected = (tempStartDate && currentDate.toDateString() === tempStartDate.toDateString()) ||
        (tempEndDate && currentDate.toDateString() === tempEndDate.toDateString());
      const isInRange = tempStartDate && tempEndDate && currentDate >= tempStartDate && currentDate <= tempEndDate;
      const isToday = currentDate.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          onClick={() => {
            if (!tempStartDate || (tempStartDate && tempEndDate)) {
              setTempStartDate(currentDate);
              setTempEndDate(null);
            } else {
              if (currentDate >= tempStartDate) {
                setTempEndDate(currentDate);
              } else {
                setTempEndDate(tempStartDate);
                setTempStartDate(currentDate);
              }
            }
          }}
          className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'} flex items-center justify-center text-sm cursor-pointer rounded ${
            isSelected
              ? 'bg-blue-500 text-white'
              : isInRange
                ? 'bg-blue-100 text-blue-600'
                : isToday
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      );
    }

    return (
      <div className={`${isMobile ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center justify-between mb-4">
          {(!isNext || isMobile) && (
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Icon name="chevron_left" width="16px" height="16px" stroke />
            </button>
          )}
          <h3 className={`font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>{monthNames[month]} {year}</h3>
          {(isNext || isMobile) && (
            <button
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Icon name="chevron_right" width="16px" height="16px" stroke />
            </button>
          )}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className={`${isMobile ? 'w-10 h-8' : 'w-8 h-6'} flex items-center justify-center text-xs font-medium text-gray-500`}>
              {isMobile ? day.slice(0, 1) : day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  // Mobile Preset View
  const MobilePresetView = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-gray-800 text-lg">Quick Select</h4>
        <button
          onClick={() => setShowPresets(false)}
          className="text-blue-500 text-sm font-medium"
        >
          Custom
        </button>
      </div>
      <div className="space-y-2">
        {presetOptions.map((preset) => (
          <button
            key={preset.label}
            onClick={() => {
              handlePresetClick(preset);
              handleConfirm();
            }}
            className="w-full text-left p-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );

  // Mobile Calendar View
  const MobileCalendarView = () => (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={() => setShowPresets(true)}
          className="text-blue-500 text-sm font-medium"
        >
          Presets
        </button>
        <h4 className="font-medium text-gray-800 text-lg">Select Dates</h4>
        <button
          onClick={handleCancel}
          className="text-gray-500 text-sm"
        >
          Cancel
        </button>
      </div>
      
      {renderCalendar(currentMonth)}
      
      <div className="p-4 border-t border-gray-200">
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">Selected Range:</div>
          <div className="text-sm font-medium text-gray-800">
            {formatDateRange(tempStartDate, tempEndDate)}
          </div>
        </div>
        <button
          onClick={handleConfirm}
          disabled={!tempStartDate || !tempEndDate}
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      </div>
    </div>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowPresets(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className="text-sm text-gray-700">{formatDateRange(startDate, endDate)}</span>
        <Icon name="calendar" width="16px" height="16px" stroke colorVariant="secondary" />
      </div>

      {isOpen && (
        <>
          {isMobile ? (
            // Mobile Full Screen Overlay
            <div className="fixed inset-0 bg-white z-50">
              {showPresets ? <MobilePresetView /> : <MobileCalendarView />}
            </div>
          ) : (
            // Desktop Dropdown
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-max">
              <div className="flex">
                {/* Preset Options */}
                <div className="w-40 border-r border-gray-200">
                  <div className="p-3 border-b border-gray-200">
                    <h4 className="font-medium text-gray-800 text-sm">Quick Select</h4>
                  </div>
                  <div className="py-2">
                    {presetOptions.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => handlePresetClick(preset)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar */}
                <div className="flex">
                  {renderCalendar(currentMonth)}
                  {renderCalendar(nextMonth, true)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 p-3 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};