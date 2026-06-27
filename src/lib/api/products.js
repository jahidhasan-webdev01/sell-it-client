const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllProductsForAll = async () => {
    const response = await fetch(`${baseURL}/api/products`)

    return response.json() || [];
}

export const getProductDetails = async (productId) => {
    const response = await fetch(`${baseURL}/api/product-details?productId=${productId}`)

    return response.json() || [];
}

export const getSellerProducts = async (userId) => {
    const response = await fetch(`${baseURL}/api/my-products?userId=${userId}`)

    return response.json() || [];
}

// For admin
export const getAllProducts = async () => {
    const response = await fetch(`${baseURL}/api/admin/products`)

    return response.json() || [];
}