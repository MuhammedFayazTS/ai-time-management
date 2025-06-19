"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { priorities } from "@/constants/activities";
import { ActivityData } from "../../../types/activity.types";
import { cn } from "@/lib/utils";
import TimeInput from "../time-input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock, Timer } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (data: ActivityData) => void;
};

const AddActivityDialog = ({ open, onClose, onSave }: Props) => {
    const [form, setForm] = useState<ActivityData>({
        label: "",
        description: "",
        startTime: "",
        endTime: "",
        duration: "",
        priority: "low",
    });

    const [useDuration, setUseDuration] = useState(false);
    const [durationUnit, setDurationUnit] = useState<"minutes" | "hours">("minutes");

    const handleFieldChange = (field: keyof ActivityData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveClick = () => {
        if (!form.label) return;

        const payload = { ...form };

        if (useDuration) {
            payload.startTime = "";
            payload.endTime = "";
            payload.duration = form.duration
                ? `${form.duration} ${durationUnit}`
                : "";
        } else {
            payload.duration = "";
        }

        onSave(payload);

        setForm({
            label: "",
            description: "",
            startTime: "",
            endTime: "",
            duration: "",
            priority: "low",
        });
        setUseDuration(false);
        setDurationUnit("minutes");
    };

    const toggleInputMode = () => {
        setUseDuration((prev) => {
            if (!prev) {
                setForm((prev) => ({
                    ...prev,
                    startTime: "",
                    endTime: "",
                    duration: "",
                }));
            } else {
                setForm((prev) => ({
                    ...prev,
                    startTime: "",
                    endTime: "",
                }));
            }
            return !prev;
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Activity</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                    <Input
                        placeholder="Activity Name"
                        value={form.label}
                        onChange={(e) => handleFieldChange("label", e.target.value)}
                    />

                    <Button
                        type="button"
                        onClick={toggleInputMode}
                        className="w-fit text-xs px-3 py-1 self-start flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md shadow-sm transition"
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
                                placeholder="Duration"
                                min={1}
                                className="w-32"
                                value={form.duration || ""}
                                onChange={(e) => handleFieldChange("duration", e.target.value)}
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-[120px] justify-between">
                                        {durationUnit.charAt(0).toUpperCase() + durationUnit.slice(1)}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[120px]">
                                    <DropdownMenuItem onClick={() => setDurationUnit("minutes")}>
                                        Minutes
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setDurationUnit("hours")}>
                                        Hours
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <>
                            <TimeInput
                                placeholder="Start time (e.g. 09:00)"
                                value={form.startTime || ""}
                                onChange={(val) => handleFieldChange("startTime", val)}
                            />
                            <TimeInput
                                placeholder="End time (e.g. 10:00)"
                                value={form.endTime || ""}
                                onChange={(val) => handleFieldChange("endTime", val)}
                            />
                        </>
                    )}

                    <Textarea
                        className="mt-2"
                        placeholder="Description (optional)"
                        value={form.description || ""}
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
                                        form.priority === value && `${selectedColor} ring-2 ring-offset-1`
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
                    <Button onClick={handleSaveClick}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddActivityDialog;
