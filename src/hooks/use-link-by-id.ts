import { useQuery } from "@tanstack/react-query"

import { axiosInstance } from "@/lib/helper/request";
import { queryKeys } from "@/query-keys";
import { ILink } from "@/types/links.types";

export const useLinkById = (id: string, options: { enabled?: boolean } = {}) => {
    return useQuery<{
        message: string;
        data: ILink;
    }>({
        queryKey: [queryKeys.LINK, id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/links/${id}`)
            return response.data
        },
        enabled: !!id && (options.enabled !== undefined ? options.enabled : true)
    });
}