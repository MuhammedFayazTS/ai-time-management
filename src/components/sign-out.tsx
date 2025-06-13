import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export function SignOutButton() {
    const handleSignOut = async () => {
        "use server"
        await signOut();
    };

    return (
        <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
        </Button>
    );
}
