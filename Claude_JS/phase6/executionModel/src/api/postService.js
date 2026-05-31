import { apiClient } from "./apiClient.js";

export const postService = {
    getById(id) {
        return apiClient.get(`/posts/${id}`);
    },

    getAll() {
        return apiClient.get("/posts");
    },

    create(postData) {
        return apiClient.post("/posts", postData);
    },

    delete(id) {
        return apiClient.delete(`/posts/${id}`);
    }
};