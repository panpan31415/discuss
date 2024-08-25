"use server";
import * as auth from "@/auth";
export async function signIn() {
    try {
        return auth.signIn("github");
    } catch (error) {
        console.log(error);
    }
}

export async function signOut() {
    return await auth.signOut();
}
