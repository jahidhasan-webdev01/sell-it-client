import { getProductsByCategory } from "@/lib/api/categories";
import CategoryProducts from "./CategoryProducts";

const CategoriesPage = async ({ params }) => {
    const data = await params;
    const products = await getProductsByCategory(data?.slug) || [];

    // স্ল্যাগটিকে ক্যাপিটালাইজ করে টাইটেল বানানোর জন্য (e.g., smart-phone -> Smart Phone)
    const categoryTitle = data?.slug
        ? data.slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        : "Category";

    return (
        <div className="bg-base-100 min-h-screen text-base-content selection:bg-primary selection:text-primary-content">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 border-b border-base-200 pb-5">
                    <h1 className="text-3xl font-extrabold tracking-tight">{categoryTitle}</h1>
                    <p className="text-sm text-base-content/60 mt-1">
                        Found {products.length} {products.length === 1 ? 'item' : 'items'} in this category
                    </p>
                </div>

                {/* Client Component for Animation & Grid */}
                <CategoryProducts products={products} />
            </div>
        </div>
    );
};

export default CategoriesPage;