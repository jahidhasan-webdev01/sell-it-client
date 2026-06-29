const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getPaymentHistory = async (userId) => {
    try {
        const response = await fetch(`${baseURL}/api/payment-history?userId=${userId}`, {
            cache: 'no-store'
        });
        return await response.json();
    } catch (error) {
        return [];
    }
};