'use client';

import PageHeading from '@/components/dashboard/PageHeading';
import { addProduct } from '@/lib/actions/products';
import { authClient } from '@/lib/auth-client';
import { uploadImage } from '@/utils/uploadImage';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiUploadCloud, FiPackage, FiDollarSign, FiLayers, FiInfo, FiTag } from 'react-icons/fi';

const AddProduct = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            toast.error('Please upload a product image');
            return;
        }

        const targetForm = e.target;
        const formData = new FormData(targetForm);
        const data = Object.fromEntries(formData.entries());

        try {
            setLoading(true);

            const imageData = new FormData();
            imageData.append("image", imageFile);
            const imageResult = await uploadImage(imageData);

            if (!imageResult?.data?.url) {
                toast.error("Failed to upload image. Please try again.");
                return;
            }

            const finalData = {
                title: data.title,
                category: data.category,
                condition: data.condition,
                price: parseFloat(data.price),
                stock: parseInt(data.stock, 10),
                description: data.description,
                image: imageResult.data.url,
                status: "PENDING",
                sellerInfo: {
                    userId: user?.id
                }
            };

            const result = await addProduct(finalData);

            if (result?.insertedId) {
                toast.success('Product submitted for review successfully!');

                targetForm.reset();
                setImageFile(null);
                setImagePreview(null);
            } else {
                toast.error(result.message || "Failed to create product listing");
            }

        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <PageHeading title="Add New Product Listing" subtitle="Fill in the detailed fields below to list your item on the marketplace." />
            <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm overflow-hidden">

                <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">

                    {/* Image Upload Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-base-content/80 flex items-center gap-1.5">
                            Product Media <span className="text-error">*</span>
                        </label>
                        <div className="flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed border-base-300 rounded-2xl bg-base-50/50 hover:bg-base-200/20 transition-all group relative overflow-hidden">
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
                                    <FiUploadCloud className="text-4xl text-base-content/30 group-hover:text-primary group-hover:scale-110 transition-all mb-2" />
                                    <span className="text-sm font-semibold text-base-content">Click to upload product image</span>
                                    <span className="text-xs text-base-content/50 mt-1">Supports PNG, JPG or JPEG</span>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        required
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Grid Layout for Title & Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Product Title */}
                        <div className="form-control md:col-span-2">
                            <label className="label pt-0">
                                <span className="label-text font-semibold text-base-content/80">Product Title <span className="text-error">*</span></span>
                            </label>
                            <div className="relative flex items-center">
                                <FiTag className="absolute left-4 text-base-content/40 text-lg" />
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. iPhone 15 Pro Max - 256GB"
                                    required
                                    className="input input-bordered w-full pl-11 rounded-xl bg-base-50/30 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Category Selection */}
                        <div className="form-control">
                            <label className="label pt-0">
                                <span className="label-text font-semibold text-base-content/80">Category <span className="text-error">*</span></span>
                            </label>
                            <div className="relative flex items-center">
                                <FiLayers className="absolute left-4 text-base-content/40 text-lg z-10" />
                                <select
                                    name="category"
                                    defaultValue=""
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

                        {/* Condition Selection */}
                        <div className="form-control">
                            <label className="label pt-0">
                                <span className="label-text font-semibold text-base-content/80">Item Condition <span className="text-error">*</span></span>
                            </label>
                            <div className="relative flex items-center">
                                <FiInfo className="absolute left-4 text-base-content/40 text-lg z-10" />
                                <select
                                    name="condition"
                                    defaultValue=""
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

                        {/* Price Input */}
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
                                    placeholder="0.00"
                                    required
                                    className="input input-bordered w-full pl-11 rounded-xl bg-base-50/30 focus:outline-none font-mono"
                                />
                            </div>
                        </div>

                        {/* Stock Quantity */}
                        <div className="form-control">
                            <label className="label pt-0">
                                <span className="label-text font-semibold text-base-content/80">Stock Quantity <span className="text-error">*</span></span>
                            </label>
                            <div className="relative flex items-center">
                                <FiPackage className="absolute left-4 text-base-content/40 text-lg" />
                                <input
                                    type="number"
                                    name="stock"
                                    min="1"
                                    placeholder="e.g. 5"
                                    required
                                    className="input input-bordered w-full pl-11 rounded-xl bg-base-50/30 focus:outline-none font-mono"
                                />
                            </div>
                        </div>

                        {/* Description Textarea */}
                        <div className="form-control md:col-span-2">
                            <label className="label pt-0">
                                <span className="label-text font-semibold text-base-content/80">Product Description <span className="text-error">*</span></span>
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                placeholder="Provide details regarding item specification, warranty features, functional performance, etc."
                                required
                                className="textarea textarea-bordered w-full rounded-xl p-4 bg-base-50/30 focus:outline-none text-sm leading-relaxed"
                            ></textarea>
                        </div>
                    </div>

                    {/* Form Action Controls */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-base-200">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary rounded-xl px-8 normal-case font-medium min-w-[140px]"
                        >
                            {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Publish Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;