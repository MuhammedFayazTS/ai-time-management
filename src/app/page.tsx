import { SignOutButton } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/sign-in")

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <h2 className="text-3xl font-bold text-blue-400">Home Page</h2>
      <h5 className="text-xl font-bold text-blue-600">{session.user?.email}</h5>
      <SignOutButton />
    </div>
  );
}
