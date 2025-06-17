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
            <Card className="bg-transparent">
                <CardContent className="px-3">
                    <ScrollArea className="h-64">
                        <div className="flex flex-col gap-2">
                            {activities.length === 0 ? (
                                <p className="text-muted-foreground text-sm">No activities yet</p>
                            ) : (
                                activities.map((activity, index) => {
                                    const hasDetails = activity.description || activity.startTime || activity.endTime || activity.priority;
                                    const isExpanded = expandedIndexes.includes(index);

                                    return (
                                        <div key={index} className="border rounded-md p-2">
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
                                                        <Badge variant="destructive">
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
                                                        className="text-red-500 hover:bg-red-100"
                                                    >
                                                        <X />
                                                    </Button>
                                                </div>
                                            </div>

                                            {isExpanded && (
                                                <div className="mt-2 text-sm text-muted-foreground pl-1">
                                                    {activity.priority && (
                                                        priorities.filter(p => p.value === activity.priority)?.map(({ label, value, color, selectedColor }) => (
                                                            <button
                                                                key={value}
                                                                className={cn(
                                                                    "mb-2 px-1.5 py-0.5 rounded border text-xs font-medium transition",
                                                                    color,
                                                                    `${selectedColor} ring-2 ring-offset-1`
                                                                )}
                                                            >
                                                                {label}
                                                            </button>
                                                        ))
                                                    )}
                                                    {activity.description && (
                                                        <p><span className="font-medium">Description:</span> {activity.description}</p>
                                                    )}
                                                    {(activity.startTime || activity.endTime) && (
                                                        <p><span className="font-medium">Time:</span> {activity.startTime || "--"} to {activity.endTime || "--"}</p>
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
