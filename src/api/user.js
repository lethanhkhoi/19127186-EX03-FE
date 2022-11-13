import { axiosClient } from ".";
import { useMutation, useQuery } from "react-query";
export const useLogin = () => {
    // const response = await axiosClient.post("/login", data);
    // return response;
    return useMutation((data) => axiosClient.post("/login", data))
}
export const verify = async () => {
    const response = await axiosClient.get("/verify");
    return response;
}

export const useRegister = () => {
    // const response = await axiosClient.post("/register", data);
    // return response;
    return useMutation((data) => axiosClient.post("/register", data))
}
export const useProfile = () => {
    return useQuery(["profile"], () => axiosClient.get("/profile"));
};


