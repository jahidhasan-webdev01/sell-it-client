import { getUserSession } from "@/lib/core/session";
import UserDashboardStats from "./UserDashboardStats";
import { getBuyerStats } from "@/lib/api/stats";

const BuyerHomePage = async () => {
    const user = await getUserSession();
    const statsData = await getBuyerStats(user?.id);

    return <UserDashboardStats statsData={statsData}/>;
};

export default BuyerHomePage;