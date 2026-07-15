'use client';

import { useState, useMemo } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

// Utility helpers for date comparisons
const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

const isToday = (date: Date) => isSameDay(date, new Date());

// Generates exactly 42 days (6 rows * 7 columns) for a standard calendar view grid
const generateCalendarGrid = (year: number, month: number): Date[] => {
    // Get the first day of the targeted month
    const firstDayOfMonth = new Date(year, month, 1);

    // Day of the week index (0 = Sunday, ..., 6 = Saturday). 
    // Shifting index to make Monday (Lun) index 0 instead of Sunday.
    const dayOfWeek = firstDayOfMonth.getDay();
    const daysBefore = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const gridStartOffset = 1 - daysBefore;
    const totalGridCells = 42; // standard 6x7 calendar layout
    const days: Date[] = [];

    for (let i = 0; i < totalGridCells; i++) {
        // Native JavaScript automatically handles underflows and overflows perfectly.
        days.push(new Date(year, month, gridStartOffset + i));
    }

    return days;
};

const DAYS_OF_WEEK = ['Lun', "Mar", "mer", "jeu", "ven", "Sam", "Dim"];

interface CustomCalendarProps {
    closeComponent?: () => void;
    currentlyChosenDate: Date;
    setCurrentlyChosenDate: (date: Date) => void;
}

export default function CustomCalendar({ closeComponent, currentlyChosenDate, setCurrentlyChosenDate }: CustomCalendarProps) {
    const today = useMemo(() => new Date(), []);

    // State driving the currently viewed month view context
    const [viewDate, setViewDate] = useState<Date>(() => new Date(currentlyChosenDate));

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    // Derived State: Array of 42 dates calculated natively on view changes
    const calendarGrid = useMemo(() => {
        return generateCalendarGrid(currentYear, currentMonth);
    }, [currentYear, currentMonth]);

    // Navigation triggers
    const handlePrevMonth = () => {
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
        // Guard step: Block shifting to future months beyond the modern current month
        if (nextMonthDate > today && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            return;
        }
        setViewDate(nextMonthDate);
    };

    // Determine if next navigation element should be disabled
    const isNextDisabled = currentMonth === today.getMonth() && currentYear === today.getFullYear();
    const onTodayClick = () => {
        setViewDate(new Date(today.getFullYear(), today.getMonth()));
        setCurrentlyChosenDate(today);
    }

    return (
        <div className="flex flex-col gap-2 xl:p-2">
            <div className="w-full flex gap-1 flex-col border border-gray-300 rounded-md p-3 bg-white">
                {/* Header Control Panel */}
                <div className="flex justify-between items-center px-1">
                    <button
                        onClick={handlePrevMonth}
                        className="hover:bg-gray-100 p-2 rounded-md transition-colors duration-150 cursor-pointer"
                    >
                        <CaretLeftIcon size={18} />
                    </button>

                    <p className="font-bold xl:font-semibold select-none">
                        {String(currentMonth + 1).padStart(2, '0')}/{currentYear}
                    </p>

                    <button
                        onClick={handleNextMonth}
                        disabled={isNextDisabled}
                        className={`p-2 rounded-md transition-colors duration-150 
                        ${isNextDisabled
                                ? "opacity-20 cursor-not-allowed"
                                : "hover:bg-gray-100 cursor-pointer"
                            }`}
                    >
                        <CaretRightIcon size={18} />
                    </button>
                </div>

                {/* Calendar Weekday Names */}
                <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-400 capitalize py-2">
                    {DAYS_OF_WEEK.map((day) => (
                        <span key={day} className="select-none">{day}</span>
                    ))}
                </div>

                {/* Interactive Grid Cell Items */}
                <div className="grid grid-cols-7 gap-1">
                    {calendarGrid.map((day, i) => {
                        const isCurrentMonth = day.getMonth() === currentMonth;
                        const isSelected = isSameDay(day, currentlyChosenDate);
                        const isFuture = day > today;

                        // Cleanly hide dates tracking further out than current active calendar timeline
                        if (isFuture) {
                            return <div key={i} aria-hidden="true" />;
                        }

                        return (
                            <button
                                key={i}
                                disabled={isFuture}
                                onClick={() => setCurrentlyChosenDate(day)}
                                className={`
                                p-2.5 flex items-center justify-center rounded-md text-sm font-medium transition-all duration-100
                                ${isSelected
                                        ? "bg-black text-white"
                                        : "hover:bg-gray-100 text-black"
                                    }
                                ${!isCurrentMonth && !isSelected ? "text-gray-400" : ""}
                                ${isToday(day) && !isSelected ? "ring-2 ring-gray-100 ring-offset-1" : ""}
                            `}
                            >
                                {String(day.getDate()).length === 1 && "0"}
                                {day.getDate()}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="flex gap-1 w-full *:w-full">
                <button onClick={onTodayClick}
                    className="p-3 cursor-pointer font-semibold border border-gray-500 rounded"
                >
                    {"Aujourd'hui"}
                </button>
                <button
                    className="p-3 cursor-pointer font-semibold border border-gray-500 rounded"
                    onClick={closeComponent}>
                    Confirmer
                </button>
            </div>

        </div>

    );
}