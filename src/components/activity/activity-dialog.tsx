import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditableActivity } from "../../../types/activity.types";
import { cn } from "@/lib/utils";
import { priorities } from "@/constants/activities";
import TimeInput from "../time-input";

type Props = {
    open: boolean;
    selected: EditableActivity | null;
    onClose: () => void;
    onChange: (data: EditableActivity) => void;
    onSave: () => void;
};

const ActivityDialog = ({ open, selected, onClose, onChange, onSave }: Props) => {
    if (!selected) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Activity</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                    <TimeInput
                        placeholder="Start time (e.g. 09:00 AM)"
                        value={selected.startTime || ""}
                        onChange={(val) => onChange({ ...selected, startTime: val })}
                    />

                    <TimeInput
                        placeholder="End time (e.g. 10:00 AM)"
                        value={selected.endTime || ""}
                        onChange={(val) => onChange({ ...selected, endTime: val })}
                    />
                    <Textarea
                        placeholder="Description (optional)"
                        value={selected.description || ""}
                        onChange={(e) => onChange({ ...selected, description: e.target.value })}
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
                                        selected.priority === value && `${selectedColor} ring-2 ring-offset-1`
                                    )}
                                    onClick={() => onChange({ ...selected, priority: value })}

                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button onClick={onSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default ActivityDialog;
