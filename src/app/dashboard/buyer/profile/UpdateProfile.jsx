'use client';

import React, { useState } from 'react';
import { FiUser, FiUploadCloud, FiCheck } from 'react-icons/fi';

const UpdateProfile = ({ user }) => {
    const [name, setName] = useState(user?.name || '');
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            if (imageFile) {
                formData.append('image', imageFile); 
            }

            
            console.log("Form Data Prepared");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="w-full space-y-4 bg-base-100 p-6 rounded-2xl border border-base-300/70">
            <div className="form-control w-full">
                <label className="label py-1">
                    <span className="label-text font-bold text-xs text-base-content/60 uppercase tracking-wider flex items-center gap-1">
                        <FiUser className="w-3.5 h-3.5" /> Full Name
                    </span>
                </label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
                    className="input input-bordered input-sm sm:input-md w-full rounded-xl bg-base-200/30 focus:outline-none focus:border-primary text-sm"
                    required
                />
            </div>

            <div className="form-control w-full">
                <label className="label py-1">
                    <span className="label-text font-bold text-xs text-base-content/60 uppercase tracking-wider flex items-center gap-1">
                        <FiUploadCloud className="w-3.5 h-3.5" /> Upload Profile Image
                    </span>
                </label>
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="file-input file-input-bordered file-input-sm sm:file-input-md w-full rounded-xl bg-base-200/30 text-sm focus:outline-none focus:border-primary"
                />
            </div>

            <div className="flex justify-end pt-2">
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-primary btn-sm rounded-full px-6 font-bold text-xs shadow-md shadow-primary/10 inline-flex items-center gap-1.5"
                >
                    {isSubmitting ? (
                        <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                        <>
                            <FiCheck className="w-4 h-4" /> Save Changes
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default UpdateProfile;