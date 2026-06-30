'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiCalendar, FiUser } from 'react-icons/fi';
import UpdateProfile from './UpdateProfile';
import { MdOutlineEmail } from 'react-icons/md';

const ProfileClient = ({ user }) => {
    
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const formattedDate = user?.createdAt 
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "N/A";

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gradient-to-br from-base-200/60 to-base-200/10 border border-base-300 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-sm"
        >
            <div className="md:col-span-1 flex flex-col items-center justify-center text-center space-y-4 pb-6 md:pb-0 md:border-r border-base-300/60 md:pr-6">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary/20 shadow-md ring-4 ring-base-100 group">
                    <Image
                        src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"}
                        alt={user?.name || "User"}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                
                <div className="space-y-1">
                    <h1 className="text-xl font-black text-base-content tracking-tight uppercase">
                        {user?.name || "Anonymous User"}
                    </h1>
                    <span className="badge badge-primary badge-sm font-semibold rounded-md px-2.5 py-2">
                        Active Account
                    </span>
                </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-between space-y-6 md:pl-2">
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-base-content/40 uppercase tracking-widest flex items-center gap-1.5">
                        <FiUser className="w-4 h-4" /> Account Details
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email Card */}
                        <div className="flex items-center gap-3.5 p-4 rounded-xl bg-base-100 border border-base-300/70 shadow-inner">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/5">
                                <MdOutlineEmail className="text-xl" />
                            </div>
                            <div className="space-y-0.5 overflow-hidden">
                                <p className="text-[11px] font-bold text-base-content/40 uppercase tracking-wider">Email Address</p>
                                <p className="text-sm font-medium text-base-content truncate">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 p-4 rounded-xl bg-base-100 border border-base-300/70 shadow-inner">
                            <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/5">
                                <FiCalendar className="text-lg" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[11px] font-bold text-base-content/40 uppercase tracking-wider">User Since</p>
                                <p className="text-sm font-medium text-base-content">{formattedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-base-300/60 flex justify-end">
                    <UpdateProfile user={user} />
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileClient;