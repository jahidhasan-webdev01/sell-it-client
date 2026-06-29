import { getSellerProducts } from "@/lib/api/products";
import { getUserSession } from "@/lib/core/session";
import ProductTable from "./ProductTable";
import PageHeading from "@/components/dashboard/PageHeading";

const MyProducts = async () => {
    const user = await getUserSession();
    const products = await getSellerProducts(user?.id) || [];

    return (
        <div>
            <PageHeading title="My Products" subtitle="Manage and edit your marketplace listing specifications below." />
            <ProductTable products={products} />
        </div>
    );
};

export default MyProducts;