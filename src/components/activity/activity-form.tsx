"use client";
import { useReducer } from "react";
import { activityOptions, daysOfWeek } from "@/constants/activities";
import { ActivityData, EditableActivity } from "../../../types/activity.types";
import ActivityOption from "./activity-option";
import ActivityList from "./activity-list";
import ActivityDialog from "./activity-dialog";
import AdditionalTimeConsumption from "./addition-time-activities";
import ActivityStepper from "./activity-stepper";
import { Button } from "../ui/button";
import AddActivityDialog from "./add-activity-dialog";
import { Plus } from "lucide-react";
import { activityFormReducer, initialState } from "./activity-form-reducer";
import { cn } from "@/lib/utils";
import DaysDropDown from "../days-dropdown";
import { saveUserActivitiesWithDays } from "@/lib/actions/user-activity";
import { DayOfWeek } from "@prisma/client";
import { toast } from "sonner";

const ActivityForm = () => {
    const [state, dispatch] = useReducer(activityFormReducer, initialState);

    const handleAdd = (activity: ActivityData) => {
        dispatch({ type: "ADD_ACTIVITY", payload: activity });
    };

    const handleRemove = (index: number) => {
        dispatch({ type: "REMOVE_ACTIVITY", payload: index });
    };

    const handleEdit = (activity: EditableActivity) => {
        dispatch({ type: "SET_SELECTED", payload: activity });
        dispatch({ type: "SET_DIALOG_OPEN", payload: true });
    };

    const handleSave = (activity: EditableActivity) => {
        dispatch({ type: "UPDATE_ACTIVITY", payload: activity });
    };

    const toggleExpanded = (index: number) => {
        dispatch({ type: "TOGGLE_EXPAND", payload: index });
    };

    const handleInputChange = (field: string, value: string) => {
        dispatch({ type: "SET_FIELD_VALUE", field, value });
    };

    const handleSubmitUserActivities = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const grouped = new Map<string, any>();

        for (const [day, activities] of Object.entries(state.dayWiseActivities)) {
            for (const a of activities) {
                const key = a.label;

                if (!grouped.has(key)) {
                    grouped.set(key, {
                        name: a.label,
                        description: a.description || "",
                        days: [],
                        preferredStart: a.startTime || null,
                        preferredEnd: a.endTime || null,
                        customDuration: a.duration || null,
                        priority: "medium",
                    });
                }

                grouped.get(key).days.push(day as DayOfWeek);
            }
        }

        const allActivities = Array.from(grouped.values());

        try {
            const res = await saveUserActivitiesWithDays(allActivities);

            toast.success("Activities saved",
                {
                    description: `${res.count} activities updated.`,
                    cancel: {
                        label: 'Cancel',
                        onClick: () => console.log('Cancel!'),
                    },
                }
            );

            dispatch({ type: "RESET_FORM" });
        } catch (err) {
            toast.error("Save failed",
                {
                    description: "Something went wrong while saving activities.",
                    cancel: {
                        label: 'Cancel',
                        onClick: () => console.log('Cancel!'),
                    },
                }
            );

            console.error("Failed to save activities", err);
        }
    };


    const handleNext = () => {
        if (state.step < 1) dispatch({ type: "SET_STEP", payload: state.step + 1 });
        else {
            console.log({
                dayWiseActivities: state.dayWiseActivities,
                defaultActivities: state.defaultActivities,
                sleepStart: state.sleepStart,
                sleepEnd: state.sleepEnd,
                travelTime: state.travelTime,
                travelDistance: state.travelDistance,
                reservedTime: state.reservedTime,
            });
            handleSubmitUserActivities()
        }
    };

    const handleBack = () => {
        if (state.step > 0) dispatch({ type: "SET_STEP", payload: state.step - 1 });
    };

    const handleNewActivitySave = (activity: ActivityData) => {
        dispatch({ type: "ADD_ACTIVITY", payload: activity });
        dispatch({ type: "SET_NEW_DIALOG_OPEN", payload: false });
    };

    const handleDayChange = (day: string) => {
        dispatch({ type: "SET_SELECTED_DAY", payload: day });

        // if (!state.dayWiseActivities[day]) {
        //     dispatch({ type: "SYNC_DAY_WITH_DEFAULT" });
        // }
    };

    const activities = state.dayWiseActivities[state.selectedDay] || state.defaultActivities;

    return (
        <>
            {state.step === 0 && (
                <div className="flex-1 flex flex-col justify-between">

                    <div className="w-100 flex flex-col gap-2">
                        <div className="w-100 grid grid-cols-7 gap-2">
                            {daysOfWeek.map(({ label, value }) => (
                                <button
                                    key={label}
                                    className={cn(
                                        "w-full aspect-square flex items-center justify-center rounded shadow border",
                                        state.selectedDay === value ? "bg-blue-600 text-white" : "bg-gray-500"
                                    )}
                                    onClick={() => handleDayChange(value)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2 my-5">
                            {activityOptions.map(({ label, icon: Icon }) => (
                                <ActivityOption
                                    key={label}
                                    label={label}
                                    Icon={Icon}
                                    onAdd={handleAdd}
                                    onEdit={handleEdit}
                                    selectedActivites={activities}
                                />
                            ))}
                            <Button
                                variant="default"
                                className="text-sm px-3 py-1 rounded-full flex items-center gap-2 border-dashed text-white bg-blue-600 hover:bg-blue-800"
                                onClick={() => dispatch({ type: "SET_NEW_DIALOG_OPEN", payload: true })}
                            >
                                <Plus className="h-4 w-4" />
                                Custom Activity
                            </Button>
                        </div>
                    </div>

                    <div className="w-100 flex flex-col gap-y-3">
                        <div className="flex justify-between items-center">
                            <DaysDropDown
                                selectedDay={state.selectedDay}
                                onChange={(day) => dispatch({ type: "COPY_FROM_DAY", payload: day.value })} />
                            <Button
                                variant="destructive"
                                className="ml-2"
                                onClick={() => dispatch({ type: "CLEAR_DAY_ACTIVITIES" })}
                            >
                                Clear Day
                            </Button>
                        </div>
                        <ActivityList
                            activities={activities}
                            expandedIndexes={state.expandedIndexes}
                            onExpandToggle={toggleExpanded}
                            onEdit={handleEdit}
                            onRemove={handleRemove}
                        />
                    </div>

                    <ActivityDialog
                        open={state.open}
                        selected={state.selectedActivity}
                        onClose={() => dispatch({ type: "SET_DIALOG_OPEN", payload: false })}
                        onSave={handleSave}
                    />

                    <AddActivityDialog
                        open={state.newDialogOpen}
                        onClose={() => dispatch({ type: "SET_NEW_DIALOG_OPEN", payload: false })}
                        onSave={handleNewActivitySave}
                    />
                </div>
            )}

            {state.step === 1 && (
                <AdditionalTimeConsumption
                    sleepStart={state.sleepStart}
                    sleepEnd={state.sleepEnd}
                    travelTime={state.travelTime}
                    travelDistance={state.travelDistance}
                    reservedTime={state.reservedTime}
                    onChange={handleInputChange}
                />
            )}

            <ActivityStepper
                step={state.step}
                onNext={handleNext}
                onBack={handleBack}
                isLastStep={state.step === 1}
            />
        </>
    );
};

export default ActivityForm;
