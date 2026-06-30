'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiTag } from 'react-icons/fi';
import EmptyState from '@/components/empty/EmptyState'; 
const CategoryProducts = ({ products = [] }) => {
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] } 
        }
    };

    if (products.length === 0) {
        return (
            <div className="w-full max-w-2xl mx-auto mt-8 flex flex-col items-center gap-6">
                <EmptyState 
                    title="No Products Found"
                    description="We couldn't find any pre-owned or re-sell items listed under this category right now. Check back later or explore other sections."
                />
            </div>
        );
    }

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
            {products.map((product) => (
                <motion.div
                    key={product._id}
                    variants={cardVariants}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden group relative"
                >
                    <div className="aspect-[4/3] w-full bg-base-200 relative overflow-hidden">
                        <Image
                            src={product.image || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop"}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {product.condition && (
                            <span className="absolute top-3 left-3 badge badge-sm bg-base-100/80 backdrop-blur-md text-base-content font-bold py-2.5 px-3 rounded-lg border border-base-300/40 shadow-sm">
                                <FiTag className="w-3 h-3 mr-1 text-primary" /> {product.condition}
                            </span>
                        )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="font-bold text-base-content text-base line-clamp-1 group-hover:text-primary transition-colors">
                                {product.title}
                            </h3>
                            <p className="text-xs text-base-content/50 line-clamp-2 leading-relaxed">
                                {product.subtitle || product.description || "No description provided."}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-base-200 mt-auto">
                            <span className="text-lg font-extrabold font-mono text-base-content tracking-tight">
                                {Number(product.price).toLocaleString()} <span className="text-xs font-sans font-medium text-base-content/60">BDT</span>
                            </span>

                            <Link
                                href={`/products/${product._id}`}
                                className="btn btn-primary btn-sm rounded-full px-4 font-bold text-xs shadow-sm shadow-primary/10"
                            >
                                View Deal
                            </Link>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CategoryProducts;