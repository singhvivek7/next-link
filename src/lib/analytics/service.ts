import client from "@/lib/helper/db";

import { analyticsEmitter } from "./emitter";
import { ANALYTICS_EVENTS, TrackViewPayload } from "./types";

// Flag to ensure we don't register listeners multiple times in development
const LISTENER_REGISTERED = Symbol.for('analytics_listener_registered');
const globalAny = global as any;

if (!globalAny[LISTENER_REGISTERED]) {
    analyticsEmitter.on(ANALYTICS_EVENTS.TRACK_VIEW, async (payload: TrackViewPayload) => {
        try {
            console.log(`[Analytics] View tracked for ${payload.shortUrl} IP=${payload.ip || 'unknown'}`);

            // Record the click
            await client.click.create({
                data: {
                    url: { connect: { short_url: payload.shortUrl } },
                    ip_address: payload.ip,
                    user_agent: payload.userAgent,
                    referer: payload.referer
                }
            });

            // TODO: In the future, insert detailed analytics record into a separate table
            // await client.analytics.create({ data: ... })

        } catch (error) {
            console.error("[Analytics] Error processing view event:", error);
        }
    });

    globalAny[LISTENER_REGISTERED] = true;
    console.log("[Analytics] Listener registered");
}

export const trackLinkView = (payload: TrackViewPayload) => {
    analyticsEmitter.emit(ANALYTICS_EVENTS.TRACK_VIEW, payload);
};
