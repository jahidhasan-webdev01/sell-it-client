import { getSellerProducts } from "@/lib/api/products";
import { getUserSession } from "@/lib/core/session";
import ProductTable from "./ProductTable";

const MyProducts = async() => {
    const user = await getUserSession();
    const products = await getSellerProducts(user?.id);

    return (
        <div>
            <h1>MY PRODUCTS</h1>
            <ProductTable products={products}/>
        </div>
    );
};

export default MyProducts;