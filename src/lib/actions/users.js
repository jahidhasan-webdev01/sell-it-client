"use server"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const updateUserStatus = async (userId, newStatus) => {
    const response = await fetch(`${baseURL}/api/user/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    });

    return response.json();
}

export const deleteUser = async (userId) => {
    const response = await fetch(`${baseURL}/api/user/${userId}`, {
        method: 'DELETE',
    });

    return response.json();
}