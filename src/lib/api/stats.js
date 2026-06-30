const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAdminStats = async () => {
    const response = await fetch(`${baseURL}/api/admin/dashboard-stats`)

    return response.json();
}

export const getBuyerStats = async (userId) => {
    const response = await fetch(`${baseURL}/api/buyer/dashboard-stats?userId=${userId}`)

    return response.json();
}