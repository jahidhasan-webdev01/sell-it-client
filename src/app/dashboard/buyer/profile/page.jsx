import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileClient from "./ProfileClient";

export const metadata = {
    title: "Dashboard | My Profile",
};

const ProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-base-100 flex items-start justify-center">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <ProfileClient user={user} />
            </div>
        </div>
    );
};

export default ProfilePage;