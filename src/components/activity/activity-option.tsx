"use client";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useLongPress } from "use-long-press";
import { ActivityData, EditableActivity } from "../../../types/activity.types";

type Props = {
    selectedActivites: ActivityData[];
    label: string;
    Icon: LucideIcon;
    onAdd: (activity: ActivityData, index: number) => void;
    onEdit: (activity: EditableActivity, index: number) => void;
};

const ActivityOption = ({ selectedActivites, label, Icon, onAdd, onEdit }: Props) => {
    const newActivity: ActivityData = { label };

    const bindLongPress = useLongPress(() => {
        const newIndex = selectedActivites.length ? selectedActivites.length + 1 : 0
        onEdit({ ...newActivity, index: newIndex }, Date.now());
    }, {
        threshold: 500,
        captureEvent: true,
        cancelOnMovement: true,
    });

    return (
        <Button
            variant="outline"
            className="text-sm px-3 py-1 rounded-full flex items-center gap-2 border bg-gradient-to-br from-white to-zinc-100 dark:from-slate-800 dark:to-slate-900"
            {...bindLongPress()}
            onClick={() => onAdd(newActivity, Date.now())}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Button>
    );
};

export default ActivityOption;
