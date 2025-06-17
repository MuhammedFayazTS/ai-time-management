"use client";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useLongPress } from "use-long-press";
import { ActivityData } from "../../../types/activity.types";

type Props = {
  label: string;
  Icon: LucideIcon;
  onAdd: (activity: ActivityData, index: number) => void;
};

const ActivityOption = ({ label, Icon, onAdd }: Props) => {
  const newActivity: ActivityData = { label };

  const bindLongPress = useLongPress(() => {
    onAdd(newActivity, Date.now()); // unique index fallback
  }, {
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: true,
  });

  return (
    <Button
      variant="outline"
      className="text-sm px-3 py-1 rounded-full flex items-center gap-2"
      {...bindLongPress()}
      onClick={() => onAdd(newActivity, Date.now())}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
};

export default ActivityOption;
