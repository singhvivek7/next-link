import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";

import { axiosInstance } from "@/lib/helper/request";
import { queryKeys } from "@/query-keys";

interface IUpdateLink {
    id: string;
    data: {
        is_active: boolean;
    };
}

export const useUpdateLink = () => {
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError<any>, IUpdateLink>({
        mutationFn: async ({ id, data }) => {
            const response = await axiosInstance.patch(`/api/v1/links/${id}`, data)
            return response.data
        },
        onSuccess: () => {
            toast.success("Link updated successfully");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.LINKS],
            });
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Something went wrong");
        }
    });
}