import { getAdminStats } from "@/lib/api/stats";
import { FiUsers, FiBox, FiShoppingBag } from "react-icons/fi";

const AdminHomePage = async () => {
    const statsData = await getAdminStats() || { totalUsers: 0, totalProducts: 0, totalOrders: 0 };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-base-content md:text-3xl">Admin Overview</h1>
                <p className="text-sm text-base-content/60">Real-time platform statistics and performance metrics.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="flex items-center justify-between p-6 bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-base-content/60 block">Total Users</span>
                        <span className="text-3xl font-bold font-mono tracking-tight block text-base-content">
                            {statsData.totalUsers?.toLocaleString() || 0}
                        </span>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/10 text-primary">
                        <FiUsers className="text-2xl" />
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-base-content/60 block">Total Products</span>
                        <span className="text-3xl font-bold font-mono tracking-tight block text-base-content">
                            {statsData.totalProducts?.toLocaleString() || 0}
                        </span>
                    </div>
                    <div className="p-4 rounded-xl bg-success/10 text-success">
                        <FiBox className="text-2xl" />
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-base-100 rounded-2xl border border-base-300 shadow-sm hover:shadow-md transition-all duration-200 sm:col-span-2 lg:col-span-1">
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-base-content/60 block">Total Orders</span>
                        <span className="text-3xl font-bold font-mono tracking-tight block text-base-content">
                            {statsData.totalOrders?.toLocaleString() || 0}
                        </span>
                    </div>
                    <div className="p-4 rounded-xl bg-warning/10 text-warning">
                        <FiShoppingBag className="text-2xl" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHomePage;