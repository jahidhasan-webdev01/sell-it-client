'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} 
            whileHover={{ y: -4 }} 
            className="group bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden h-full"
        >
            <div className="aspect-square w-full bg-base-200 relative overflow-hidden">
                <Image
                    src={product.image || "https://i.ibb.co/YTtLPJ3B/Screenshot-2026-06-10-193933.png"}
                    alt={product.title || "Product item"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={false}
                />
                {product.category && (
                    <span className="absolute top-3 left-3 bg-base-100/90 backdrop-blur-md text-base-content font-semibold text-xs px-2.5 py-1 rounded-lg border border-base-300 capitalize shadow-sm">
                        {product.category}
                    </span>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="font-bold text-base-content text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
                        {product.title}
                    </h2>
                    {product.description && (
                        <p className="text-xs text-base-content/50 line-clamp-2">
                            {product.description}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-base-200">
                    <span className="text-base font-extrabold font-mono text-base-content">
                        {product.price} <span className="text-xs font-sans font-medium text-base-content/70">BDT</span>
                    </span>

                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Link
                            href={`/products/${product._id}`}
                            className="btn btn-primary btn-sm rounded-full px-4 font-semibold text-xs shadow-sm"
                        >
                            Details
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;