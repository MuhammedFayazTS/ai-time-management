"use client";
import { useState } from "react";
import { activityOptions } from "@/constants/activities";
import { ActivityData, EditableActivity } from "../../../types/activity.types";
import ActivityOption from "./activity-option";
import ActivityList from "./activity-list";
import ActivityDialog from "./activity-dialog";

const ActivityForm = () => {
    const [activities, setActivities] = useState<ActivityData[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<EditableActivity | null>(null);
    const [open, setOpen] = useState(false);
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

    const handleAdd = (activity: ActivityData ) => {
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

    return (
        <>
            <div className="flex flex-wrap gap-2 mb-4">
                {activityOptions.map(({ label, icon: Icon }) => (
                    <ActivityOption key={label} label={label} Icon={Icon} onAdd={handleAdd} />
                ))}
            </div>

            <ActivityList
                activities={activities}
                expandedIndexes={expandedIndexes}
                onExpandToggle={toggleExpanded}
                onEdit={handleEdit}
            />

            <ActivityDialog
                open={open}
                selected={selectedActivity}
                onClose={() => setOpen(false)}
                onChange={handleChange}
                onSave={handleSave}
            />
        </>
    );
};

export default ActivityForm;
