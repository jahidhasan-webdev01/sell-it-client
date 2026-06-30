'use client';

import { motion } from 'framer-motion';
import EmptyState from '@/components/empty/EmptyState'; 
import ProductCard from '@/components/shared/ProductCard';

const CategoryProducts = ({ products = [] }) => {
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    if (products.length === 0) {
        return (
            <div className="w-full mt-8 flex flex-col items-center gap-6">
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
                <ProductCard 
                    key={product._id} 
                    product={product} 
                />
            ))}
        </motion.div>
    );
};

export default CategoryProducts;