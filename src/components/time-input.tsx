"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Label } from "./ui/label";

type Props = {
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
};

const TimeInput = ({ placeholder, value, onChange }: Props) => {
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [period, setPeriod] = useState<"AM" | "PM">("AM");

    // Parse incoming value
    useEffect(() => {
        if (value) {
            const [time, meridiem] = value.split(" ");
            const [h, m] = time.split(":");
            setHour(h || "");
            setMinute(m || "");
            setPeriod(meridiem === "PM" ? "PM" : "AM");
        }
    }, [value]);

    // Need a fix this - !!Cannot type minute with 2 digits
    // Update output when any field changes
    useEffect(() => {
        if (hour && minute) {
            onChange(`${hour.padStart(2, "0")}:${minute.padStart(2, "0")} ${period}`);
        }
    }, [hour, minute, period]);

    return (
        <>
            {placeholder && <Label>{placeholder}</Label>}
            <div className="flex items-center gap-2">
                <Input
                    placeholder="HH"
                    maxLength={2}
                    className="w-16 text-center"
                    value={hour}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (+val >= 1 && +val <= 12) setHour(val);
                        else if (val === "") setHour("");
                    }}
                />
                <span>:</span>
                <Input
                    placeholder="MM"
                    maxLength={2}
                    className="w-16 text-center"
                    value={minute}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (+val >= 0 && +val <= 59) setMinute(val);
                        else if (val === "") setMinute("");
                    }}
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="text-sm w-20 justify-between">
                            {period}
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setPeriod("AM")}>AM</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPeriod("PM")}>PM</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
};

export default TimeInput;
