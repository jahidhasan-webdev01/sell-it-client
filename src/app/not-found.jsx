'use client';

import React from 'react';
import Link from 'next/link';
import { FiAlertCircle, FiHome, FiSearch } from 'react-icons/fi';

export default function NotFound() {
    return (
        <div className="min-h-dvh flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 p-6 sm:p-8 bg-base-100 rounded-2xl shadow-xl border border-base-300 relative overflow-hidden">

                <div className="absolute top-0 inset-x-0 h-2 bg-primary" />

                <div className="flex justify-center pt-4">
                    <div className="relative">
                        <span className="text-8xl font-black text-base-content/5 tracking-tighter select-none block">
                            404
                        </span>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20 rotate-12 shadow-sm animate-pulse">
                                <FiSearch className="text-2xl" />
                            </div>
                        </div>

                        <div className="absolute -top-1 -right-2 bg-error text-error-content rounded-full p-1 shadow-md">
                            <FiAlertCircle className="text-xs" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
                        Page Not Found
                    </h1>
                    <p className="text-sm text-base-content/60 leading-relaxed max-w-sm mx-auto">
                        The page you are looking for doesn&rsquo;t exist, has been moved, or is temporarily unavailable.
                    </p>
                </div>

                <div className="bg-base-200 border border-base-300 rounded-xl p-4 text-xs text-left space-y-1.5 text-base-content/70">
                    <p className="font-bold text-base-content/80 mb-1">Try checking:</p>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                        <li>The URL spelling and formatting for typos.</li>
                        <li>If the product or dashboard route has been deleted.</li>
                        <li>Whether you are logged into the correct dashboard workspace.</li>
                    </ul>
                </div>

                <div>
                    <Link
                        href="/"
                        className="btn btn-primary rounded-xl flex-1 gap-2 order-1 sm:order-2 normal-case text-primary-content"
                    >
                        <FiHome className="text-lg" /> Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}