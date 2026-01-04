import client from "@/lib/helper/db";
import { loggers } from "@/lib/logger";

import { analyticsEmitter } from "./emitter";
import { ANALYTICS_EVENTS, TrackViewPayload } from "./types";

const logger = loggers.analytics;

// Test database connection
async function testDatabaseConnection() {
    try {
        await client.$connect();
        logger.info('Database connection successful');
        return true;
    } catch (error) {
        logger.error({ err: error }, 'Database connection failed');
        return false;
    }
}

// Run connection test
testDatabaseConnection();

// Initialize analytics listener
function initializeAnalyticsListener() {
    // Use a symbol to track if listener is registered
    const LISTENER_KEY = Symbol.for('analytics_listener_registered');
    const globalAny = global as any;

    if (!globalAny[LISTENER_KEY]) {
        analyticsEmitter.on(ANALYTICS_EVENTS.TRACK_VIEW, async (payload: TrackViewPayload) => {
            try {
                logger.info({
                    shortUrl: payload.shortUrl,
                    ip: payload.ip,
                    userAgent: payload.userAgent,
                    referer: payload.referer
                }, 'View tracked');

                // Find the URL first to get its ID with timeout
                logger.debug({ shortUrl: payload.shortUrl }, 'Looking up URL');

                const urlPromise = client.url.findUnique({
                    where: { short_url: payload.shortUrl },
                    select: { id: true }
                });

                // Add 5 second timeout
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Database query timeout')), 5000)
                );

                const url = await Promise.race([urlPromise, timeoutPromise]) as { id: string } | null;

                if (!url) {
                    logger.warn({ shortUrl: payload.shortUrl }, 'URL not found');
                    return;
                }

                logger.debug({ shortUrl: payload.shortUrl, urlId: url.id }, 'Found URL');

                // Record the click with timeout
                logger.debug({ urlId: url.id }, 'Creating click record');

                const clickPromise = client.click.create({
                    data: {
                        url_id: url.id,
                        ip_address: payload.ip,
                        user_agent: payload.userAgent,
                        referer: payload.referer
                    }
                });

                const click = await Promise.race([clickPromise, timeoutPromise]) as any;

                logger.info({
                    shortUrl: payload.shortUrl,
                    clickId: click.id,
                    urlId: url.id
                }, 'Click recorded successfully');

            } catch (error) {
                logger.error({
                    err: error,
                    shortUrl: payload.shortUrl,
                    ip: payload.ip
                }, 'Error processing view event');
            }
        });

        globalAny[LISTENER_KEY] = true;
        logger.info('Analytics listener registered');
    }
}

// Initialize immediately when module is loaded
initializeAnalyticsListener();

export const trackLinkView = (payload: TrackViewPayload) => {
    logger.debug({ shortUrl: payload.shortUrl }, 'Emitting track view event');
    analyticsEmitter.emit(ANALYTICS_EVENTS.TRACK_VIEW, payload);
};
