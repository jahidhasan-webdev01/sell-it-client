import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const GoogleLogin = () => {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });

        if (data) {
            toast.success("Welcome back!");
            router.push('/');
        }
    };

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                className="w-full btn btn-primary rounded-full"
                variant="outline"
            >
                <FaGoogle />
                Log in with Google
            </button>
        </div>
    );
};

export default GoogleLogin;