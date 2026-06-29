const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllCategories = async () => {
    const response = await fetch(`${baseURL}/api/categories`, {
        cache: "no-store",
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("Categories API Error:", response.status, text);
        return [];
    }

    return response.json();
};
