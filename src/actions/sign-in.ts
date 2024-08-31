"use server";

import * as auth from "@/auth";

export async function signIn() {
    try {
        return auth.signIn("github");
    } catch (error) {
        console.log(error);
    }
}
