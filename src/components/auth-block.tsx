import { auth } from "@/auth";
import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import * as actions from "@/actions";
export default async function AuthBlock() {
    const session = await auth();
    return session?.user ? (
        <Popover placement='left'>
            <PopoverTrigger>
                <Avatar src={session.user.image || ""} />
            </PopoverTrigger>
            <PopoverContent>
                <div className='p-4'>
                    <form action={actions.signOut}>
                        <Button type='submit'>Sign out</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    ) : (
        <>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button
                        type='submit'
                        color='secondary'>
                        Sign In
                    </Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button
                        type='submit'
                        color='primary'>
                        Sign Up
                    </Button>
                </form>
            </NavbarItem>
        </>
    );
}
