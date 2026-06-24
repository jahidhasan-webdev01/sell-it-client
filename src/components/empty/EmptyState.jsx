'use client';

import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ 
    title = "No Data Found", 
    description = "There are no records available right now. Get started by creating a new entry."
}) => {
    return (
        <div className="w-full flex flex-col items-center justify-center min-h-120 p-8 text-center bg-base-100 rounded-2xl border-2 border-dashed border-base-300">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-base-200 text-base-content/30 mb-5 relative group transition-all duration-300 hover:scale-105 hover:bg-primary/5 hover:text-primary">
                    <FiInbox className="text-4xl stroke-[1.5]" />
                <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-5 blur-xl transition-opacity" />
            </div>

            <div className="max-w-sm space-y-2 mb-6">
                <h3 className="text-xl font-bold text-base-content tracking-tight">
                    {title}
                </h3>
                <p className="text-sm text-base-content/60 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default EmptyState;