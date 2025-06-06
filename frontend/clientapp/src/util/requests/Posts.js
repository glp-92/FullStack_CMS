import { FetchWithAuth } from "./FetchWithAuth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const GetPostList = async (page, criteria) => {
    let postListResponse = null;
    try {
        let url = `${backendUrl}/posts?page=${page}`;
        if (criteria !== null) {
            url += criteria;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GetPostsError: ${response.statusText}`);
        }
        postListResponse = await response.json();
    } catch (error) {
        console.log(error)
    }
    return postListResponse;
};

export const getPost = async (postSlug) => {
    let postData = null;
    try {
        const url = `${backendUrl}/posts/${postSlug}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GetPostDataError: ${response.statusText}`);
        }
        postData = await response.json();
    } catch (error) {
        console.log(error)
    }
    return postData;
}

export const SavePost = async (method, postData) => {
    let url = `${backendUrl}/posts`
    if (method === "PUT") url = `${backendUrl}/posts/${postData.postId}`
    return await FetchWithAuth(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
};

export const DeletePost = async (postId) => {
    return await FetchWithAuth(`${backendUrl}/posts/${postId}`, {
        method: "DELETE"
    });
};