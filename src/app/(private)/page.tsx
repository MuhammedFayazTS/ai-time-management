import { HomeActivities } from "@/components/home-activities";
import PageHeader from "@/components/page-header";
import { UserProfileWithProgress } from "@/components/user-profile-with-progress";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/sign-in")

  const user = session?.user
  return (
    <div className="min-h-screen flex flex-col items-center text-center p-4">
      <PageHeader />

      <UserProfileWithProgress user={user} />

      <HomeActivities />

    </div>
  );
}
