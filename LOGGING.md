# Pino Logging Implementation

## 📋 Overview

We've implemented **Pino** - a fast, low-overhead JSON logger for Node.js applications. This provides structured logging with better performance and observability.

## 🎯 Features

- ✅ **Structured JSON logging** in production
- ✅ **Pretty printing** in development
- ✅ **Module-specific loggers** for better organization
- ✅ **Automatic error serialization**
- ✅ **Configurable log levels**
- ✅ **ISO timestamps**
- ✅ **Low overhead** (~10x faster than console.log)

## 📦 Installation

```bash
bun add pino pino-pretty
```

## 🚀 Usage

### Basic Usage

```typescript
import logger from '@/lib/logger';

// Simple log
logger.info('Server started');

// With context
logger.info({ port: 3000 }, 'Server started');

// Different levels
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
logger.fatal('Fatal error');
```

### Module-Specific Loggers

```typescript
import { loggers } from '@/lib/logger';

// Use pre-configured module loggers
loggers.analytics.info({ shortUrl: 'abc123' }, 'Click tracked');
loggers.api.info({ method: 'GET', path: '/api/users' }, 'API request');
loggers.auth.info({ userId: '123' }, 'User logged in');
loggers.database.info({ query: 'SELECT *' }, 'Query executed');
loggers.payment.info({ orderId: 'ord_123' }, 'Payment processed');
loggers.cron.info('Cleanup job started');
```

### Create Custom Logger

```typescript
import { createLogger } from '@/lib/logger';

const myLogger = createLogger('my-module');
myLogger.info('Custom module log');
```

### Error Logging

```typescript
try {
    // Some code
} catch (error) {
    logger.error({ err: error }, 'Operation failed');
    // Automatically serializes error with stack trace
}
```

### Request/Response Logging

```typescript
import { loggers } from '@/lib/logger';

export async function GET(req: NextRequest) {
    loggers.api.info({ 
        method: req.method,
        url: req.url,
        headers: Object.fromEntries(req.headers)
    }, 'Incoming request');
    
    // ... handle request
    
    loggers.api.info({ 
        status: 200,
        duration: 123 
    }, 'Request completed');
}
```

## 📊 Log Levels

| Level | Value | Usage |
|-------|-------|-------|
| `fatal` | 60 | Application crash |
| `error` | 50 | Errors that need attention |
| `warn` | 40 | Warning messages |
| `info` | 30 | General information (default) |
| `debug` | 20 | Debugging information |
| `trace` | 10 | Very detailed debugging |

### Set Log Level

```bash
# In .env
LOG_LEVEL=debug  # or info, warn, error, etc.
```

## 🎨 Output Examples

### Development (Pretty Print)

```
[12:34:56] INFO (analytics): View tracked
    shortUrl: "abc123"
    ip: "192.168.1.1"
    userAgent: "Mozilla/5.0..."
    
[12:34:57] INFO (analytics): Click recorded successfully
    shortUrl: "abc123"
    clickId: "click_xyz"
    urlId: "url_123"
```

### Production (JSON)

```json
{
  "level": 30,
  "time": "2026-01-04T07:30:00.000Z",
  "module": "analytics",
  "shortUrl": "abc123",
  "ip": "192.168.1.1",
  "msg": "View tracked"
}
```

## 🔍 Available Loggers

| Logger | Module | Usage |
|--------|--------|-------|
| `loggers.analytics` | Analytics | Click tracking, view events |
| `loggers.api` | API Routes | HTTP requests/responses |
| `loggers.auth` | Authentication | Login, logout, token events |
| `loggers.database` | Database | Queries, connections |
| `loggers.payment` | Payments | Razorpay transactions |
| `loggers.cron` | Cron Jobs | Scheduled tasks |

## 📝 Best Practices

### ✅ Do

```typescript
// Include context in the object
logger.info({ userId: '123', action: 'login' }, 'User logged in');

// Use appropriate log levels
logger.debug({ query: 'SELECT *' }, 'Database query');
logger.error({ err: error, userId: '123' }, 'Failed to save user');

// Use module-specific loggers
loggers.payment.info({ orderId: 'ord_123' }, 'Payment initiated');
```

### ❌ Don't

```typescript
// Don't use string interpolation
logger.info(`User ${userId} logged in`); // ❌

// Don't log sensitive data
logger.info({ password: 'secret123' }, 'Login attempt'); // ❌

// Don't use console.log
console.log('Something happened'); // ❌
```

## 🛠️ Configuration

The logger is configured in `/src/lib/logger.ts`:

```typescript
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    
    // Pretty print in development
    transport: process.env.NODE_ENV !== 'production' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
        }
    } : undefined,
});
```

## 🔧 Advanced Usage

### Child Loggers with Bindings

```typescript
const requestLogger = logger.child({ 
    requestId: 'req_123',
    userId: 'user_456' 
});

requestLogger.info('Processing request');
// All logs from this logger will include requestId and userId
```

### Conditional Logging

```typescript
if (logger.isLevelEnabled('debug')) {
    const expensiveData = computeExpensiveData();
    logger.debug({ data: expensiveData }, 'Debug info');
}
```

### Custom Serializers

```typescript
// Already configured in logger.ts
serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
}
```

## 📈 Performance

Pino is extremely fast:

| Logger | Ops/sec | Relative |
|--------|---------|----------|
| **Pino** | ~30,000 | 1x |
| Winston | ~900 | 33x slower |
| Bunyan | ~5,000 | 6x slower |
| console.log | ~3,000 | 10x slower |

## 🐛 Debugging

### Enable All Logs

```bash
LOG_LEVEL=trace bun run dev
```

### Filter Logs by Module

```bash
# In production, use log aggregation tools like:
# - Datadog
# - New Relic
# - CloudWatch
# - Logtail

# Filter by module
cat logs.json | grep '"module":"analytics"'
```

## 🚀 Production Deployment

### Vercel

Logs are automatically collected and viewable in Vercel dashboard.

### Docker

```dockerfile
# Pipe logs to stdout
CMD ["node", "server.js"]
```

### Log Aggregation

Consider using:
- **Datadog** - Full observability platform
- **Logtail** - Simple log management
- **CloudWatch** - AWS native
- **New Relic** - APM with logging

## 📚 Resources

- [Pino Documentation](https://getpino.io/)
- [Pino Best Practices](https://github.com/pinojs/pino/blob/master/docs/best-practices.md)
- [Pino Pretty](https://github.com/pinojs/pino-pretty)

---

**Status:** ✅ Implemented and ready to use  
**Performance:** ~10x faster than console.log  
**Production Ready:** Yes
