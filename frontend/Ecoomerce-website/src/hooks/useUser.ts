import { api } from "@/api/AuthApi";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (token: string) => {
    const response = await api.get("/auth/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("response", response.data);
    return response.data;
};

export const useUser = (token: string) => {
    return useQuery({
        queryKey: ["user", token],
        queryFn: () => fetchUser(token),
        enabled: !!token,
        retry: 1,
    });
};