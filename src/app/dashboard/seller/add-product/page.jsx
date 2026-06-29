import { getAllCategories } from "@/lib/api/categories";
import AddProductForm from "./AddProductForm";

const AddProductPage = async () => {
    const categories = await getAllCategories();

    return (
        <AddProductForm categories={categories}/>
    );
};

export default AddProductPage;