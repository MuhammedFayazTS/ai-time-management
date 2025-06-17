import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { priorities } from "@/constants/activities";
import { ActivityData } from "../../../types/activity.types";
import { cn } from "@/lib/utils";
import TimeInput from "../time-input";

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
        priority: "low",
    });

    const handleFieldChange = (field: keyof ActivityData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveClick = () => {
        if (!form.label) return;
        onSave(form);
        setForm({
            label: "",
            description: "",
            startTime: "",
            endTime: "",
            priority: "low",
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
                    <TimeInput
                        placeholder="Start time (e.g. 09:00)"
                        value={form.startTime}
                        onChange={(val) => handleFieldChange("startTime", val)}
                    />
                    <TimeInput
                        placeholder="End time (e.g. 10:00)"
                        value={form.endTime}
                        onChange={(val) => handleFieldChange("endTime", val)}
                    />
                    <Textarea
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
