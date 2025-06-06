import { FetchWithAuth } from "./FetchWithAuth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const GetCategories = async () => {
    try {
        const response = await fetch(`${backendUrl}/categories`);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const GetCategoriesPageable = async (page, perPage) => {
    try {
        let url = `${backendUrl}/categories?page=${page}`;
        if (perPage) {
            url += `&perpage=${perPage}`
        }
        const response = await fetch(url);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const CreateCategory = async (newCategory) => {
    const payload = {
        name: newCategory,
        slug: newCategory
    };
    return await FetchWithAuth(`${backendUrl}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
};

export const DeleteCategory = async (categoryId) => {
    return await FetchWithAuth(`${backendUrl}/categories/${categoryId}`, {
        method: "DELETE"
    });
};

export const UpdateCategory = async (category) => {
    return await FetchWithAuth(`${backendUrl}/categories/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });
};