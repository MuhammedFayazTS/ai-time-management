import ActivityForm from "@/components/activity/activity-form";

const ActivityPage = () => {

    return (
        <main className="p-4 max-w-md mx-auto flex flex-col h-screen py-[7%] px-[4%]">
            <h1 className=" text-center text-xl font-semibold mb-10">Add Activity</h1>
            <ActivityForm />
        </main>
    );
};

export default ActivityPage;
