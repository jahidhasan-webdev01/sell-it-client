import { getWishlist } from "@/lib/actions/wishlist";
import WishListTable from "./WishListTable";
import { getUserSession } from "@/lib/core/session";

const MyWishlistPage = async () => {
    const user = await getUserSession()
    const wishlist = await getWishlist(user?.id);

    return <WishListTable wishlist={wishlist}/>;
};

export default MyWishlistPage;