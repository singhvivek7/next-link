export const PLAN_LIMITS = {
    BASIC: {
        urls: 10,
        clicks: 1000
    },
    PRO: {
        urls: 100,
        clicks: 10000
    },
    CUSTOM: {
        urls: Infinity,
        clicks: Infinity
    }
} as const;
