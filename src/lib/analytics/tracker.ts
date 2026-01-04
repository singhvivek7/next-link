import client from "@/lib/helper/db";
import { loggers } from "@/lib/logger";

import type { TrackClickPayload } from "./types";

const logger = loggers.analytics;

/**
 * Track a click event - Direct database write (no event emitter)
 * This is a fire-and-forget operation that won't block the response
 */
export async function trackClick(payload: TrackClickPayload): Promise<void> {
    // Run in background, don't await
    setImmediate(async () => {
        try {
            logger.info({
                shortUrl: payload.shortUrl,
                ip: payload.ip
            }, 'Tracking click');

            // Find the URL
            const url = await client.url.findUnique({
                where: { short_url: payload.shortUrl },
                select: { id: true }
            });

            if (!url) {
                logger.warn({ shortUrl: payload.shortUrl }, 'URL not found for tracking');
                return;
            }

            // Parse device info and get location (if available)
            let deviceInfo = {};
            if (payload.userAgent) {
                const { parseUserAgent, getLocationFromIP } = await import('./device-parser');
                const parsed = parseUserAgent(payload.userAgent);
                deviceInfo = {
                    device: parsed.device,
                    browser: parsed.browser,
                    os: parsed.os,
                };

                // Get location (with timeout, won't block)
                if (payload.ip && payload.ip !== 'unknown') {
                    try {
                        const location = await getLocationFromIP(payload.ip);
                        if (location.country) {
                            deviceInfo = { ...deviceInfo, ...location };
                        }
                    } catch (error) {
                        // Location is optional, continue without it
                        logger.debug('Failed to get location, continuing without it');
                    }
                }
            }

            // Create click record
            const click = await client.click.create({
                data: {
                    url_id: url.id,
                    ip_address: payload.ip,
                    user_agent: payload.userAgent,
                    referer: payload.referer,
                    ...deviceInfo,
                }
            });

            logger.info({
                shortUrl: payload.shortUrl,
                clickId: click.id
            }, 'Click tracked successfully');

        } catch (error) {
            logger.error({
                err: error,
                shortUrl: payload.shortUrl
            }, 'Failed to track click');
        }
    });
}

/**
 * Track a click with retry logic
 */
export async function trackClickWithRetry(
    payload: TrackClickPayload,
    maxRetries = 3
): Promise<void> {
    let attempts = 0;

    const attemptTrack = async (): Promise<void> => {
        try {
            const url = await client.url.findUnique({
                where: { short_url: payload.shortUrl },
                select: { id: true }
            });

            if (!url) {
                logger.warn({ shortUrl: payload.shortUrl }, 'URL not found');
                return;
            }

            await client.click.create({
                data: {
                    url_id: url.id,
                    ip_address: payload.ip,
                    user_agent: payload.userAgent,
                    referer: payload.referer
                }
            });

            logger.info({ shortUrl: payload.shortUrl }, 'Click tracked');
        } catch (error) {
            attempts++;
            if (attempts < maxRetries) {
                logger.warn({
                    shortUrl: payload.shortUrl,
                    attempt: attempts
                }, 'Retrying click tracking');

                // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 100));
                return attemptTrack();
            }

            logger.error({
                err: error,
                shortUrl: payload.shortUrl,
                attempts
            }, 'Failed to track click after retries');
        }
    };

    // Run in background
    setImmediate(attemptTrack);
}

/**
 * Batch track multiple clicks (useful for bulk operations)
 */
export async function trackClicksBatch(payloads: TrackClickPayload[]): Promise<void> {
    try {
        const results = await Promise.allSettled(
            payloads.map(payload => trackClickWithRetry(payload, 1))
        );

        const failed = results.filter(r => r.status === 'rejected').length;
        if (failed > 0) {
            logger.warn({ total: payloads.length, failed }, 'Some clicks failed to track');
        }
    } catch (error) {
        logger.error({ err: error }, 'Batch tracking failed');
    }
}
