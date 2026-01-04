import { PLAN_LIMITS } from "@/lib/constant/plan.constant";
import { ApiError } from "@/lib/helper/async-handler";
import client from "@/lib/helper/db";

export const checkUrlLimit = async (userId: string) => {
    // 1. Get user's plan
    const user = await client.user.findUnique({
        where: { id: userId },
        select: { plan: true }
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const userPlan = user.plan || "BASIC";
    const limit = PLAN_LIMITS[userPlan]?.urls || PLAN_LIMITS.BASIC.urls;

    if (limit === Infinity) return true;

    // 2. Count current URLs
    const count = await client.url.count({
        where: { user_id: userId }
    });

    // 3. Check if limit reached
    if (count >= limit) {
        throw new ApiError(403, `Plan limit reached. You can only create ${limit} links on the ${userPlan} plan. Please upgrade to create more.`);
    }

    return true;
};
