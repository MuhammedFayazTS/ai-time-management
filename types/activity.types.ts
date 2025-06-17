export type ActivityData = {
  label: string;
  description?: string;
  startTime?: string;
  endTime?: string;
};

export type EditableActivity = ActivityData & { index: number };
