import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditableActivity } from "../../../types/activity.types";

type Props = {
  open: boolean;
  selected: EditableActivity | null;
  onClose: () => void;
  onChange: (data: EditableActivity) => void;
  onSave: () => void;
};

const ActivityDialog = ({ open, selected, onClose, onChange, onSave }: Props) => {
  if (!selected) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Start time (e.g. 09:00)"
            value={selected.startTime || ""}
            onChange={(e) => onChange({ ...selected, startTime: e.target.value })}
          />
          <Input
            placeholder="End time (e.g. 10:00)"
            value={selected.endTime || ""}
            onChange={(e) => onChange({ ...selected, endTime: e.target.value })}
          />
          <Textarea
            placeholder="Description (optional)"
            value={selected.description || ""}
            onChange={(e) => onChange({ ...selected, description: e.target.value })}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDialog;
