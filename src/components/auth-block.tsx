"use client";
import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger, Spinner } from "@nextui-org/react";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";
export default function AuthBlock() {
    const session = useSession();
    const user = session.data?.user;

    if (session.status === "loading") {
        return <Spinner />;
    }

    return user ? (
        <Popover placement='left'>
            <PopoverTrigger>
                <Avatar src={user.image || ""} />
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
