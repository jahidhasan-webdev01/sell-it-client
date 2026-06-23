import { requireRole } from "@/lib/core/session";

const SellerDashboardLayout = async ({ children }) => {
    await requireRole("SELLER")
    return children;
};

export default SellerDashboardLayout;