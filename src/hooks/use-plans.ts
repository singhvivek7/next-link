import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/helper/request";

export interface Plan {
    id: string;
    type: "BASIC" | "PRO" | "CUSTOM";
    name: string;
    description: string | null;
    price: number;
    currency: string;
    features: string[];
    limits: {
        urls: number;
        clicks: number;
    };
}

interface PlansResponse {
    success: boolean;
    data: Plan[];
}

async function fetchPlans(): Promise<Plan[]> {
    const response = await axiosInstance.get("/api/v1/plans");
    const result: PlansResponse = response.data;
    return result.data;
}

export function usePlans() {
    return useQuery({
        queryKey: ["plans"],
        queryFn: fetchPlans,
        staleTime: 1000 * 60 * 60, // 1 hour - plans don't change often
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
