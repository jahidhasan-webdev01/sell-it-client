"use client"

import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";

const ProductTable = ({ products, handleStatusChange, handleDeleteProduct }) => {
    return (
        <div className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
            <div className="w-full max-w-full overflow-x-auto max-h-[calc(100vh-220px)] overflow-y-auto block">
                <table className="table table-zebra w-full min-w-[900px] table-auto border-separate border-spacing-0">
                    <thead className="sticky top-0 z-10 bg-base-100">
                        <tr className="bg-base-200/80 backdrop-blur-sm text-base-content/80 shadow-[0_1px_0_0_rgba(0,0,0,0.1)]">
                            <th className="w-20 bg-inherit">Image</th>
                            <th className="w-52 bg-inherit">Product Title</th>
                            <th className="w-32 bg-inherit">Category</th>
                            <th className="w-28 bg-inherit">Condition</th>
                            <th className="w-28 bg-inherit">Price</th>
                            <th className="w-24 bg-inherit">Stock</th>
                            <th className="w-36 bg-inherit">Status Control</th>
                            <th className="w-20 text-center bg-inherit">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-12 text-base-content/50 font-medium">
                                    No products found in database.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="hover:bg-base-200/30 transition-colors align-middle">
                                    <td>
                                        <div className="avatar">
                                            <div className="w-12 h-12 rounded-xl bg-base-300 relative overflow-hidden ring-1 ring-base-content/5">
                                                <Image
                                                    src={product.image || "https://i.ibb.co/YTtLPJ3B/Screenshot-2026-06-10-193933.png"}
                                                    alt={product.title || "Product image"}
                                                    fill
                                                    sizes="48px"
                                                    className="object-cover"
                                                    priority={false}
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    <td className="font-semibold text-sm max-w-[200px] truncate">
                                        {product.title}
                                    </td>
                                    
                                    <td className="text-sm font-medium text-base-content/80 capitalize">
                                        {product.category}
                                    </td>
                                    
                                    <td>
                                        <span className={`badge badge-sm font-bold tracking-wide ${
                                            product.condition === 'New' ? 'badge-success bg-success/10 text-success border-success/20' : 
                                            product.condition === 'Like New' ? 'badge-primary bg-primary/10 text-primary border-primary/20' : 'badge-ghost'
                                        }`}>
                                            {product.condition || 'Used'}
                                        </span>
                                    </td>

                                    <td className="text-sm font-mono font-semibold text-base-content/90">
                                        {product.price} BDT
                                    </td>

                                    <td className="text-sm font-mono text-base-content/70">
                                        {product.stock ?? 0}
                                    </td>

                                    <td>
                                        <select
                                            value={product.status || "PENDING"}
                                            onChange={(e) => handleStatusChange(product._id, e.target.value)}
                                            className={`select select-bordered select-xs w-28 font-bold rounded-lg transition-all focus:outline-none ${
                                                product.status === "APPROVED" ? "text-success border-success/30 bg-success/5" :
                                                product.status === "BLOCKED" ? "text-error border-error/30 bg-error/5" :
                                                "text-warning border-warning/30 bg-warning/5"
                                            }`}
                                        >
                                            <option value="PENDING" className="text-warning bg-base-100 font-semibold">PENDING</option>
                                            <option value="APPROVED" className="text-success bg-base-100 font-semibold">APPROVED</option>
                                            <option value="BLOCKED" className="text-error bg-base-100 font-semibold">BLOCKED</option>
                                        </select>
                                    </td>

                                    <td className="text-center">
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            className="btn btn-ghost btn-sm text-error hover:bg-error/10 btn-square rounded-xl"
                                            title="Delete Product listing"
                                        >
                                            <FiTrash2 className="text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;