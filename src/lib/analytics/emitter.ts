import EventEmitter from 'events';

class AnalyticsEmitter extends EventEmitter { }

const globalForAnalytics = global as unknown as { analyticsEmitter: AnalyticsEmitter };

export const analyticsEmitter = globalForAnalytics.analyticsEmitter || new AnalyticsEmitter();

if (process.env.NODE_ENV !== "production") globalForAnalytics.analyticsEmitter = analyticsEmitter;
