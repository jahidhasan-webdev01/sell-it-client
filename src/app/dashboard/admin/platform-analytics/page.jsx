"use client";

import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { motion } from "framer-motion";

const userGrowthData = [
    { month: "Jan", Users: 4000 },
    { month: "Feb", Users: 4500 },
    { month: "Mar", Users: 5100 },
    { month: "Apr", Users: 6200 },
    { month: "May", Users: 7800 },
    { month: "Jun", Users: 9500 },
];

const monthlyOrdersData = [
    { month: "Jan", Orders: 240, Revenue: 12000 },
    { month: "Feb", Orders: 300, Revenue: 15000 },
    { month: "Mar", Orders: 350, Revenue: 18000 },
    { month: "Apr", Orders: 480, Revenue: 24000 },
    { month: "May", Orders: 540, Revenue: 29000 },
    { month: "Jun", Orders: 720, Revenue: 38000 },
];

const categoryPerformanceData = [
    { name: "Electronics", Sales: 4000, Profit: 2400 },
    { name: "Fashion", Sales: 3000, Profit: 1398 },
    { name: "Home & Living", Sales: 2000, Profit: 9800 },
    { name: "Beauty", Sales: 2780, Profit: 3908 },
];

const topCategoriesData = [
    { name: "Electronics", value: 40 },
    { name: "Fashion", value: 30 },
    { name: "Home & Living", value: 20 },
    { name: "Beauty", value: 10 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const PlatformAnalytics = () => {
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Platform Analytics</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Overall business insights regarding platform growth, user activity, product performance, and revenue trends.
                </p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {[
                    { label: "Total Users", value: "9,500", change: "+22% MoM", color: "text-blue-600" },
                    { label: "Monthly Orders", value: "720", change: "+33% MoM", color: "text-emerald-600" },
                    { label: "Total Revenue", value: "$38,000", change: "+31% MoM", color: "text-amber-600" },
                    { label: "Active Disputes", value: "2", change: "-40% WoW", color: "text-rose-600" }
                ].map((kpi, idx) => (
                    <motion.div 
                        key={idx} 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="p-5 bg-white rounded-xl shadow-sm border border-gray-200"
                    >
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{kpi.label}</p>
                        <p className={`text-2xl font-bold mt-2 ${kpi.color}`}>{kpi.value}</p>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">
                            {kpi.change}
                        </span>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                <motion.div variants={itemVariants} className="p-5 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-md font-bold text-gray-800 mb-4">User Growth Trend</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-5 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-md font-bold text-gray-800 mb-4">Monthly Orders & Revenue</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyOrdersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                                <Tooltip formatter={(value, name) => [name === "Revenue" ? `$${value}` : value, name]} />
                                <Legend />
                                <Bar dataKey="Orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-5 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-md font-bold text-gray-800 mb-4">Category Sales vs Profitability</h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                                <Tooltip formatter={(value) => [`$${value}`, ""]} />
                                <Legend />
                                <Bar dataKey="Sales" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-5 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-md font-bold text-gray-800 mb-4">Top Categories Shares (%)</h3>
                    <div className="h-72 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={topCategoriesData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {topCategoriesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default PlatformAnalytics;