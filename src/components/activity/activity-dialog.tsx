"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditableActivity } from "../../../types/activity.types";
import { cn } from "@/lib/utils";
import { priorities } from "@/constants/activities";
import TimeInput from "../time-input";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Clock, Timer } from "lucide-react";

type Props = {
    open: boolean;
    selected: EditableActivity | null;
    onClose: () => void;
    onSave: (data: EditableActivity) => void;
};

const ActivityDialog = ({ open, selected, onClose, onSave }: Props) => {
    const [localActivity, setLocalActivity] = useState<EditableActivity | null>(null);
    const [useDuration, setUseDuration] = useState(false);
    const [durationUnit, setDurationUnit] = useState<"minutes" | "hours">("minutes");

    useEffect(() => {
        if (!selected) return;

        setLocalActivity({ ...selected });

        const hasTimeRange = selected.startTime || selected.endTime;
        setUseDuration(!hasTimeRange);

        if (!hasTimeRange && selected.duration) {
            const [, unit] = selected.duration.split(" ");
            if (unit === "minutes" || unit === "hours") {
                setDurationUnit(unit);
            }
        }
    }, [selected]);

    if (!localActivity) return null;

    const handleFieldChange = (field: keyof EditableActivity, value: string) => {
        setLocalActivity((prev) => prev ? { ...prev, [field]: value } : prev);
    };

    const toggleInputMode = () => {
        setUseDuration((prev) => {
            const next = !prev;

            setLocalActivity((prev) =>
                prev
                    ? {
                        ...prev,
                        ...(next
                            ? { startTime: "", endTime: "" }
                            : { duration: "" }),
                    }
                    : prev
            );

            return next;
        });
    };

    const handleDurationChange = (val: string) => {
        setLocalActivity((prev) =>
            prev
                ? {
                    ...prev,
                    startTime: "",
                    endTime: "",
                    duration: val ? `${val} ${durationUnit}` : "",
                }
                : prev
        );
    };

    const handleDurationUnitChange = (unit: "minutes" | "hours") => {
        setDurationUnit(unit);
        setLocalActivity((prev) => {
            if (!prev) return prev;
            const val = prev.duration?.split(" ")[0] ?? "";
            return {
                ...prev,
                startTime: "",
                endTime: "",
                duration: val ? `${val} ${unit}` : "",
            };
        });
    };

    const handleSave = () => {
        if (localActivity) {
            onSave(localActivity);
            onClose();
        }
    };

    const durationVal = localActivity.duration?.split(" ")[0] ?? "";

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="dark:border dark:border-slate-500 bg-gradient-to-b from-purple-50 via-white to-white  dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 shadow-xl border border-border">
                <DialogHeader>
                    <DialogTitle>Edit Activity</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={toggleInputMode}
                        className="w-fit text-xs px-3 py-1 self-start flex items-center gap-2 text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-md shadow-md transition"
                    >
                        {useDuration ? (
                            <>
                                <Clock className="w-4 h-4" />
                                Switch to Start/End Time
                            </>
                        ) : (
                            <>
                                <Timer className="w-4 h-4" />
                                Switch to Duration
                            </>
                        )}
                    </Button>

                    {useDuration ? (
                        <div className="flex gap-2 items-center">
                            <Input
                                type="number"
                                min={1}
                                value={durationVal}
                                onChange={(e) => handleDurationChange(e.target.value)}
                                className="w-32"
                                placeholder="Duration"
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-[120px] justify-between">
                                        {durationUnit.charAt(0).toUpperCase() + durationUnit.slice(1)}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[120px]">
                                    <DropdownMenuItem onClick={() => handleDurationUnitChange("minutes")}>
                                        Minutes
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDurationUnitChange("hours")}>
                                        Hours
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <>
                            <TimeInput
                                placeholder="Start time (e.g. 09:00 AM)"
                                value={localActivity.startTime || ""}
                                onChange={(val) => handleFieldChange("startTime", val)}
                            />
                            <TimeInput
                                placeholder="End time (e.g. 10:00 AM)"
                                value={localActivity.endTime || ""}
                                onChange={(val) => handleFieldChange("endTime", val)}
                            />
                        </>
                    )}

                    <Textarea
                        placeholder="Description (optional)"
                        value={localActivity.description || ""}
                        onChange={(e) => handleFieldChange("description", e.target.value)}
                    />

                    <div className="flex flex-col gap-1 mt-2">
                        <span className="text-sm text-muted-foreground">Priority</span>
                        <div className="flex gap-2">
                            {priorities.map(({ label, value, color, selectedColor }) => (
                                <button
                                    key={value}
                                    className={cn(
                                        "px-3 py-1 rounded-full border text-xs font-medium transition",
                                        color,
                                        localActivity.priority === value && `${selectedColor}`
                                    )}
                                    onClick={() => handleFieldChange("priority", value)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md"
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ActivityDialog;
