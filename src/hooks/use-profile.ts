import { useQuery } from "@tanstack/react-query"

import { axiosInstance } from "@/lib/helper/request";
import { queryKeys } from "@/query-keys"
import { IProfileData } from "@/types/profile.type"

export const useProfile = (options?: { retry?: boolean | number }) => {
    const data = useQuery<IProfileData>({
        queryKey: [queryKeys.PROFILE],
        queryFn: async () => {
            const response = await axiosInstance.get("/api/v1/profile")
            return response.data
        },
        ...options
    });

    return data;
};
