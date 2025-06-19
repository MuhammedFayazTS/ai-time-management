export type ActivityData = {
  label: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  priority?: Priority;
};

export type EditableActivity = ActivityData & { index: number };

export type Priority  = "low" |"medium" | "high"
