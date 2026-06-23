import { requireRole } from "@/lib/core/session";

const BuyerDashboardLayout = async({ children }) => {
    await requireRole("BUYER")
    return children;
};

export default BuyerDashboardLayout;