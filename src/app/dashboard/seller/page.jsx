import { FiBox, FiShoppingBag, FiDollarSign, FiClock } from 'react-icons/fi';
import StatsGrid from "../admin/StatsGrid";

const SellerHomePage = async () => {
    // const statsData = await getSellerStats() || { totalProducts: 0, totalSales: 0, totalRevenue: 0, pendingOrders: 0 };
    const statsData = { totalProducts: 25, totalSales: 10, totalRevenue: 85400, pendingOrders: 5 };

    const sellerCards = [
        {
            label: "Total Products",
            value: statsData.totalProducts?.toLocaleString() || 0,
            icon: <FiBox className="text-2xl" />,
            bgColor: "bg-primary/10 text-primary",
        },
        {
            label: "Total Sales",
            value: statsData.totalSales?.toLocaleString() || 0,
            icon: <FiShoppingBag className="text-2xl" />,
            bgColor: "bg-success/10 text-success",
        },
        {
            label: "Total Revenue",
            value: `${statsData.totalRevenue?.toLocaleString() || 0} BDT`,
            icon: <FiDollarSign className="text-2xl" />,
            bgColor: "bg-info/10 text-info",
        },
        {
            label: "Pending Orders",
            value: statsData.pendingOrders?.toLocaleString() || 0,
            icon: <FiClock className="text-2xl" />,
            bgColor: "bg-error/10 text-error",
        }
    ];

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-base-content md:text-3xl">Seller Overview</h1>
                <p className="text-sm text-base-content/60">Real-time store statistics.</p>
            </div>
            <StatsGrid cards={sellerCards} />
        </div>
    );
};

export default SellerHomePage;