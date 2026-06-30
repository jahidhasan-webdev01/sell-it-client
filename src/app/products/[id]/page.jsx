"use client";

import React, { useEffect, useState } from "react";
import { getProductDetails } from "@/lib/api/products";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiShoppingBag, FiTag, FiTruck, FiCornerUpLeft, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import EmptyState from "@/components/empty/EmptyState";

const ProductDetailsPage = ({ params }) => {
    const { data: session } = authClient.useSession();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const resolvedParams = await params;
                const data = await getProductDetails(resolvedParams.id);
                setProduct(data || null);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <EmptyState />
            </div>
        );
    }

    const checkoutPayload = {
        productId: product?._id,
        title: product?.title,
        price: product?.price,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        sellerId: product?.sellerInfo?.userId
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-primary transition-colors group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Back to all products
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-base-100 border border-base-300 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="aspect-square w-full bg-base-200 relative rounded-2xl overflow-hidden border border-base-200 group/img"
                >
                    <Image
                        src={product.image || "https://i.ibb.co/YTtLPJ3B/Screenshot-2026-06-10-193933.png"}
                        alt={product.title || "Product details listing"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                        priority
                    />
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col justify-between py-2"
                >
                    <div className="space-y-6">
                        <motion.div variants={fadeInUp} className="space-y-3">
                            {product.category && (
                                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-xl uppercase tracking-wider border border-primary/20">
                                    <FiTag />
                                    {product.category}
                                </div>
                            )}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-base-content tracking-tight leading-tight">
                                {product.title}
                            </h1>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-3xl lg:text-4xl font-black font-mono text-base-content border-b border-base-200 pb-4 flex items-baseline gap-1">
                            {product.price?.toLocaleString()} <span className="text-sm font-sans font-semibold text-base-content/60">BDT</span>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/40">Description</h3>
                            <p className="text-base-content/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                {product.description || "No description provided for this listing."}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-b border-base-200/60 py-4 my-2">
                            <div className="flex items-center gap-2.5 text-sm font-medium text-base-content/70">
                                <FiShield className="text-xl text-success" />
                                <span>Verified Authentic</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm font-medium text-base-content/70">
                                <FiTruck className="text-xl text-info" />
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm font-medium text-base-content/70">
                                <FiCornerUpLeft className="text-xl text-warning" />
                                <span>7-Day Returns</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeInUp} className="mt-8 lg:mt-0 pt-6 border-t border-base-200">
                        <form action="/api/checkout_sessions" method="POST">
                            <input type="hidden" name="orderPayload" value={JSON.stringify(checkoutPayload)} />
                            <section>
                                <motion.button
                                    type="submit"
                                    role="link"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="btn btn-primary btn-md sm:btn-lg w-full rounded-2xl font-bold shadow-lg hover:shadow-xl gap-3 text-sm sm:text-base relative overflow-hidden transition-all duration-300"
                                >
                                    <FiShoppingBag className="text-lg" />
                                    Checkout
                                </motion.button>
                            </section>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;