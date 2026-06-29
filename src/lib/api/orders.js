const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyOrders = async (userId) => {
    const response = await fetch(`${baseURL}/api/my-orders?userId=${userId}`)

    return response.json() || [];
}