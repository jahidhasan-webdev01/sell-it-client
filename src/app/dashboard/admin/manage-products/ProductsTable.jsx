"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { deleteProductByAdmin, updateProductStatus } from "@/lib/actions/products";
import { motion, AnimatePresence } from "framer-motion";

const ProductsTable = ({ products: initialProducts }) => {
    const [products, setProducts] = useState(initialProducts);
    const [updatingId, setUpdatingId] = useState(null);

    const handleStatusChange = async (productId, newStatus) => {
        setUpdatingId(productId);
        try {
            const result = await updateProductStatus(productId, newStatus);

            if (result?.matchedCount) {
                setProducts(prev => 
                    prev.map(p => p._id === productId ? { ...p, status: newStatus } : p)
                );
                toast.success(`Status updated to ${newStatus}`);
            } else {
                toast.error(result.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Network or server communication failure.");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to permanently delete this listing?")) return;

        try {
            const result = await deleteProductByAdmin(productId);
            if (result?.deletedCount > 0) {
                setProducts(prev => prev.filter(p => p._id !== productId));
                toast.success("Product permanently deleted.");
            } else {
                toast.error(result.message || "Could not delete item.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting.");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.04 }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
        exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
    };

    return (
        <div className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table className="table w-full min-w-[800px] table-auto border-separate border-spacing-0">
                    <thead className="bg-base-200/80 sticky top-0 z-10">
                        <tr className="text-base-content/80">
                            <th>Product Details</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status Actions</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <motion.tbody
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-12 text-base-content/50 font-medium">
                                    No products listed in database.
                                </td>
                            </tr>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {products.map((product) => (
                                    <motion.tr 
                                        key={product._id} 
                                        variants={rowVariants}
                                        layout
                                        exit="exit"
                                        className="hover:bg-base-200/20 align-middle"
                                    >
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar w-12 h-12 rounded-xl bg-base-300 relative overflow-hidden">
                                                    <Image 
                                                        src={product.image || "https://i.ibb.co/YTtLPJ3B/Screenshot-2026-06-10-193933.png"} 
                                                        alt={product.title || "Product image"} 
                                                        fill 
                                                        sizes="48px"
                                                        className="object-cover" 
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm max-w-[220px] truncate">{product.title}</div>
                                                    <div className="text-xs text-base-content/40">ID: {product._id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-sm capitalize font-medium text-base-content/80">{product.category}</td>
                                        <td className="text-sm font-mono font-semibold text-base-content/90">{product.price} BDT</td>
                                        <td>
                                            <select
                                                value={product.status || "PENDING"}
                                                disabled={updatingId === product._id}
                                                onChange={(e) => handleStatusChange(product._id, e.target.value)}
                                                className={`select select-bordered select-sm rounded-xl font-bold focus:outline-none transition-colors duration-200 ${
                                                    product.status === "APPROVED" ? "border-success text-success bg-success/5" :
                                                    product.status === "REJECTED" ? "border-error text-error bg-error/5" :
                                                    "border-warning text-warning bg-warning/5"
                                                }`}
                                            >
                                                <option value="PENDING" className="text-warning bg-base-100 font-medium">Pending</option>
                                                <option value="APPROVED" className="text-success bg-base-100 font-medium">Approve</option>
                                                <option value="REJECTED" className="text-error bg-base-100 font-medium">Reject</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(product._id)}
                                                    className="btn btn-ghost btn-sm text-error hover:bg-error/10 btn-square rounded-xl"
                                                    title="Delete Listing Permanently"
                                                >
                                                    <FiTrash2 className="text-lg" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        )}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductsTable;