const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getSellerProducts = async (userId) => {
    const response = await fetch(`${baseURL}/api/my-products?userId=${userId}`)

    return response.json() || [];
}

// For admin
export const getAllProducts = async () => {
    const response = await fetch(`${baseURL}/api/products`)

    return response.json() || [];
}