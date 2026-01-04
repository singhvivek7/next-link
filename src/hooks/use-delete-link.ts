import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { axiosInstance } from "@/lib/helper/request";
import { queryKeys } from "@/query-keys";

export const useDeleteLink = () => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<any>, any>({
        mutationFn: async (id: string) => {
            const response = await axiosInstance.delete(`/api/v1/links/${id}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Link deleted successfully");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.LINKS],
            });
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Failed to delete link");
        },
    });
};
