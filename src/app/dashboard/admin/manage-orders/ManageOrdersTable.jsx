"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmptyState from "@/components/empty/EmptyState";
import toast from "react-hot-toast";
import { updateOrderStatus } from "@/lib/actions/order";

const ManageOrdersTable = ({ orders: initialOrders }) => {
    const [orders, setOrders] = useState(initialOrders);

    const handleStatusChange = async (orderId, newStatus) => {
        const oldStatus = orders.find(o => o._id === orderId)?.orderStatus;

        setOrders(prev =>
            prev.map(order => order._id === orderId ? { ...order, orderStatus: newStatus } : order)
        );

        try {
            const result = await updateOrderStatus(orderId, newStatus);

            if (!result || (result.matchedCount === 0 && result.modifiedCount === 0)) {
                setOrders(prev =>
                    prev.map(order => order._id === orderId ? { ...order, orderStatus: oldStatus } : order)
                );
                return toast.error("Something went wrong");
            }

            toast.success("Order status updated successfully");
        } catch (error) {
            toast.error("Failed to update order status");
            setOrders(prev =>
                prev.map(order => order._id === orderId ? { ...order, orderStatus: oldStatus } : order)
            );
        }
    };

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500 tracking-wider">
                    <tr>
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">Buyer ID</th>
                        <th className="px-6 py-3">Payment</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <AnimatePresence mode="popLayout">
                        {orders?.map((order, index) => (
                            <motion.tr
                                key={order._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="hover:bg-gray-50"
                                layout
                            >
                                <td className="px-6 py-4 font-mono text-xs text-gray-600">
                                    #{order._id ? order._id.substring(0, 8) : "N/A"}...
                                </td>

                                <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                    {order.buyerInfo?.userId || "N/A"}
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.paymentStatus === "PAID"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className={`text-xs font-semibold rounded-full px-2.5 py-1 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200
                                            ${order.orderStatus === 'DELIVERED' || order.orderStatus === 'COMPLETED' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                                            ${order.orderStatus === 'PROCESSING' || order.orderStatus === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                                            ${order.orderStatus === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                            ${order.orderStatus === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                                        `}
                                    >
                                        <option value="PROCESSING">PROCESSING</option>
                                        <option value="SHIPPED">SHIPPED</option>
                                        <option value="DELIVERED">DELIVERED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>

                    {(!orders || orders.length === 0) && (
                        <tr>
                            <td colSpan="4" className="p-4">
                                <EmptyState />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageOrdersTable;