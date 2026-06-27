import PageHeading from "@/components/dashboard/PageHeading";
import EmptyState from "@/components/empty/EmptyState";

import { getAllProducts } from "@/lib/api/products";
import ProductsTable from "./ProductsTable";

const ManageProductsPage = async () => {
    const products = await getAllProducts();

    return (
        <div className="space-y-6">
            <PageHeading 
                title="Manage Products" 
                subtitle="Monitor active listings, adjust prices, alter stock counts, or remove items." 
            />

            {products.length < 1 ? (
                <EmptyState message="No products available to manage." />
            ) : (
                <ProductsTable products={products} />
            )}
        </div>
    );
};

export default ManageProductsPage;