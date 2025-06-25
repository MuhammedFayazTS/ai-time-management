import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TimeInput from "../time-input";

type Props = {
  sleepStart: string;
  sleepEnd: string;
  travelTime: string;
  travelDistance: string;
  reservedTime: string;
  onChange: (field: string, value: string) => void;
};

const AdditionalTimeConsumption = ({
  sleepStart,
  sleepEnd,
  travelTime,
  travelDistance,
  reservedTime,
  onChange,
}: Props) => (
  <div className="flex-1 flex flex-col gap-4 mt-4">
    <div className="grid grid-cols-2 gap-2">
      <TimeInput
        placeholder="Sleep Start (e.g., 23:00)"
        value={sleepStart}
        onChange={(value) => onChange("sleepStart", value)}
      />
      <TimeInput
        placeholder="Sleep End (e.g., 07:00)"
        value={sleepEnd}
        onChange={(value) => onChange("sleepEnd", value)}
      />
    </div>

    <div className="grid grid-cols-2 gap-2">
      <Input
        placeholder="Travel Time (e.g., 1h)"
        value={travelTime}
        onChange={(e) => onChange("travelTime", e.target.value)}
      />
      <Input
        placeholder="Travel Distance (e.g., 10km)"
        value={travelDistance}
        onChange={(e) => onChange("travelDistance", e.target.value)}
      />
    </div>

    <Textarea
      placeholder="Other reserved time (e.g., meals, chores, etc.)"
      value={reservedTime}
      onChange={(e) => onChange("reservedTime", e.target.value)}
    />
  </div>
);

export default AdditionalTimeConsumption;
