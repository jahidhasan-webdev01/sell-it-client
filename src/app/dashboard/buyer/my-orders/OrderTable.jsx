"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiClock, FiCheckCircle } from "react-icons/fi";
import EmptyState from "@/components/empty/EmptyState";

const OrderTable = ({ orders: initialOrders }) => {
    const [orders, setOrders] = useState(initialOrders || []);

    useEffect(() => {
        setOrders(initialOrders || []);
    }, [initialOrders]);

    return (
        <div className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
            {orders.length < 1 ? (
                <EmptyState message="No orders found" />
            ) : (
                <div className="w-full max-w-full overflow-x-auto max-h-[calc(100vh-220px)] overflow-y-auto block">
                    <table className="table table-zebra w-full min-w-[600px] table-auto border-separate border-spacing-0">
                        <thead className="sticky top-0 z-10 bg-base-100">
                            <tr className="bg-base-200/80 backdrop-blur-sm text-base-content/80 shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
                                <th className="w-24 bg-inherit">Image</th>
                                <th className="bg-inherit">Product Name</th>
                                <th className="w-36 bg-inherit">Price</th>
                                <th className="w-36 bg-inherit">Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                const product = order.productDetails || {};
                                
                                return (
                                    <tr key={order._id} className="hover:bg-base-200/30 transition-colors align-middle">
                                        <td className="py-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-xl bg-base-300 relative overflow-hidden ring-1 ring-base-content/5">
                                                    <Image
                                                        src={product.image || "https://i.ibb.co/YTtLPJ3B/Screenshot-2026-06-10-193933.png"}
                                                        alt={product.title || "Product"}
                                                        fill
                                                        sizes="48px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td>
                                            <div className="font-semibold text-sm text-base-content truncate max-w-[280px]" title={product.title}>
                                                {product.title || "Unknown Product"}
                                            </div>
                                        </td>
                                        
                                        <td className="text-sm font-mono font-bold text-base-content/90">
                                            {product.price ? `${product.price} BDT` : "N/A"}
                                        </td>
                                        
                                        <td>
                                            <span className={`badge font-bold rounded-lg text-xs tracking-wider px-3 py-2 ${
                                                order.orderStatus === "DELIVERED" ? "bg-success/10 text-success border-success/20" :
                                                order.orderStatus === "CANCELLED" ? "bg-error/10 text-error border-error/20" :
                                                order.orderStatus === "PROCESSING" ? "bg-info/10 text-info border-info/20" :
                                                "bg-warning/10 text-warning border-warning/20"
                                            }`}>
                                                <div className="flex items-center gap-1">
                                                    {order.orderStatus === "PROCESSING" && <FiClock className="animate-spin text-xs" />}
                                                    {order.orderStatus === "DELIVERED" && <FiCheckCircle className="text-xs" />}
                                                    <span>{order.orderStatus || "PENDING"}</span>
                                                </div>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderTable;