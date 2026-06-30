"use server"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const confirmOrderAfterPayment = async (data) => {
    const response = await fetch(`${baseURL}/api/confirm-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return response.json();
}

export const updateOrderStatus = async (id, orderStatus) => {
    try {
        const response = await fetch(`${baseURL}/api/update-orders/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderStatus }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return { message: "Network error", error };
    }
};

export const updateOrderStatusBySeller = async (id, orderStatus) => {
    try {
        const response = await fetch(`${baseURL}/api/seller/update-orders/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderStatus }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, message: data?.message || "Server responded with an error", error: true };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, message: "Network error. Please try again.", error };
    }
};