const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyOrders = async (userId) => {
    const response = await fetch(`${baseURL}/api/my-orders?userId=${userId}`)

    return response.json() || [];
}

export const getAllOrdersForAdmin = async () => {
    const response = await fetch(`${baseURL}/api/orders`)

    return response.json() || [];
}

export const getAllOrdersForSeller = async (userId) => {
    const response = await fetch(`${baseURL}/api/seller/orders?userId=${userId}`)

    return response.json() || [];
}

