import { getProductDetails } from "@/lib/api/products";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiShoppingBag, FiCheckCircle, FiTag } from "react-icons/fi";

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params;
    const product = await getProductDetails(id) || null;

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-base-content/80">Product Not Found</h2>
                <p className="text-base-content/50 mt-2">The listing you are looking for does not exist or has been removed.</p>
                <Link href="/products" className="btn btn-primary rounded-xl mt-6">
                    <FiArrowLeft /> Back to Marketplace
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-primary transition-colors group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                    Back to all products
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-base-100 border border-base-300 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
                <div className="aspect-square w-full bg-base-200 relative rounded-2xl overflow-hidden border border-base-200">
                    <Image
                        src={product.image || "https://i.ibb.co/YTtLPJ3B/Screenshot-2026-06-10-193933.png"}
                        alt={product.title || "Product details listing"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="flex flex-col justify-between py-2">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            {product.category && (
                                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-xl uppercase tracking-wider">
                                    <FiTag />
                                    {product.category}
                                </div>
                            )}
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-base-content tracking-tight">
                                {product.title}
                            </h1>
                        </div>

                        <div className="text-3xl font-black font-mono text-base-content border-b border-base-200 pb-4">
                            {product.price} <span className="text-sm font-sans font-semibold text-base-content/60">BDT</span>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/40">Description</h3>
                            <p className="text-base-content/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                {product.description || "No description provided for this listing."}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-success bg-success/10 px-3 py-1.5 rounded-xl border border-success/20">
                                <FiCheckCircle /> Verified Listing
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-base-content/70 bg-base-200 px-3 py-1.5 rounded-xl border border-base-300">
                                ID: <span className="font-mono">{product._id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-base-200">
                        <button className="btn btn-primary btn-md sm:btn-lg w-full rounded-2xl font-bold shadow-md hover:shadow-lg gap-2 text-sm sm:text-base">
                            <FiShoppingBag className="text-lg" />
                            Purchase Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;