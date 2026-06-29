"use server"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const savePaymentInfo = async (data) => {
    const response = await fetch(`${baseURL}/api/payment/success`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return response.json();
}