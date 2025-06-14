import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleSignIn } from "./google-sign-in"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { signUp } from "@/lib/actions/sign-up"
import Link from "next/link"

export async function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={async (formData) => {
        "use server";
        const res = await signUp(formData);
        if (res.success) {
          redirect("/sign-in");
        }
      }}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <div className="text-center text-sm">
              already have an account?{" "}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                required />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
        </div>
      </form>
      <div className="grid gap-4 sm:grid-cols-1">
        <GoogleSignIn />
      </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
