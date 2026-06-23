import { requireRole } from "@/lib/core/session";

const AdminDashboardLayout = async ({ children }) => {
    await requireRole("ADMIN")
    return children;
};

export default AdminDashboardLayout;