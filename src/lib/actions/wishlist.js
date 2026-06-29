"use server"


const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addToWishlist = async (userId, productId) => {
    try {
        const response = await fetch(`${baseURL}/api/wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, productId }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const getWishlist = async (userId) => {
    try {
        const response = await fetch(`${baseURL}/api/wishlist?userId=${userId}`, {
            cache: 'no-store'
        });
        return await response.json();
    } catch (error) {
        return [];
    }
};