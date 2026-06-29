'use client';

import { motion } from 'framer-motion';

const StatsGrid = ({ cards }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12, 
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.4, ease: "easeOut" } 
        }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
            {cards.map((card, idx) => (
                <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover={{ scale: 1.015, y: -2 }} 
                    className={`flex items-center justify-between p-6 bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-200 ${card.customClass || ''}`}
                >
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-base-content/60 block">{card.label}</span>
                        <span className="text-3xl font-bold font-mono tracking-tight block text-base-content">
                            {card.value}
                        </span>
                    </div>
                    <div className={`p-4 rounded-xl ${card.bgColor}`}>
                        {card.icon}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default StatsGrid;