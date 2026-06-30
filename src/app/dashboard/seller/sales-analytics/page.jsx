"use client";

import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { motion } from "framer-motion";

const monthlySalesTrend = [
    { month: "Jan", Sales: 15000, Target: 12000 },
    { month: "Feb", Sales: 19000, Target: 14000 },
    { month: "Mar", Sales: 22000, Target: 16000 },
    { month: "Apr", Sales: 26000, Target: 20000 },
    { month: "May", Sales: 31000, Target: 25000 },
    { month: "Jun", Sales: 42000, Target: 30000 },
];

const topSellingProducts = [
    { name: "Wireless Earbuds", UnitsSold: 1200, Revenue: 48000 },
    { name: "Smart Watch", UnitsSold: 950, Revenue: 66500 },
    { name: "Mechanical Keyboard", UnitsSold: 800, Revenue: 40000 },
    { name: "Ergonomic Chair", UnitsSold: 600, Revenue: 90000 },
    { name: "USB-C Hub", UnitsSold: 1500, Revenue: 30000 },
];

const sellerPerformanceMetrics = [
    { subject: "Sales Volume", A: 110, B: 130, fullMark: 150 },
    { subject: "Order Fulfillment", A: 130, B: 120, fullMark: 150 },
    { subject: "Customer Rating", A: 140, B: 145, fullMark: 150 },
    { subject: "Dispute Rate", A: 40, B: 20, fullMark: 150 },
    { subject: "Response Time", A: 120, B: 90, fullMark: 150 },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const SalesAnalytics = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sales Analytics</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Visual representation of merchant performance, growth velocity, and inventory movement across the market.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {[
                    { label: "Gross Merchandise Value", value: "$155,000", change: "+18.2%", color: "text-blue-600" },
                    { label: "Items Shipped", value: "5,050", change: "+12.4%", color: "text-emerald-600" },
                    { label: "Avg Order Value", value: "$30.69", change: "+4.1%", color: "text-indigo-600" }
                ].map((kpi, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ scale: 1.015 }}
                        className="p-5 bg-white rounded-xl shadow-sm border border-gray-200"
                    >
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{kpi.label}</p>
                        <p className={`text-2xl font-bold mt-2 ${kpi.color}`}>{kpi.value}</p>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">
                            {kpi.change} Last 30 Days
                        </span>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                <motion.div variants={itemVariants} className="p-5 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-md font-bold text-gray-800 mb-4">Monthly Sales Trend</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlySalesTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} formatter={(v) => `$${v}`} />
                                <Tooltip formatter={(value) => [`$${value}`, ""]} />
                                <Legend />
                                <Line type="monotone" dataKey="Sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="Target" stroke="#d1d5db" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-5 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-md font-bold text-gray-800 mb-4">Top Selling Products</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topSellingProducts} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                                <Tooltip formatter={(value, name) => [name === "Revenue" ? `$${value}` : value, name]} />
                                <Legend />
                                <Bar dataKey="UnitsSold" name="Units Sold" fill="#10b981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Revenue" name="Revenue ($)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
                    <h3 className="text-md font-bold text-gray-800 mb-2">Seller Cohort Performance Analysis</h3>
                    <p className="text-xs text-gray-400 mb-4">Comparing operational dimensions between Tier-A merchants and Tier-B merchants.</p>
                    <div className="h-80 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" radius="70%" data={sellerPerformanceMetrics}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: '#9ca3af' }} />
                                <Radar name="Top Tier Sellers (A)" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                                <Radar name="Average Sellers (B)" dataKey="B" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
                                <Legend verticalAlign="bottom" />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SalesAnalytics;