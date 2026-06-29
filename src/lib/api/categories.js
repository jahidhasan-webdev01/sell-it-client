const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllCategories = async () => {
    const response = await fetch(`${baseURL}/api/categories`)

    return response.json() || [];
}
