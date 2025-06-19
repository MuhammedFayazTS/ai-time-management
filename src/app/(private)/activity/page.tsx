import ActivityForm from "@/components/activity/activity-form";
import ModeToggle from "@/components/mode-toggle";

const ActivityPage = () => {

    return (
        <main className="max-w-md mx-auto flex flex-col h-screen py-[7%] px-[4%] md:py-4 md:px-4 bg-gradient-to-t from-indigo-500/30 to-slate-100 dark:from-indigo-950 dark:to-slate-950">
            <h1 className="text-center text-xl font-semibold mb-10 md:mb-5 inline-flex justify-between">Add Activity
                <ModeToggle />
            </h1>
            <ActivityForm />
        </main>
    );
};

export default ActivityPage;
