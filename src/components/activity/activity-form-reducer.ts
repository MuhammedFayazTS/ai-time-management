import { ActivityData, EditableActivity } from "../../../types/activity.types";

type State = {
  step: number;
  selectedDay: string;
  defaultActivities: ActivityData[];
  dayWiseActivities: Record<string, ActivityData[]>;
  selectedActivity: EditableActivity | null;
  expandedIndexes: number[];
  sleepStart: string;
  sleepEnd: string;
  travelTime: string;
  travelDistance: string;
  reservedTime: string;
  open: boolean;
  newDialogOpen: boolean;
};

type Action =
  | { type: "SET_STEP"; payload: number }
  | { type: "ADD_ACTIVITY"; payload: ActivityData }
  | { type: "UPDATE_ACTIVITY"; payload: EditableActivity }
  | { type: "REMOVE_ACTIVITY"; payload: number }
  | { type: "SET_SELECTED"; payload: EditableActivity | null }
  | { type: "TOGGLE_EXPAND"; payload: number }
  | { type: "SET_FIELD_VALUE"; field: string; value: string }
  | { type: "SET_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_NEW_DIALOG_OPEN"; payload: boolean }
  | { type: "SET_SELECTED_DAY"; payload: string }
  | { type: "SYNC_DAY_WITH_DEFAULT" }
  | { type: "CLEAR_DAY_ACTIVITIES" }
  | { type: "COPY_FROM_DAY"; payload: string };

export const activityFormReducer = (state: State, action: Action): State => {
  const selectedDay = state.selectedDay;
  const activities =
    state.dayWiseActivities[selectedDay] || state.defaultActivities;

  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_SELECTED_DAY":
      return { ...state, selectedDay: action.payload };

    case "SYNC_DAY_WITH_DEFAULT":
      return {
        ...state,
        dayWiseActivities: {
          ...state.dayWiseActivities,
          [state.selectedDay]: [...state.defaultActivities],
        },
      };

    case "ADD_ACTIVITY":
      return {
        ...state,
        defaultActivities: [...state.defaultActivities, action.payload],
        dayWiseActivities: {
          ...state.dayWiseActivities,
          [selectedDay]: [...activities, action.payload],
        },
      };

    case "UPDATE_ACTIVITY": {
      const updated = [...activities];
      if (action.payload.index !== undefined) {
        updated[action.payload.index] = {
          label: action.payload.label,
          description: action.payload.description,
          startTime: action.payload.startTime,
          endTime: action.payload.endTime,
          priority: action.payload.priority,
        };
      }

      return {
        ...state,
        dayWiseActivities: {
          ...state.dayWiseActivities,
          [selectedDay]: updated,
        },
        open: false,
      };
    }

    case "REMOVE_ACTIVITY":
      return {
        ...state,
        dayWiseActivities: {
          ...state.dayWiseActivities,
          [selectedDay]: activities.filter((_, i) => i !== action.payload),
        },
      };

    case "SET_SELECTED":
      return { ...state, selectedActivity: action.payload };

    case "TOGGLE_EXPAND":
      return {
        ...state,
        expandedIndexes: state.expandedIndexes.includes(action.payload)
          ? state.expandedIndexes.filter((i) => i !== action.payload)
          : [...state.expandedIndexes, action.payload],
      };

    case "SET_FIELD_VALUE":
      return { ...state, [action.field]: action.value };

    case "SET_DIALOG_OPEN":
      return { ...state, open: action.payload };

    case "SET_NEW_DIALOG_OPEN":
      return { ...state, newDialogOpen: action.payload };

    case "COPY_FROM_DAY":
      return {
        ...state,
        dayWiseActivities: {
          ...state.dayWiseActivities,
          [state.selectedDay]: [
            ...(state.dayWiseActivities[action.payload] || []),
          ],
        },
      };

    case "CLEAR_DAY_ACTIVITIES":
      return {
        ...state,
        dayWiseActivities: {
          ...state.dayWiseActivities,
          [selectedDay]: [],
        },
      };

    default:
      return state;
  }
};
