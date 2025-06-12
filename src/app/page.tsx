import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <h2 className="text-3xl font-bold text-blue-400">Home Page</h2>
      <Button>Click me</Button>
    </div>
  );
}
