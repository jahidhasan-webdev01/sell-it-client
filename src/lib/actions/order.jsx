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