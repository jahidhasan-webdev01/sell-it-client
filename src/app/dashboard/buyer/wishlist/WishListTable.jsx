"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import EmptyState from "@/components/empty/EmptyState";
import Link from "next/link";

const WishListTable = ({ wishlist }) => {
    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-base-content">My Wishlist</h1>
                <p className="text-sm text-base-content/60 mt-1">Manage all your saved premium items in one place.</p>
            </div>

            <div className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
                {wishlist.length < 1 ? (
                    <EmptyState message="Your wishlist is empty" />
                ) : (
                    <div className="w-full max-w-full overflow-x-auto block">
                        <table className="table table-zebra w-full min-w-[500px] table-auto border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-base-200/80 text-base-content/80 shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
                                    <th className="w-24 bg-inherit">Image</th>
                                    <th className="bg-inherit">Product Name</th>
                                    <th className="w-40 bg-inherit">Price</th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={tableVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {wishlist.map((item) => {
                                    const product = item.productDetails || {};
                                    return (
                                        <motion.tr
                                            key={item._id}
                                            variants={rowVariants}
                                            className="hover:bg-base-200/30 transition-colors align-middle"
                                        >
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
                                                <div className="font-semibold text-sm text-base-content truncate max-w-[300px]" title={product.title}>
                                                    <Link href={`/products/${item.productId}`}>{product.title || "Unknown Product"}</Link>
                                                </div>
                                            </td>

                                            <td className="text-sm font-mono font-bold text-base-content/90">
                                                {product.price ? `${product.price} BDT` : "N/A"}
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </motion.tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishListTable;