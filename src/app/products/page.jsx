import PageHeading from "@/components/dashboard/PageHeading";
import EmptyState from "@/components/empty/EmptyState";
import ProductCard from "@/components/shared/ProductCard";
import { getAllProductsForAll } from "@/lib/api/products";
import Image from "next/image";
import Link from "next/link";

const ProductsPage = async () => {
    const products = await getAllProductsForAll() || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <PageHeading
                title="Our Marketplace"
                subtitle="Browse through our collection of premium, verified products handpicked for you."
            />

            {products.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => <ProductCard key={index} product={product}/>)}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;