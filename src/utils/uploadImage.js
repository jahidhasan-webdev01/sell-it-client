export const uploadImage = async (imageData) => {
    const imageRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
            method: "POST",
            body: imageData,
        }
    );

    const imageResult = await imageRes.json();

    return imageResult;
}