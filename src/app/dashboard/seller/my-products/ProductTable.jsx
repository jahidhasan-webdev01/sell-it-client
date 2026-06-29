"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    FiEdit3,
    FiTrash2,
    FiX,
    FiUploadCloud,
    FiTag,
    FiLayers,
    FiInfo,
    FiDollarSign,
    FiPackage,
    FiCheck
} from "react-icons/fi";
import { uploadImage } from "@/utils/uploadImage";
import toast from "react-hot-toast";
import { deleteProduct, updateProduct } from "@/lib/actions/products";
import EmptyState from "@/components/empty/EmptyState";

const ProductTable = ({ products: initialProducts }) => {
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: "",
        category: "",
        condition: "",
        price: "",
        stock: "",
        description: ""
    });

    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setImagePreview(product.image || null);
        setImageFile(null);
        setEditFormData({
            title: product.title || "",
            category: product.category || "",
            condition: product.condition || "",
            price: product.price || "",
            stock: product.stock || "",
            description: product.description || ""
        });
    };

    const handleCloseModal = () => {
        setEditingProduct(null);
        setImagePreview(null);
        setImageFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const hasChanges = () => {
        if (!editingProduct) return false;

        const isTitleChanged = editFormData.title !== (editingProduct.title || "");
        const isCategoryChanged = editFormData.category !== (editingProduct.category || "");
        const isConditionChanged = editFormData.condition !== (editingProduct.condition || "");
        const isPriceChanged = Number(editFormData.price) !== Number(editingProduct.price || 0);
        const isStockChanged = Number(editFormData.stock) !== Number(editingProduct.stock || 0);
        const isDescriptionChanged = editFormData.description !== (editingProduct.description || "");
        const isImageChanged = imageFile !== null;

        return (
            isTitleChanged ||
            isCategoryChanged ||
            isConditionChanged ||
            isPriceChanged ||
            isStockChanged ||
            isDescriptionChanged ||
            isImageChanged
        );
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingProduct) return;

        if (!imagePreview) {
            toast.error("A product image is mandatory.");
            return;
        }

        if (!hasChanges()) {
            toast.error("No changes detected compared to previous data.");
            return;
        }

        setLoading(true);

        try {
            let finalImageUrl = editingProduct.image;

            if (imageFile) {
                const imageData = new FormData();
                imageData.append("image", imageFile);
                const imageResult = await uploadImage(imageData);

                if (!imageResult || !imageResult?.data?.url) {
                    toast.error("Something went wrong with the image upload.");
                    return;
                }
                finalImageUrl = imageResult.data.url;
            }

            const updatedPayload = {
                title: editFormData.title,
                category: editFormData.category,
                condition: editFormData.condition,
                price: Number(editFormData.price),
                stock: Number(editFormData.stock),
                description: editFormData.description,
                image: finalImageUrl,
                status: "PENDING"
            };

            const response = await updateProduct(updatedPayload, editingProduct?._id);

            if (response) {
                setProducts(prevProducts =>
                    prevProducts.map(p =>
                        p._id === editingProduct._id ? { ...p, ...updatedPayload } : p
                    )
                );
                toast.success("Product updated successfully.");
                handleCloseModal();
            }
        } catch (error) {
            toast.error("Failed to update product.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to permanently delete this product listing?");
        if (!confirmDelete) return;

        try {
            const result = await deleteProduct(productId);

            if (result?.success || result?.deletedCount > 0) {
                setProducts(prev => prev.filter(p => p._id !== productId));
                toast.success("Product has been deleted successfully.");
            } else {
                toast.error("Product could not be deleted.");
            }
        } catch (error) {
            toast.error("Failed to delete product.");
        }
    };

    return (
        <div className="w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
            {products.length < 1 ? (
                <EmptyState />
            ) : (
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
                                <th className="w-36 bg-inherit">Status</th>
                                <th className="w-24 text-center bg-inherit">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
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
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold text-sm max-w-[200px] truncate">{product.title}</td>
                                    <td className="text-sm font-medium text-base-content/80 capitalize">{product.category}</td>
                                    <td>
                                        <span className={`badge badge-sm font-bold tracking-wide ${product.condition === 'New' ? 'badge-success bg-success/10 text-success border-success/20' :
                                            product.condition === 'Like New' ? 'badge-primary bg-primary/10 text-primary border-primary/20' : 'badge-ghost'
                                            }`}>
                                            {product.condition || 'Used'}
                                        </span>
                                    </td>
                                    <td className="text-sm font-mono font-semibold text-base-content/90">{product.price} BDT</td>
                                    <td className="text-sm font-mono text-base-content/70">{product.stock ?? 0}</td>
                                    <td>
                                        <span className={`badge font-bold rounded-lg text-xs tracking-wider px-3 py-2 ${product.status === "APPROVED" ? "bg-success/10 text-success border-success/20" :
                                            product.status === "BLOCKED" ? "bg-error/10 text-error border-error/20" :
                                                "bg-warning/10 text-warning border-warning/20"
                                            }`}>
                                            {product.status || "PENDING"}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => handleEditClick(product)}
                                                className="btn btn-ghost btn-sm text-info hover:bg-info/10 btn-square rounded-xl"
                                                title="Edit Product Details"
                                            >
                                                <FiEdit3 className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="btn btn-ghost btn-sm text-error hover:bg-error/10 btn-square rounded-xl"
                                                title="Delete Product Listing"
                                            >
                                                <FiTrash2 className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editingProduct && (
                <div className="modal modal-open backdrop-blur-sm transition-all z-50">
                    <div className="modal-box border border-base-300 max-w-2xl rounded-2xl shadow-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between border-b border-base-200 px-6 py-4 bg-base-100">
                            <h3 className="font-bold text-lg text-base-content flex items-center gap-2">
                                <FiEdit3 className="text-info" /> Update Listing Modifications
                            </h3>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="btn btn-sm btn-ghost btn-square rounded-xl"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-6 lg:p-8 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-base-content/80 flex items-center gap-1.5">
                                    Product Media <span className="text-error">*</span>
                                </label>
                                <div className={`flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed rounded-2xl bg-base-50/50 hover:bg-base-200/20 transition-all group relative overflow-hidden ${!imagePreview ? "border-error/40" : "border-base-300"}`}>
                                    {imagePreview ? (
                                        <div className="w-full h-full min-h-[200px] relative flex items-center justify-center p-4">
                                            <Image
                                                width={200}
                                                height={200}
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-h-[180px] rounded-xl object-contain shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setImagePreview(null)}
                                                className="absolute top-3 right-3 btn btn-circle btn-xs btn-error shadow-md"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-full p-6 cursor-pointer">
                                            <FiUploadCloud className="text-4xl text-error group-hover:scale-110 transition-all mb-2" />
                                            <span className="text-sm font-semibold text-base-content">Click to upload product image *</span>
                                            <span className="text-xs text-base-content/50 mt-1">Image selection is strictly required</span>
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                required
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control md:col-span-2">
                                    <label className="label pt-0">
                                        <span className="label-text font-semibold text-base-content/80">Product Title <span className="text-error">*</span></span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiTag className="absolute left-4 text-base-content/40 text-lg" />
                                        <input
                                            type="text"
                                            name="title"
                                            value={editFormData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g. iPhone 15 Pro Max - 256GB"
                                            required
                                            className="input input-bordered w-full pl-11 rounded-xl bg-base-50/30 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pt-0">
                                        <span className="label-text font-semibold text-base-content/80">Category <span className="text-error">*</span></span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiLayers className="absolute left-4 text-base-content/40 text-lg z-10" />
                                        <select
                                            name="category"
                                            value={editFormData.category}
                                            onChange={handleInputChange}
                                            required
                                            className="select select-bordered w-full pl-11 rounded-xl bg-base-50/30 focus:outline-none font-medium"
                                        >
                                            <option value="" disabled>Select Category</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="gadgets">Gadgets & Accessories</option>
                                            <option value="fashion">Fashion & Apparel</option>
                                            <option value="home">Home Appliances</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pt-0">
                                        <span className="label-text font-semibold text-base-content/80">Item Condition <span className="text-error">*</span></span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiInfo className="absolute left-4 text-base-content/40 text-lg z-10" />
                                        <select
                                            name="condition"
                                            value={editFormData.condition}
                                            onChange={handleInputChange}
                                            required
                                            className="select select-bordered w-full pl-11 rounded-xl bg-base-50/30 focus:outline-none font-medium"
                                        >
                                            <option value="" disabled>Select Condition</option>
                                            <option value="New">Brand New</option>
                                            <option value="Like New">Like New</option>
                                            <option value="Used">Used</option>
                                            <option value="Refurbished">Refurbished</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pt-0">
                                        <span className="label-text font-semibold text-base-content/80">Price (BDT) <span className="text-error">*</span></span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiDollarSign className="absolute left-4 text-base-content/40 text-lg" />
                                        <input
                                            type="number"
                                            name="price"
                                            min="1"
                                            value={editFormData.price}
                                            onChange={handleInputChange}
                                            placeholder="0.00"
                                            required
                                            className="input input-bordered w-full pl-11 rounded-xl bg-base-50/30 focus:outline-none font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label pt-0">
                                        <span className="label-text font-semibold text-base-content/80">Stock Quantity <span className="text-error">*</span></span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <FiPackage className="absolute left-4 text-base-content/40 text-lg" />
                                        <input
                                            type="number"
                                            name="stock"
                                            min="0"
                                            value={editFormData.stock}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 5"
                                            required
                                            className="input input-bordered w-full pl-11 rounded-xl bg-base-50/30 focus:outline-none font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label pt-0">
                                        <span className="label-text font-semibold text-base-content/80">Product Description <span className="text-error">*</span></span>
                                    </label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        value={editFormData.description}
                                        onChange={handleInputChange}
                                        placeholder="Provide details regarding item specification..."
                                        required
                                        className="textarea textarea-bordered w-full rounded-xl p-4 bg-base-50/30 focus:outline-none text-sm leading-relaxed"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-base-200">
                                <button
                                    type="submit"
                                    disabled={loading || !hasChanges() || !imagePreview}
                                    className="btn btn-primary rounded-xl px-8 normal-case font-medium min-w-[150px] gap-2 disabled:bg-base-300 disabled:text-base-content/40"
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : !hasChanges() ? (
                                        "No Changes"
                                    ) : (
                                        <>
                                            <FiCheck className="text-base" /> Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTable;