import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { ActivityData, EditableActivity } from "../../../types/activity.types";
import { priorities } from "@/constants/activities";
import { cn } from "@/lib/utils";

type Props = {
    activities: ActivityData[];
    expandedIndexes: number[];
    onExpandToggle: (index: number) => void;
    onEdit: (activity: EditableActivity, index: number) => void;
    onRemove: (index: number) => void;
};

const ActivityList = ({ activities, expandedIndexes, onExpandToggle, onEdit, onRemove }: Props) => {
    return (
        <>
            {/* <h2 className="text-sm font-medium mb-2">Your Activities</h2> */}
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border border-zinc-200 dark:border-slate-700 shadow-sm">
                <CardContent className="px-3">
                    <ScrollArea className="h-64">
                        <div className="flex flex-col gap-2">
                            {activities.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-sm">No activities yet</p>
                            ) : (
                                activities.map((activity, index) => {
                                    const hasDetails = activity.description || activity.startTime || activity.endTime || activity.priority;
                                    const isExpanded = expandedIndexes.includes(index);

                                    return (
                                        <div key={index} className="rounded-md p-2 border border-zinc-300 dark:border-slate-700 bg-gradient-to-br from-zinc-100 to-white dark:from-slate-800 dark:to-slate-900">
                                            <div className="flex justify-between items-center">
                                                <Badge
                                                    onClick={() => onEdit({ ...activity, index }, index)}
                                                    variant="secondary"
                                                    className="w-fit cursor-pointer"
                                                >
                                                    {activity.label}
                                                </Badge>

                                                <div className="flex gap-2 items-center">
                                                    {activity.startTime && activity.endTime && (
                                                        <Badge variant="secondary">
                                                            {`${activity.startTime}-${activity.endTime}`}
                                                        </Badge>
                                                    )}

                                                    {activity.priority && (
                                                        <Badge
                                                            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-2 py-0.5 rounded text-xs ring-2 ring-pink-400 dark:from-fuchsia-500 dark:to-rose-500"
                                                            variant="default">
                                                            {activity.priority}
                                                        </Badge>
                                                    )}

                                                    {hasDetails && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => onExpandToggle(index)}
                                                        >
                                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                        </Button>
                                                    )}

                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => onRemove(index)}
                                                        className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                                                    >
                                                        <X />
                                                    </Button>
                                                </div>
                                            </div>

                                            {isExpanded && (
                                                <div className="mt-3 text-sm rounded-lg bg-white dark:bg-slate-800 p-4 shadow-sm space-y-2 transition-all duration-300 border border-zinc-200 dark:border-slate-700">
                                                    {activity.priority && (
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            {priorities
                                                                .filter((p) => p.value === activity.priority)
                                                                .map(({ label, value, color, selectedColor }) => (
                                                                    <span
                                                                        key={value}
                                                                        className={cn(
                                                                            "inline-block px-2 py-0.5 rounded-full text-xs font-semibold border",
                                                                            color,
                                                                            selectedColor
                                                                        )}
                                                                    >
                                                                        {label}
                                                                    </span>
                                                                ))}
                                                        </div>
                                                    )}

                                                    {(activity.startTime || activity.endTime) && (
                                                        <p>
                                                            <span className="font-medium text-gray-700 dark:text-gray-300">Time:</span>{" "}
                                                            {activity.startTime || "--"} to {activity.endTime || "--"}
                                                        </p>
                                                    )}

                                                    {activity.duration && (
                                                        <p>
                                                            <span className="font-medium text-gray-700 dark:text-gray-300">Duration:</span>{" "}
                                                            {activity.duration}
                                                        </p>
                                                    )}

                                                    {activity.description && (
                                                        <p>
                                                            <span className="font-medium text-gray-700 dark:text-gray-300">Description:</span>{" "}
                                                            {activity.description}
                                                        </p>
                                                    )}
                                                </div>

                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
};

export default ActivityList;
