export type ActivityData = {
  label: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  priority?: Priority;
};

export type EditableActivity = ActivityData & { index: number };

export type Priority  = "low" |"medium" | "high"
