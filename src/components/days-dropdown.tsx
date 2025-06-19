"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { daysOfWeek } from "@/constants/activities";

type Day = typeof daysOfWeek[number];

type DaysDropDownProps = {
    label?: string;
    selectedDay: string;
    onChange: (day: Day) => void;
};

const DaysDropDown: React.FC<DaysDropDownProps> = ({
    label = "Copy From Day",
    selectedDay,
    onChange,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-fit">
                    {label} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select Day</DropdownMenuLabel>
                {daysOfWeek
                    .filter((day) => day !== selectedDay)
                    .map((day) => (
                        <DropdownMenuItem
                            key={day}
                            onClick={() => onChange(day)}
                        >
                            {day}
                        </DropdownMenuItem>
                    ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DaysDropDown;
