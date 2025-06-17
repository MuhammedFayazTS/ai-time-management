import { Button } from "@/components/ui/button";

type Props = {
  step: number;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
};

const ActivityStepper = ({ step, onNext, onBack, isLastStep }: Props) => (
  <div className="flex justify-between items-center mt-6">
    <Button variant="ghost" onClick={onBack} disabled={step === 0}>Back</Button>
    <div className="text-sm text-muted-foreground">Step {step + 1} of 2</div>
    <Button
      onClick={onNext}
      className={isLastStep ? "bg-green-600 hover:bg-green-700 text-white" : ""}
    >
      {isLastStep ? "Finish" : "Next"}
    </Button>
  </div>
);

export default ActivityStepper;
