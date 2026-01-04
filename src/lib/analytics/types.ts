export const ANALYTICS_EVENTS = {
    TRACK_VIEW: 'TRACK_VIEW',
} as const;

export interface TrackViewPayload {
    shortUrl: string;
    originalUrl: string;
    ip?: string;
    userAgent?: string;
    referer?: string;
    country?: string;
    city?: string;
    device?: string;
    os?: string;
    browser?: string;
    timestamp: Date;
}
