import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ActivityData, EditableActivity } from "../../../types/activity.types";

type Props = {
  activities: ActivityData[];
  expandedIndexes: number[];
  onExpandToggle: (index: number) => void;
  onEdit: (activity: EditableActivity, index: number) => void;
};

const ActivityList = ({ activities, expandedIndexes, onExpandToggle, onEdit }: Props) => {
  return (
    <>
      <h2 className="text-sm font-medium mb-2">Your Activities</h2>
      <Card className="bg-transparent">
        <CardContent className="px-3">
          <ScrollArea className="h-64">
            <div className="flex flex-col gap-2">
              {activities.length === 0 ? (
                <p className="text-muted-foreground text-sm">No activities yet</p>
              ) : (
                activities.map((activity, index) => {
                  const hasDetails = activity.description || activity.startTime || activity.endTime;
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

                        {activity.startTime && activity.endTime && (
                          <Badge variant="secondary" className="ml-auto">
                            {`${activity.startTime}-${activity.endTime}`}
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
                      </div>

                      {isExpanded && (
                        <div className="mt-2 text-sm text-muted-foreground pl-1">
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
