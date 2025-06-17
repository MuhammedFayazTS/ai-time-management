"use client";
import { useState } from "react";
import { activityOptions } from "@/constants/activities";
import { ActivityData, EditableActivity } from "../../../types/activity.types";
import ActivityOption from "./activity-option";
import ActivityList from "./activity-list";
import ActivityDialog from "./activity-dialog";
import AdditionalTimeConsumption from "./addition-time-activities";
import ActivityStepper from "./activity-stepper";
import { Button } from "../ui/button";
import AddActivityDialog from "./add-activity-dialog";
import { Plus } from "lucide-react";
const ActivityForm = () => {
    const [step, setStep] = useState(0);

    const [activities, setActivities] = useState<ActivityData[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<EditableActivity | null>(null);
    const [open, setOpen] = useState(false);
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

    const [sleepStart, setSleepStart] = useState("");
    const [sleepEnd, setSleepEnd] = useState("");
    const [travelTime, setTravelTime] = useState("");
    const [travelDistance, setTravelDistance] = useState("");
    const [reservedTime, setReservedTime] = useState("");

    const [newDialogOpen, setNewDialogOpen] = useState(false);

    const handleAdd = (activity: ActivityData) => {
        setActivities((prev) => [...prev, activity]);
    };

    const handleEdit = (activity: EditableActivity) => {
        setSelectedActivity(activity);
        setOpen(true);
    };

    const handleChange = (data: EditableActivity) => {
        setSelectedActivity(data);
    };

    const handleSave = () => {
        if (selectedActivity) {
            const updated = [...activities];
            updated[selectedActivity.index] = {
                label: selectedActivity.label,
                description: selectedActivity.description,
                startTime: selectedActivity.startTime,
                endTime: selectedActivity.endTime,
                priority: selectedActivity.priority,
            };
            setActivities(updated);
            setOpen(false);
        }
    };

    const toggleExpanded = (index: number) => {
        setExpandedIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const handleInputChange = (field: string, value: string) => {
        switch (field) {
            case "sleepStart": return setSleepStart(value);
            case "sleepEnd": return setSleepEnd(value);
            case "travelTime": return setTravelTime(value);
            case "travelDistance": return setTravelDistance(value);
            case "reservedTime": return setReservedTime(value);
        }
    };

    const handleNext = () => {
        if (step < 1) setStep((s) => s + 1);
        else {
            // Final submit or navigation
            console.log({
                activities,
                sleepStart,
                sleepEnd,
                travelTime,
                travelDistance,
                reservedTime,
            });
        }
    };

    const handleBack = () => {
        if (step > 0) setStep((s) => s - 1);
    };

    const handleNewActivitySave = (activity: ActivityData) => {
        setActivities((prev) => [...prev, activity]);
        setNewDialogOpen(false);
    };

    const handleRemove = (index: number) => {
        setActivities((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            {step === 0 && (
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {activityOptions.map(({ label, icon: Icon }) => (
                            <ActivityOption
                                key={label}
                                label={label}
                                Icon={Icon}
                                onAdd={handleAdd}
                                onEdit={handleEdit}
                                selectedActivites={activities} />
                        ))}
                        <Button
                            variant="default"
                            className="text-sm px-3 py-1 rounded-full flex items-center gap-2 border-dashed text-white bg-blue-600 hover:bg-blue-800"
                            onClick={() => setNewDialogOpen(true)}
                        >
                            <Plus className="h-4 w-4" />
                            Custom Activity
                        </Button>
                    </div>

                    <ActivityList
                        activities={activities}
                        expandedIndexes={expandedIndexes}
                        onExpandToggle={toggleExpanded}
                        onEdit={handleEdit}
                        onRemove={handleRemove}
                    />

                    <ActivityDialog
                        open={open}
                        selected={selectedActivity}
                        onClose={() => setOpen(false)}
                        onChange={handleChange}
                        onSave={handleSave}
                    />


                    <AddActivityDialog
                        open={newDialogOpen}
                        onClose={() => setNewDialogOpen(false)}
                        onSave={handleNewActivitySave}
                    />
                </div>
            )}

            {step === 1 && (
                <AdditionalTimeConsumption
                    sleepStart={sleepStart}
                    sleepEnd={sleepEnd}
                    travelTime={travelTime}
                    travelDistance={travelDistance}
                    reservedTime={reservedTime}
                    onChange={handleInputChange}
                />
            )}

            <ActivityStepper
                step={step}
                onNext={handleNext}
                onBack={handleBack}
                isLastStep={step === 1}
            />
        </>
    );
};

export default ActivityForm;
