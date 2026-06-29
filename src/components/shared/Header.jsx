import { getAllCategories } from "@/lib/api/categories";
import Navbar from "./Navbar";

const Header = async () => {
    const categories = await getAllCategories();

    return (
        <Navbar categories={categories}/>
    );
};

export default Header;