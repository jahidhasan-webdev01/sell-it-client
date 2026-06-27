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

export const updateProduct = async (data, productId) => {
    const response = await fetch(`${baseURL}/api/update-product?productId=${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    return response.json();
}

export const deleteProduct = async (productId) => {
    const response = await fetch(`${baseURL}/api/delete-product?productId=${productId}`, {
        method: 'DELETE'
    });

    return response.json();
}