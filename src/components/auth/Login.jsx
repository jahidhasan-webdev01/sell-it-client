'use client';

import Link from "next/link";
import GoogleLogin from "./GoogleLogin";
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import AuthHeader from "./AuthHeader";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            setLoading(true);

            const { data: response, error } = await authClient.signIn.email(data);

            if (error) {
                return toast.error(error.message || 'Failed to login');
            }

            if (!response) {
                return toast.error('Failed to login');
            }

            toast.success("Welcome back!");
            router.push("/");

        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-0 sm:p-4">
            <div className="card w-full max-w-lg bg-base-100 shadow-xl border-0 sm:border border-base-300 rounded-none sm:rounded-xl">
                <div className="card-body gap-6 p-6 sm:p-8">

                    <AuthHeader title="Create Account" subtitle="Join us today! It only takes a minute." />

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {/* Email Address */}
                            <div className="form-control col-span-2 w-full">
                                <label className="label-text font-medium mb-1.5">Email Address</label>
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <FiMail className="text-base-content/40 shrink-0" />
                                    <input
                                        type="email"
                                        name="email"
                                        className="grow w-full"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Password */}
                            <div className="form-control col-span-2 w-full">
                                <label className="label-text font-medium mb-1.5">Password</label>
                                <label className="input input-bordered flex items-center gap-2 w-full relative">
                                    <FiLock className="text-base-content/40 shrink-0" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="grow w-full pr-8"
                                        placeholder="••••••••••••"
                                        minLength={6}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 text-base-content/40 hover:text-primary transition-colors focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                                    </button>
                                </label>
                            </div>

                        </div>

                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-outline rounded-full btn-primary w-full gap-2"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <>Login your account <FiArrowRight /></>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="flex flex-col w-full">
                        <div className="text-center text-sm text-base-content/60">
                            Don&rsquo;t have an account?{' '}
                            <Link href="/register" className="link link-primary no-underline hover:underline font-semibold">
                                Register
                            </Link>
                        </div>

                        <div className="divider text-xs text-base-content/40 font-medium uppercase tracking-wider my-2">
                            Or
                        </div>

                        <GoogleLogin />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;