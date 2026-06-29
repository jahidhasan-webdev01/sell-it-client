import { getUserSession } from "@/lib/core/session";
import PageHeading from "@/components/dashboard/PageHeading";
import { getMyOrders } from "@/lib/api/orders";
import OrderTable from "./OrderTable";

const MyOrders = async () => {
    const user = await getUserSession();

    const orders =  await getMyOrders(user?.id);

    return (
        <div>
            <PageHeading title="My Orders" subtitle="See the listing of your orders" />
            <OrderTable orders={orders} />
        </div>
    );
};

export default MyOrders;