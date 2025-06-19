import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  step: number;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  isSaveDisabled?: boolean;
};

const ActivityStepper = ({ step, onNext, onBack, isLastStep, isSaveDisabled }: Props) => {
  const progress = ((step + 1) / 2) * 100;

  return (
    <div className="mt-6 space-y-3">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-slate-700">
        <div
          className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-500 dark:from-violet-500 dark:to-fuchsia-600"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={onBack}
          disabled={step === 0}
          className="border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-300 bg-white dark:bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          Back
        </Button>


        <div className="text-sm text-muted-foreground">
          Step {step + 1} of 2
        </div>

        <Button
          onClick={onNext}
          disabled={isLastStep && isSaveDisabled}
          className={cn(
            "text-white transition-all shadow-sm hover:shadow-md",
            isLastStep
              ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          )}
        >
          {isLastStep ? "Finish" : "Next"}
        </Button>

      </div>
    </div>
  );
};

export default ActivityStepper;
