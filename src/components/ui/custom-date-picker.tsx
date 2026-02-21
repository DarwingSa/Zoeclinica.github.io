"use client";

import * as React from "react";
import { format, setMonth, setYear } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface CustomDatePickerProps {
    date?: Date;
    setDate: (date?: Date) => void;
    minYear?: number;
    maxYear?: number;
}

type ViewMode = "days" | "months" | "years";

export function CustomDatePicker({
    date,
    setDate,
    minYear = 1990,
    maxYear = new Date().getFullYear()
}: CustomDatePickerProps) {
    const [viewMode, setViewMode] = React.useState<ViewMode>("days");
    const [currentDate, setCurrentDate] = React.useState<Date>(date || new Date());

    // Update internal date when prop changes
    React.useEffect(() => {
        if (date) {
            setCurrentDate(date);
        }
    }, [date]);

    // Handle month selection
    const handleMonthSelect = (monthIndex: number) => {
        const newDate = setMonth(currentDate, monthIndex);
        setCurrentDate(newDate);
        setViewMode("days");
    };

    // Handle year selection
    const handleYearSelect = (year: number) => {
        const newDate = setYear(currentDate, year);
        setCurrentDate(newDate);
        setViewMode("months");
    };

    // Generate decades for year view
    const currentYear = currentDate.getFullYear();
    const startDecadeYear = Math.floor(currentYear / 10) * 10;

    // Navigation for months/years
    const navigatePrevious = () => {
        if (viewMode === "months") {
            setCurrentDate(setYear(currentDate, currentYear - 1));
        } else if (viewMode === "years") {
            setCurrentDate(setYear(currentDate, currentYear - 10));
        }
    };

    const navigateNext = () => {
        if (viewMode === "months") {
            setCurrentDate(setYear(currentDate, currentYear + 1));
        } else if (viewMode === "years") {
            setCurrentDate(setYear(currentDate, currentYear + 10));
        }
    };

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full h-12 pl-3 text-left font-normal rounded-xl bg-background/60 focus:bg-background transition-colors",
                        !date && "text-muted-foreground"
                    )}
                >
                    {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3">
                    {viewMode === "days" && (
                        <div className="flex flex-col">
                            {/* Custom Header for Days View */}
                            <div className="absolute top-4 left-0 right-0 flex justify-center z-10 pointer-events-none">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground pointer-events-auto"
                                    onClick={() => setViewMode("months")}
                                >
                                    {format(currentDate, "MMMM yyyy", { locale: es })}
                                </Button>
                            </div>

                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(newDate) => {
                                    if (newDate) {
                                        setDate(newDate);
                                        setCurrentDate(newDate);
                                    }
                                }}
                                month={currentDate}
                                onMonthChange={setCurrentDate}
                                disabled={(d) => d > new Date() || d < new Date(`${minYear}-01-01`)}
                                initialFocus
                                locale={es}
                                classNames={{
                                    caption_label: "invisible", // Hide default label as we use custom button
                                }}
                            />
                        </div>
                    )}

                    {viewMode === "months" && (
                        <div className="w-[252px]">
                            <div className="flex justify-between items-center mb-4">
                                <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" onClick={navigatePrevious}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 font-medium hover:bg-accent hover:text-accent-foreground"
                                    onClick={() => setViewMode("years")}
                                >
                                    {currentYear}
                                </Button>
                                <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" onClick={navigateNext}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {months.map((month, index) => (
                                    <Button
                                        key={month}
                                        variant={currentDate.getMonth() === index ? "default" : "ghost"}
                                        className={cn("h-12 w-full text-sm", currentDate.getMonth() === index && "bg-primary text-primary-foreground")}
                                        onClick={() => handleMonthSelect(index)}
                                    >
                                        {month.slice(0, 3)}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {viewMode === "years" && (
                        <div className="w-[252px]">
                            <div className="flex justify-between items-center mb-4">
                                <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" onClick={navigatePrevious}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="text-sm font-medium">
                                    {startDecadeYear} - {startDecadeYear + 9}
                                </div>
                                <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" onClick={navigateNext}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: 12 }).map((_, i) => {
                                    const checkYear = startDecadeYear - 1 + i;
                                    const isOuter = i === 0 || i === 11;
                                    const isDisabled = checkYear < minYear || checkYear > maxYear;

                                    return (
                                        <Button
                                            key={checkYear}
                                            variant={currentYear === checkYear ? "default" : "ghost"}
                                            disabled={isDisabled}
                                            className={cn(
                                                "h-12 w-full text-sm",
                                                currentYear === checkYear && "bg-primary text-primary-foreground",
                                                isOuter && "text-muted-foreground"
                                            )}
                                            onClick={() => handleYearSelect(checkYear)}
                                        >
                                            {checkYear}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
