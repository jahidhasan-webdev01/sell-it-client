'use client';

import Link from 'next/link';
import { FiAlertTriangle, FiHome, FiLock } from 'react-icons/fi';

const UnauthorizedPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 p-6 sm:p-8 bg-base-100 rounded-2xl shadow-xl border border-base-300 relative overflow-hidden">
                
                <div className="absolute top-0 inset-x-0 h-2 bg-error" />

                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-error/10 animate-ping opacity-75" />
                        
                        <div className="relative w-20 h-20 rounded-full bg-error/10 flex items-center justify-center text-error border-2 border-error/20">
                            <FiLock className="text-3xl animate-bounce" style={{ animationDuration: '3s' }} />
                        </div>
                        
                        <div className="absolute -bottom-1 -right-1 bg-warning text-warning-content rounded-full p-1.5 shadow-md">
                            <FiAlertTriangle className="text-sm" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl font-black tracking-tight text-base-content">
                        403: Forbidden
                    </h1>
                    <p className="text-xl font-bold text-base-content/80">
                        Access Denied
                    </p>
                    <p className="text-sm text-base-content/60 leading-relaxed max-w-sm mx-auto">
                        Oops! You don&rsquo;t have permission to view this directory or page. Your account role might not match the clearance required for this path.
                    </p>
                </div>

                <div className="bg-base-200 border border-base-300 rounded-xl p-3 text-xs text-base-content/70 flex items-start gap-2.5 text-left">
                    <span className="badge badge-error badge-sm shrink-0 mt-0.5">Note</span>
                    <span>If you think this is a mistake, try logging out and signing back in with your authorized merchant or administrator account credentials.</span>
                </div>

                <div>
                    <Link 
                        href="/" 
                        className="btn btn-primary rounded-xl flex-1 gap-2 order-1 sm:order-2 normal-case"
                    >
                        <FiHome className="text-lg" /> Return Home
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default UnauthorizedPage;