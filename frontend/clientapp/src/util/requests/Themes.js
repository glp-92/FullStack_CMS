import { FetchWithAuth } from "./FetchWithAuth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const GetThemes = async () => {
    try {
        const response = await fetch(`${backendUrl}/themes`);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const GetThemesPageable = async (page, perPage) => {
    try {
        let url = `${backendUrl}/themes?page=${page}`;
        if (perPage) {
            url += `&perpage=${perPage}`
        }
        const response = await fetch(url);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const CreateTheme = async (themeData) => {
    return await FetchWithAuth(`${backendUrl}/themes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(themeData)
    });
};

export const DeleteTheme = async (themeId) => {
    return await FetchWithAuth(`${backendUrl}/themes/${themeId}`, {
        method: "DELETE"
    });
};

export const UpdateTheme = async (themeData) => {
    return await FetchWithAuth(`${backendUrl}/themes/${themeData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(themeData)
    });
};