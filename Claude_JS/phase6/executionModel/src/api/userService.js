import { apiClient } from "./apiClient.js";

export const userService = {
    getById(id) {
        return apiClient.get(`/users/${id}`);
    },

    getAll() {
        return apiClient.get("/users");
    },

    create(userData) {
        return apiClient.post("/users", userData);
    },

    update(id, userData) {
        return apiClient.put(`/users/${id}`, userData);
    },

    updateEmail(id, email) {
        return apiClient.patch(`/users/${id}`, { email });
    },

    delete(id) {
        return apiClient.delete(`/users/${id}`);
    },

    getPosts(userId) {
        return apiClient.get(`/users/${userId}/posts`);
    }
};