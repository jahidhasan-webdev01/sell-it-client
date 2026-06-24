const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllUsers = async () => {
    const response = await fetch(`${baseURL}/api/users`)

    return response.json()
}