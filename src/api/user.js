import { axiosClient } from ".";

const userAPI = {
    async login(data) {
        const response = await axiosClient.post("/login", data);
        console.log(response)
        return response;
    },
    async verify() {
        const response = await axiosClient.get("/verify");
        return response;
    },
    async register(data) {
        const response = await axiosClient.post("/register", data);
        return response;
    },
};

export default userAPI;