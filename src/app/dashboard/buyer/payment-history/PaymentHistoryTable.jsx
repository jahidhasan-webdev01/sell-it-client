"use client";

import React from "react";
import { motion } from "framer-motion";
import EmptyState from "@/components/empty/EmptyState";

const PaymentHistoryTable = ({ paymentHistory = [] }) => {
    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.35, ease: "easeOut" } 
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-base-content">Payment History</h1>
                <p className="text-sm text-base-content/60 mt-1">View and manage all your successful transaction logs.</p>
            </div>

            <div className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
                {paymentHistory.length === 0 ? (
                    <EmptyState message="No payment history found" />
                ) : (
                    <div className="w-full max-w-full overflow-x-auto block">
                        <table className="table table-zebra w-full min-w-[600px] table-auto border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-base-200/80 text-base-content/80 shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
                                    <th className="bg-inherit">Transaction ID</th>
                                    <th className="bg-inherit">Amount</th>
                                    <th className="bg-inherit">Status</th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={tableVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {paymentHistory.map((payment) => (
                                    <motion.tr 
                                        key={payment._id} 
                                        variants={rowVariants}
                                        className="hover:bg-base-200/30 transition-colors align-middle"
                                    >
                                        <td className="font-mono text-sm font-semibold text-primary">
                                            {payment.transactionId || payment.txId || "N/A"}
                                        </td>
                                        
                                        <td className="text-sm font-mono font-bold text-base-content">
                                            {payment.amount} BDT
                                        </td>
                                        
                                        <td>
                                            <span className="badge badge-success badge-sm py-2.5 px-3 font-semibold text-xs rounded-lg text-success-content bg-success/20 border-0 capitalize">
                                                {payment.status || "Success"}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistoryTable;