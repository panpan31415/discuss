import { signIn, signOut } from "@/actions";
import { auth } from "@/auth";
import { Button } from "@nextui-org/react";

export default async function Home() {
    const session = await auth();
    return (
        <div>
            <form action={signIn}>
                <Button type='submit'>Sign in </Button>
            </form>

            <form action={signOut}>
                <Button type='submit'>Sign out</Button>
            </form>

            {session?.user ? <p>you are signed in as {session.user.name}</p> : <p>you are signed out</p>}
        </div>
    );
}
