import { getAllOrdersForAdmin } from "@/lib/api/orders";
import ManageOrdersTable from "./ManageOrdersTable";

const ManageOrdersPage = async () => {
    const orders = await getAllOrdersForAdmin();
    return <ManageOrdersTable orders={orders}/>;
};

export default ManageOrdersPage;