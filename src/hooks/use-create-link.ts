import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { axiosInstance } from "@/lib/helper/request";
import { queryKeys } from "@/query-keys";

interface CreateLinkPayload {
    url: string;
}

interface CreateLinkResponse {
    status: string;
    message: string;
    data: {
        short_url: string;
        original_url: string;
    }
}

export const useCreateLink = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateLinkResponse, AxiosError<any>, CreateLinkPayload>({
        mutationFn: async (payload) => {
            const response = await axiosInstance.post("/api/v1/short-urls", payload);

            return response.data;
        },
        onSuccess: () => {
            toast.success("Link created successfully");
            queryClient.invalidateQueries({ queryKey: [queryKeys.LINKS] });
        },
        onError: (err) => {
            toast.error(err.response?.data.message || "Failed to create link");
        },
    });
};
