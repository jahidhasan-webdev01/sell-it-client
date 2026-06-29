import { getAdminStats } from "@/lib/api/stats";
import { FiUsers, FiBox, FiShoppingBag } from 'react-icons/fi';
import StatsGrid from "./StatsGrid";

const AdminHomePage = async () => {
    const statsData = await getAdminStats() || { totalUsers: 0, totalProducts: 0, totalOrders: 0 };

    const adminCards = [
        {
            label: "Total Users",
            value: statsData.totalUsers?.toLocaleString() || 0,
            icon: <FiUsers className="text-2xl" />,
            bgColor: "bg-primary/10 text-primary",
        },
        {
            label: "Total Products",
            value: statsData.totalProducts?.toLocaleString() || 0,
            icon: <FiBox className="text-2xl" />,
            bgColor: "bg-success/10 text-success",
        },
        {
            label: "Total Orders",
            value: statsData.totalOrders?.toLocaleString() || 0,
            icon: <FiShoppingBag className="text-2xl" />,
            bgColor: "bg-warning/10 text-warning",
        }
    ];

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-base-content md:text-3xl">Admin Overview</h1>
                <p className="text-sm text-base-content/60">Real-time platform statistics.</p>
            </div>
            <StatsGrid cards={adminCards} />
        </div>
    );
};

export default AdminHomePage;