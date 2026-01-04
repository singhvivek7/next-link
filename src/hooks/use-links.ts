import { useQuery } from "@tanstack/react-query"

import { axiosInstance } from "@/lib/helper/request";
import { queryKeys } from "@/query-keys";
import { ILinks } from "@/types/links.types";

export const useLinks = (page: number = 1, limit: number = 10) => {
    return useQuery<ILinks>({
        queryKey: [queryKeys.LINKS, page, limit],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/links?page=${page}&limit=${limit}`)
            return response.data
        }
    });
}