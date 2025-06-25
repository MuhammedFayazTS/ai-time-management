"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { format } from "date-fns";

const mockSchedules = [
    {
        name: "Morning Workout",
        startTime: "07:00",
        endTime: "08:00",
        priority: "HIGH",
        days: ["MONDAY", "WEDNESDAY", "FRIDAY"],
    },
    {
        name: "Study Time",
        startTime: "10:00",
        endTime: "12:00",
        priority: "MEDIUM",
        days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY"],
    },
    {
        name: "Evening Walk",
        startTime: "18:00",
        endTime: "18:45",
        priority: "LOW",
        days: ["DAILY"],
    },
];

const today = new Date();
const currentTime = format(today, "HH:mm");

// Get the first upcoming activity based on time
const upcoming = mockSchedules.find((sched) => sched.startTime > currentTime);

export const HomeActivities = () => {
    return (
        <div className="w-full mt-6 space-y-6">
            {/* Upcoming Activity */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Upcoming Activity</h2>
                {upcoming ? (
                    <div className="bg-muted p-4 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold">{upcoming.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            {upcoming.startTime} - {upcoming.endTime} | {upcoming.priority} priority
                        </p>
                    </div>
                ) : (
                    <p className="text-muted-foreground">No upcoming activities today</p>
                )}
            </section>

            {/* Weekly Schedule */}
            <section>
                <h2 className="text-lg font-semibold mb-2">This Week&apos;s Schedule</h2>
                <ScrollArea className="w-full">
                    <div className="flex gap-4 pb-4">
                        {mockSchedules.map((sched, i) => (
                            <div
                                key={i}
                                className={`min-w-[160px] bg-background border p-4 rounded-lg shadow-sm 
                                    ${sched.priority === "HIGH" && 'border-red-500 bg-red-300'}
                                    ${sched.priority === "MEDIUM" && 'border-orange-500 bg-orange-300'}
                                    ${sched.priority === "LOW" && 'border-green-500 bg-green-300'}
                                    `}
                            >
                                <h3 className="font-semibold">{sched.name}</h3>
                                <p className="text-xs text-muted-foreground">
                                    {sched.startTime} - {sched.endTime}
                                </p>
                                <p className="text-xs text-muted-foreground">{sched.days.join(", ")}</p>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </section>
        </div>
    );
};
