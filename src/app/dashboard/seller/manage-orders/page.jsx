import { getAllOrdersForSeller } from "@/lib/api/orders";
import { getUserSession } from "@/lib/core/session";
import SellerOrdersClient from "./SellerOrdersClient";
import { FiShoppingBag } from "react-icons/fi";

export const metadata = {
    title: "Dashboard | Manage Orders",
};

const ManageOrdersPage = async () => {
    const user = await getUserSession();
    const orders = await getAllOrdersForSeller(user?.id) || [];

    return (
        <div className="w-full min-h-screen py-8 bg-base-100">
            <div className="w-full px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-300/60 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black tracking-tight text-base-content flex items-center gap-2">
                            <FiShoppingBag className="text-primary" /> Manage Orders
                        </h1>
                        <p className="text-sm text-base-content/50">Handle incoming customer orders and track fulfillment status.</p>
                    </div>
                    <div className="badge badge-neutral font-mono py-3 px-4 rounded-xl border-base-300">
                        Total {orders.length} Orders
                    </div>
                </div>

                {/* Client Side Table & Logic */}
                <SellerOrdersClient initialOrders={orders} />
            </div>
        </div>
    );
};

export default ManageOrdersPage;