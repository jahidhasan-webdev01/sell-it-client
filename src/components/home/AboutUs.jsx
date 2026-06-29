'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiActivity, FiArrowRight } from 'react-icons/fi';

const AboutUs = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.7, ease: [0.215, 0.610, 0.355, 1.000] }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const coreValues = [
        {
            icon: <FiTarget className="w-6 h-6 text-primary" />,
            title: "Our Mission",
            description: "Empowering next-gen digital commerce through lightning-fast, secure, and user-first architecture.",
            gradient: "from-primary/20 via-transparent to-transparent"
        },
        {
            icon: <FiEye className="w-6 h-6 text-secondary" />,
            title: "Our Vision",
            description: "Building an immutable, transparent ecosystem where premium quality and absolute trust coexist seamlessly.",
            gradient: "from-secondary/20 via-transparent to-transparent"
        },
        {
            icon: <FiActivity className="w-6 h-6 text-accent" />,
            title: "Our Core Philosophy",
            description: "Crafting beautiful interactive experiences while ensuring deep infrastructure stability and logic safety.",
            gradient: "from-accent/20 via-transparent to-transparent"
        }
    ];

    return (
        <div className="bg-base-100 text-base-content min-h-screen overflow-hidden relative selection:bg-primary selection:text-primary-content">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-4 pt-20 pb-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
                <motion.div 
                    className="flex-1 space-y-8 z-10 text-center lg:text-left"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="inline-flex items-center gap-2 bg-base-200 border border-base-300 px-4 py-1.5 rounded-full shadow-inner">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-base-content/80">Crafting Premium Experiences</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
                        We Build the Future of <br className="hidden sm:inline"/>
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Digital Retail Aesthetics
                        </span>
                    </h1>

                    <p className="text-base-content/70 leading-relaxed text-base max-w-2xl mx-auto lg:mx-0">
                        Welcome to a space where modern development practices mesh seamlessly with premium design aesthetics. We create reliable client-server architecture built around full transparency, ultra-low latency, and perfect visual responsiveness.
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <button className="btn btn-primary rounded-full px-6 shadow-lg shadow-primary/20 group">
                            Explore Marketplace
                            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button className="btn btn-ghost rounded-full border border-base-300 bg-base-200/50 backdrop-blur-md px-6">
                            Read Our Story
                        </button>
                    </div>
                </motion.div>

                {/* Interactive Premium Image Holder */}
                <motion.div 
                    className="flex-1 w-full relative group max-w-[540px] aspect-square"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="w-full h-full relative rounded-[2rem] overflow-hidden border border-base-300/60 shadow-2xl bg-base-200">
                        <Image
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                            alt="Premium Aesthetics"
                            fill
                            priority
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Overlay Glass Card */}
                        <div className="absolute bottom-6 left-6 right-6 bg-base-100/70 backdrop-blur-xl border border-base-100/50 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-primary tracking-wide uppercase">Verified Integrity</p>
                                <p className="text-base font-extrabold text-base-content mt-0.5">100% Authentic Selection</p>
                            </div>
                            <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                                <div className="avatar w-8 h-8 border-2 border-base-100 rounded-full bg-base-300"></div>
                                <div className="avatar w-8 h-8 border-2 border-base-100 rounded-full bg-base-300"></div>
                                <div className="avatar w-8 h-8 border-2 border-base-100 rounded-full bg-base-300"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Values / Features Grid */}
            <section className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {coreValues.map((value, index) => (
                        <motion.div 
                            key={index} 
                            variants={fadeInUp}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="relative bg-gradient-to-b from-base-200/60 to-base-200/20 backdrop-blur-md p-8 rounded-3xl border border-base-300/80 shadow-sm overflow-hidden group flex flex-col justify-between"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            
                            <div className="space-y-5 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-base-100 shadow-md border border-base-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-base-content group-hover:text-primary transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-base-content/60 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default AboutUs;