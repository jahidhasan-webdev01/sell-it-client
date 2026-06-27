import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.user || null;
}

export const requireRole = async (role) => {
    const user = await getUserSession();
    if (!user) {
        redirect("/login");
    }
    if (user?.role !== role) {
        if (user?.emailVerified) {
            return {
                ...user,
                role: "BUYER",
                phone: "01XXXXXXXXX",
                location: "XX,XX",
                status: "APPROVED"
            }
        }
        redirect("/unauthorized");
    }

    return user;
}