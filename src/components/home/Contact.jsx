'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, name: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Mocking API delay
        setTimeout(() => {
            toast.success("Message sent successfully!");
            setFormData({ name: '', email: '', message: '' });
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="bg-base-100 text-base-content min-h-screen relative overflow-hidden py-20 selection:bg-primary selection:text-primary-content">
            {/* Soft Ambient Background Orbs */}
            <div className="absolute top-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <motion.div 
                    className="text-center max-w-2xl mx-auto mb-16 space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Let’s Start a <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Conversation</span>
                    </h1>
                    <p className="text-sm sm:text-base text-base-content/60 leading-relaxed">
                        Have questions about our premium marketplace or integration setup? Drop us a message, and our engineering support team will reach out shortly.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Contact Information */}
                    <motion.div 
                        className="lg:col-span-5 space-y-6"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-gradient-to-b from-base-200/80 to-base-200/20 backdrop-blur-md p-8 rounded-3xl border border-base-300 shadow-sm space-y-8">
                            <h3 className="text-xl font-bold tracking-tight">Contact Information</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-11 h-11 rounded-xl bg-base-100 shadow border border-base-300 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <FiMail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/50 font-medium">Email Us</p>
                                        <a href="mailto:support@swiftcart.com" className="text-sm font-semibold hover:text-primary transition-colors">support@swiftcart.com</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-11 h-11 rounded-xl bg-base-100 shadow border border-base-300 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                                        <FiPhone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/50 font-medium">Call Infrastructure Support</p>
                                        <a href="tel:+880123456789" className="text-sm font-semibold hover:text-secondary transition-colors">+880 1234-56789</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-11 h-11 rounded-xl bg-base-100 shadow border border-base-300 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                        <FiMapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/50 font-medium">HQ Address</p>
                                        <p className="text-sm font-semibold">Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Help Glass Card */}
                        <div className="bg-primary/5 border border-primary/10 p-6 rounded-3xl flex items-start gap-4">
                            <FiMessageSquare className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-base-content">Looking for instant answers?</h4>
                                <p className="text-xs text-base-content/60 mt-1 leading-relaxed">
                                    Check our verified documentation page or developer API logs to skip the support queue entirely.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div 
                        className="lg:col-span-7"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="bg-gradient-to-b from-base-200/80 to-base-200/20 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-base-300 shadow-sm space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="form-control w-full">
                                    <label className="label py-1">
                                        <span className="label-text font-semibold text-xs text-base-content/70">Full Name</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe" 
                                        className="input input-bordered w-full rounded-xl bg-base-100/50 focus:outline-none focus:border-primary text-sm" 
                                        required
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label py-1">
                                        <span className="label-text font-semibold text-xs text-base-content/70">Email Address</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="johndoe@example.com" 
                                        className="input input-bordered w-full rounded-xl bg-base-100/50 focus:outline-none focus:border-primary text-sm" 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-control w-full">
                                <label className="label py-1">
                                    <span className="label-text font-semibold text-xs text-base-content/70">Your Message</span>
                                </label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={5}
                                    placeholder="Type your message here detailing your workflow queries..." 
                                    className="textarea textarea-bordered w-full rounded-xl bg-base-100/50 focus:outline-none focus:border-primary text-sm resize-none" 
                                    required
                                />
                            </div>

                            <motion.button 
                                type="submit" 
                                disabled={loading}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-primary w-full rounded-xl font-bold text-sm shadow-md shadow-primary/10 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <>
                                        Dispatch Message
                                        <FiSend className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;