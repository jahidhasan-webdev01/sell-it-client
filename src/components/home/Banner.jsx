'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiTag } from 'react-icons/fi';

const carouselItems = [
    {
        _id: "1",
        title: "MacBook Pro M2 Max (32GB/1TB)",
        subtitle: "Professional Grade. Flawless Condition. Handled with extreme care.",
        price: "2,45,000",
        condition: "Like New",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop"
    },
    {
        _id: "2",
        title: "Sony FX3 Cinema Camera",
        subtitle: "Used for 2 short films only. Complete box with original invoice available.",
        price: "3,10,000",
        condition: "Excellent",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop"
    },
    {
        _id: "3",
        title: "iPhone 15 Pro - 256GB Black",
        subtitle: "Battery Health 98%. Apple international warranty remaining.",
        price: "98,500",
        condition: "Mint",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1600&auto=format&fit=crop"
    }
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
        exit: (dir) => ({
            x: dir < 0 ? '100%' : '-100%',
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        })
    };

    const currentProduct = carouselItems[currentIndex];

    return (
        <div className="w-full h-[480px] sm:h-[580px] md:h-[620px] bg-base-200 overflow-hidden group relative border-b border-base-300">
            
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center"
                >
                    {/* Content Section aligned with max-w-7xl */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                            <div className="max-w-xl space-y-4 sm:space-y-6 pointer-events-auto pt-[240px] md:pt-0">
                                
                                <motion.div 
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-bold text-xs px-3.5 py-1.5 rounded-full w-fit border border-primary/20"
                                >
                                    <FiTag className="w-3.5 h-3.5" /> Condition: {currentProduct.condition}
                                </motion.div>
                                
                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-3xl sm:text-5xl md:text-6xl font-black text-base-content tracking-tight leading-none"
                                >
                                    {currentProduct.title}
                                </motion.h1>
                                
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-sm sm:text-base text-base-content/60"
                                >
                                    {currentProduct.subtitle}
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-center gap-6 pt-2"
                                >
                                    <div className="text-2xl sm:text-3xl font-black text-base-content font-mono tracking-tight">
                                        {currentProduct.price} <span className="text-sm font-sans font-medium text-base-content/60">BDT</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Image Layer */}
                    <div className="w-full h-full relative flex-1 order-1 md:order-2">
                        <Image
                            src={currentProduct.image}
                            alt={currentProduct.title}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-base-200 via-base-200/40 to-transparent md:from-base-200 md:via-base-200/80 md:to-transparent" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Indicator Dots - Centered Perfectly */}
            <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center pointer-events-none">
                <div className="flex items-center gap-2.5 bg-base-100/30 backdrop-blur-sm px-4 py-2 rounded-full border border-base-100/20 pointer-events-auto">
                    {carouselItems.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-base-content/40 hover:bg-base-content/70'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;