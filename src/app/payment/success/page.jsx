"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiMail, FiArrowRight, FiShoppingBag, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";
import { savePaymentInfo } from "@/lib/actions/payment";
import { confirmOrderAfterPayment } from "@/lib/actions/order";

const PaymentSuccessPage = ({ searchParams }) => {
    const router = useRouter();
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyAndSaveOrder = async () => {
            try {
                const resolvedParams = await searchParams;
                const sessionId = resolvedParams?.session_id;

                if (!sessionId) {
                    setError("Invalid Session");
                    setLoading(false);
                    return;
                }

                const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Verification failed");

                if (data.status === "open") {
                    router.push("/");
                    return;
                }

                setSessionData(data);

                const paymentInfo = {
                    orderId: sessionId,
                    userId: data.userId,
                    transactionId: data.transactionId,
                    amount: data.amount,
                    paymentStatus: "SUCCESS"
                }

                const orderInfo = {
                    transactionId: data.transactionId,
                    buyerInfo: {
                        userId: data.userId,
                    },
                    sellerInfo: {
                        userId: data.sellerId,
                    },
                    productId: data.productId,
                    paymentStatus: "PAID",
                    orderStatus: "PROCESSING"
                };

                await savePaymentInfo(paymentInfo);
                await confirmOrderAfterPayment(orderInfo);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        verifyAndSaveOrder();
    }, [searchParams, router]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-success"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto px-4 py-16 text-center">
                <div className="p-4 bg-error/10 text-error rounded-2xl font-medium mb-6 border border-error/20">
                    {error}
                </div>
                <Link href="/products" className="btn btn-primary rounded-xl w-full">
                    Back to Marketplace
                </Link>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-base-100">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-md w-full bg-base-100 border border-base-300 rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-success" />

                <motion.div
                    variants={itemVariants}
                    className="flex justify-center mb-6"
                >
                    <motion.div
                        initial={{ rotate: -15, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="p-4 bg-success/10 text-success rounded-full border border-success/20"
                    >
                        <FiCheckCircle className="text-5xl" />
                    </motion.div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight mb-2"
                >
                    Payment Successful!
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base text-base-content/60 mb-6 leading-relaxed"
                >
                    We appreciate your business! A confirmation email will be sent to{" "}
                    <span className="font-semibold text-base-content block sm:inline">{sessionData?.customerEmail}</span>.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="bg-base-200/50 border border-base-300 rounded-2xl p-4 mb-8 flex items-start gap-3 text-left"
                >
                    <FiMail className="text-xl text-base-content/40 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/40">Have Questions?</h4>
                        <p className="text-xs sm:text-sm text-base-content/70 leading-snug">
                            Feel free to reach our support team directly at{" "}
                            <a href="mailto:admin@sell-it.com" className="link link-primary font-medium group inline-flex items-center gap-0.5">
                                admin@sell-it.com
                                <FiArrowRight className="text-xs opacity-0 -translate-x-1 group-hover:opacity-1 group-hover:translate-x-0 transition-all" />
                            </a>
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                    <Link href="/products" className="btn btn-primary rounded-2xl font-bold gap-2">
                        <FiShoppingBag />
                        Marketplace
                    </Link>
                    <Link href="/" className="btn btn-outline border-base-300 hover:border-base-content rounded-2xl font-bold gap-2">
                        <FiHome />
                        Home Page
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccessPage;