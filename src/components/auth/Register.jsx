'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiLock,
    FiArrowRight,
    FiUpload,
    FiEyeOff,
    FiEye
} from 'react-icons/fi';
import AuthHeader from './AuthHeader';
import Link from 'next/link';
import GoogleLogin from './GoogleLogin';
import { toast } from 'react-hot-toast';
import { uploadImage } from '@/utils/uploadImage';
import { authClient } from '@/lib/auth-client';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const targetForm = e.target;
        const formData = new FormData(targetForm);
        const data = Object.fromEntries(formData.entries());

        if (!imageFile) {
            toast.error('Please upload a profile image');
            return;
        }

        if (data.password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }

        try {
            setLoading(true);

            const imageData = new FormData();
            imageData.append("image", imageFile);
            const imageResult = await uploadImage(imageData);

            if (!imageResult) {
                toast.error("Something went wrong")
            }

            const finalData = {
                ...data,
                image: imageResult?.data?.url,
                status: "PENDING",
            };


            const { data: response , error} = await authClient.signUp.email(finalData);

            console.log("response", response);
            console.log("error", error);
            if (error) {
                return toast.error(error?.message);
            }
            toast.success("Your account has been created");
            targetForm.reset();
            setImageFile(null);
            setImagePreview(undefined);

        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-0 sm:p-4">
            <div className="card w-full max-w-lg bg-base-100 shadow-xl border-0 sm:border border-base-300 rounded-none sm:rounded-xl">
                <div className="card-body gap-6 p-6 sm:p-8">

                    <AuthHeader title="Create Account" subtitle="Join us today! It only takes a minute." />

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="form-control">
                            <label
                                htmlFor="photo-upload"
                                className="flex items-center gap-4 cursor-pointer group select-none"
                            >
                                <div className="w-16 h-16 rounded-xl border border-dashed border-base-content/20 bg-base-200 flex items-center justify-center text-base-content/60 group-hover:border-primary group-hover:text-primary transition-all overflow-hidden">
                                    {imagePreview ? (
                                        <Image width={100} height={100} src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <FiUpload className="text-xl" />
                                    )}
                                </div>

                                <div>
                                    <p className="font-semibold text-sm text-base-content group-hover:text-primary transition-colors">
                                        Upload image *
                                    </p>
                                    <p className="text-xs text-base-content/50 mt-0.5">
                                        PNG, JPG up to 5MB
                                    </p>
                                </div>

                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                            {/* Full Name */}
                            <div className="form-control col-span-1 md:col-span-1 w-full">
                                <label className="label-text font-medium mb-1.5">Full Name</label>
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <FiUser className="text-base-content/40 shrink-0" />
                                    <input
                                        type="text"
                                        name="name"
                                        className="grow w-full"
                                        placeholder="Your name"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Email Address */}
                            <div className="form-control col-span-1 md:col-span-1 w-full">
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

                            {/* Phone Number */}
                            <div className="form-control col-span-1 md:col-span-1 w-full">
                                <label className="label-text font-medium mb-1.5">Phone Number</label>
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <FiPhone className="text-base-content/40 shrink-0" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="grow w-full"
                                        placeholder="+8801700000000"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Location */}
                            <div className="form-control col-span-1 md:col-span-1 w-full">
                                <label className="label-text font-medium mb-1.5">Location</label>
                                <label className="input input-bordered flex items-center gap-2 w-full">
                                    <FiMapPin className="text-base-content/40 shrink-0" />
                                    <input
                                        type="text"
                                        name="location"
                                        className="grow w-full"
                                        placeholder="City, Country"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Account Role */}
                            <div className="form-control col-span-1 md:col-span-2 w-full">
                                <label className="label-text font-medium mb-2">Account Role</label>
                                <div className="flex gap-6 items-center">
                                    <label className="label cursor-pointer justify-start gap-3 p-0">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="BUYER"
                                            className="radio radio-primary"
                                            defaultChecked
                                            required
                                        />
                                        <span className="label-text font-medium">BUYER</span>
                                    </label>

                                    <label className="label cursor-pointer justify-start gap-3 p-0">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="SELLER"
                                            className="radio radio-primary"
                                            required
                                        />
                                        <span className="label-text font-medium">SELLER</span>
                                    </label>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="form-control col-span-1 md:col-span-2 w-full">
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
                                    <>Register Account <FiArrowRight /></>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="flex flex-col w-full">
                        <div className="text-center text-sm text-base-content/60">
                            Already have an account?{' '}
                            <Link href="/login" className="link link-primary no-underline hover:underline font-semibold">
                                Log In
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
}