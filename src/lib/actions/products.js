"use server"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addProduct = async (finalData) => {
    const response = await fetch(`${baseURL}/api/add-products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
    });

    return response.json();
}