'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingBag, FiHeart, FiEye, FiClock } from 'react-icons/fi';

const UserDashboardStats = ({ statsData }) => {
    const orderCount = statsData?.orderCount || 0;
    const wishlistCount = statsData?.wishlistCount || 0;
    const recentOrders = statsData?.recentOrders || [];

    const fadeInUp = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    // ডাইনামিক স্ট্যাটাস কালার জেনারেটর
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
            case 'completed':
                return 'badge-success';
            case 'processing':
            case 'pending':
                return 'badge-warning';
            case 'cancelled':
                return 'badge-error';
            default:
                return 'badge-ghost';
        }
    };

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="bg-gradient-to-br from-base-200/80 to-base-200/30 border border-base-300 p-6 rounded-2xl flex items-center justify-between group shadow-sm"
                >
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Total Orders</p>
                        <h3 className="text-3xl font-black font-mono text-base-content group-hover:text-primary transition-colors">
                            {orderCount}
                        </h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10 group-hover:scale-110 transition-transform">
                        <FiShoppingBag className="w-6 h-6" />
                    </div>
                </motion.div>

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="bg-gradient-to-br from-base-200/80 to-base-200/30 border border-base-300 p-6 rounded-2xl flex items-center justify-between group shadow-sm"
                >
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Wishlist Items</p>
                        <h3 className="text-3xl font-black font-mono text-base-content group-hover:text-secondary transition-colors">
                            {wishlistCount}
                        </h3>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/10 group-hover:scale-110 transition-transform">
                        <FiHeart className="w-6 h-6" />
                    </div>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-base-100 border border-base-300 rounded-2xl shadow-sm overflow-hidden"
            >
                <div className="p-5 border-b border-base-300 flex items-center gap-2 bg-base-200/30">
                    <FiClock className="text-primary w-5 h-5" />
                    <h2 className="text-lg font-bold tracking-tight text-base-content">Recent Purchases</h2>
                </div>

                <div className="overflow-x-auto w-full">
                    {recentOrders.length === 0 ? (
                        <div className="p-10 text-center text-sm text-base-content/50">
                            No purchases made yet.
                        </div>
                    ) : (
                        <table className="table w-full border-collapse">
                            <thead>
                                <tr className="border-b border-base-300 text-base-content/60 text-xs tracking-wider bg-base-200/10">
                                    <th className="bg-transparent font-bold">Product</th>
                                    <th className="bg-transparent font-bold">Price</th>
                                    <th className="bg-transparent font-bold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((item) => (
                                    <tr key={item._id} className="hover:bg-base-200/40 border-b border-base-200 last:border-0 transition-colors">
                                        <td>
                                            <div className="flex items-center gap-3.5">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-11 h-11 bg-base-200 border border-base-300 relative">
                                                        <Image 
                                                            src={item.productImage || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=150&auto=format&fit=crop"} 
                                                            alt={item.productName || "Product"} 
                                                            fill
                                                            sizes="44px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm text-base-content line-clamp-1 max-w-[180px] sm:max-w-xs">
                                                        {item.productName}
                                                    </div>
                                                    <div className="text-[10px] text-base-content/40 font-mono">Order ID: #{item._id}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="font-bold text-sm font-mono text-base-content">
                                            {Number(item.price).toLocaleString()} <span className="text-[10px] font-sans font-medium text-base-content/50">BDT</span>
                                        </td>

                                        <td>
                                            <span className={`badge ${getStatusColor(item.status)} badge-sm font-semibold py-2.5 px-3 rounded-lg border-0 text-white text-[11px] capitalize`}>
                                                {item.status || "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default UserDashboardStats;