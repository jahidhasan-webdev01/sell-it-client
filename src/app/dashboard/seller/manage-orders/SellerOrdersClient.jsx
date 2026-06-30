'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FiChevronDown, FiAlertCircle, FiCheckCircle, FiXCircle, FiPackage, FiTruck, FiClock } from 'react-icons/fi';
import { updateOrderStatusBySeller } from '@/lib/actions/order';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const SellerOrdersClient = ({ initialOrders }) => {
    const router = useRouter();
    const [updatingId, setUpdatingId] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const getStatusDetails = (status) => {
        switch (status?.toUpperCase()) {
            case 'PENDING': return { class: 'bg-warning/10 text-warning border-warning/20', icon: <FiClock /> };
            case 'ACCEPTED': return { class: 'bg-info/10 text-info border-info/20', icon: <FiCheckCircle /> };
            case 'PROCESSING': return { class: 'bg-primary/10 text-primary border-primary/20', icon: <FiPackage /> };
            case 'SHIPPED': return { class: 'bg-accent/10 text-accent border-accent/20', icon: <FiTruck /> };
            case 'DELIVERED': return { class: 'bg-success/10 text-success border-success/20', icon: <FiCheckCircle /> };
            case 'REJECTED': return { class: 'bg-error/10 text-error border-error/20', icon: <FiXCircle /> };
            default: return { class: 'bg-base-200 text-base-content/70 border-base-300', icon: null };
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        setUpdatingId(orderId);
        setActiveDropdown(null);

        try {
            const result = await updateOrderStatusBySeller(orderId, newStatus);

            if (result?.error || result?.success === false) {
                throw new Error(result?.message || "Failed to update status");
            }

            toast.success(`Order status updated to ${newStatus.toUpperCase()}`);
            router.refresh();
        } catch (error) {
            toast.error(error.message || "Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    if (initialOrders.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-16 border border-dashed border-base-300 rounded-3xl bg-base-200/20 backdrop-blur-sm"
            >
                <FiAlertCircle className="w-12 h-12 text-base-content/30 mx-auto mb-4 animate-pulse" />
                <p className="text-base-content/60 text-sm font-semibold">No incoming customer orders found.</p>
            </motion.div>
        );
    }

    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-base-300/70 bg-base-100/60 backdrop-blur-md shadow-xl shadow-base-300/10">
                <div className="overflow-x-auto w-full">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="border-b border-base-300 text-base-content/70 text-xs tracking-wider bg-base-200/40">
                                <th className="py-4 bg-transparent font-black">Product Details</th>
                                <th className="py-4 bg-transparent font-black">Current Status</th>
                                <th className="py-4 bg-transparent font-black text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {initialOrders.map((order) => {
                                const currentStatus = order.status?.toUpperCase() || 'PENDING';
                                const statusInfo = getStatusDetails(currentStatus);
                                return (
                                    <motion.tr
                                        variants={itemVariants}
                                        layoutId={order._id}
                                        key={order._id}
                                        className="hover:bg-base-200/50 border-b border-base-200/60 last:border-0 transition-colors duration-200 group"
                                    >
                                        <td className="py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative overflow-hidden rounded-xl border border-base-300 bg-base-200 p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                                                    <div className="mask mask-squircle w-12 h-12 relative">
                                                        <Image
                                                            src={order.productImage || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=150&auto=format&fit=crop"}
                                                            alt={order.productName || "Product"}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-0.5">
                                                    <div className="font-black text-sm text-base-content line-clamp-1 max-w-[220px] tracking-tight group-hover:text-primary transition-colors">
                                                        {order.productName}
                                                    </div>
                                                    <div className="text-[10px] text-base-content/40 font-mono tracking-widest uppercase">ID: #{order._id?.slice(-6)}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4">
                                            <motion.span
                                                whileHover={{ scale: 1.03 }}
                                                className={`badge ${statusInfo.class} border badge-sm font-bold py-3 px-3.5 rounded-xl inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider shadow-sm`}
                                            >
                                                {statusInfo.icon}
                                                {currentStatus}
                                            </motion.span>
                                        </td>

                                        <td className="py-4 text-right pr-6">
                                            <AnimatePresence mode="wait">
                                                {updatingId === order._id ? (
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="loading loading-spinner loading-sm text-primary inline-block align-middle mr-4"
                                                    ></motion.span>
                                                ) : (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="flex items-center justify-end gap-2"
                                                    >
                                                        {currentStatus === 'PENDING' && (
                                                            <div className="flex gap-1.5">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleStatusUpdate(order._id, 'Accepted')}
                                                                    className="btn btn-xs h-8 min-h-0 bg-success/20 hover:bg-success text-success hover:text-white border-0 rounded-xl px-4 font-bold text-xs"
                                                                >
                                                                    ACCEPT
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleStatusUpdate(order._id, 'Rejected')}
                                                                    className="btn btn-xs h-8 min-h-0 bg-error/10 hover:bg-error text-error hover:text-white border-0 rounded-xl px-4 font-bold text-xs"
                                                                >
                                                                    REJECT
                                                                </motion.button>
                                                            </div>
                                                        )}

                                                        {currentStatus !== 'PENDING' && currentStatus !== 'REJECTED' && currentStatus !== 'DELIVERED' && (
                                                            <div className="relative inline-block text-left">
                                                                <motion.button
                                                                    whileTap={{ scale: 0.97 }}
                                                                    onClick={() => setActiveDropdown(activeDropdown === order._id ? null : order._id)}
                                                                    className="btn btn-xs h-8 min-h-0 btn-outline border-base-300 hover:bg-base-200 text-base-content rounded-xl inline-flex items-center gap-1.5 font-bold shadow-sm text-xs px-3"
                                                                >
                                                                    UPDATE STATUS <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === order._id ? 'rotate-180' : ''}`} />
                                                                </motion.button>

                                                                <AnimatePresence>
                                                                    {activeDropdown === order._id && (
                                                                        <>
                                                                            <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />

                                                                            <motion.ul
                                                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                                                transition={{ duration: 0.15 }}
                                                                                className="absolute right-0 mt-2 p-1.5 shadow-2xl bg-base-100 border border-base-300/80 rounded-2xl w-44 z-20 text-xs font-bold text-left overflow-hidden"
                                                                            >
                                                                                {currentStatus === 'ACCEPTED' && (
                                                                                    <li className="overflow-hidden rounded-xl"><button className="w-full text-left py-2.5 px-3 hover:bg-base-200 text-base-content" onClick={() => handleStatusUpdate(order._id, 'Processing')}>⚙️ START PROCESSING</button></li>
                                                                                )}
                                                                                {currentStatus === 'PROCESSING' && (
                                                                                    <li className="overflow-hidden rounded-xl"><button className="w-full text-left py-2.5 px-3 hover:bg-base-200 text-base-content" onClick={() => handleStatusUpdate(order._id, 'Shipped')}>🚀 SHIP ORDER</button></li>
                                                                                )}
                                                                                {currentStatus === 'SHIPPED' && (
                                                                                    <li className="overflow-hidden rounded-xl"><button className="w-full text-left py-2.5 px-3 hover:bg-base-200 text-base-content" onClick={() => handleStatusUpdate(order._id, 'Delivered')}>🎉 MARK DELIVERED</button></li>
                                                                                )}
                                                                            </motion.ul>
                                                                        </>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        )}

                                                        {(currentStatus === 'DELIVERED' || currentStatus === 'REJECTED') && (
                                                            <span className="text-xs text-base-content/30 font-bold px-3 py-1 bg-base-200/50 rounded-lg select-none">FULFILLMENT LOCKED</span>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </motion.tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SellerOrdersClient;