"use client";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const session = useSession();
    const isSignedIn = Boolean(session.data?.user);
    return isSignedIn ? (
        <div>you are signedIn, your data :{JSON.stringify(session.data?.user)}</div>
    ) : (
        <div>you are signed out</div>
    );
}
