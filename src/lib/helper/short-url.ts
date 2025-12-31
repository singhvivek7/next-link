/**
 * Next.js URL Shortener Function
 * Works in both client-side and server-side environments
 * Uses Web Crypto API (available in Node.js 16+ and all modern browsers)
 *
 * @param length - Length of the short URL to generate (minimum 1, maximum 20)
 * @returns Generated short URL string
 */
function generateShortUrl(length: number): string {
  // Input validation
  if (!Number.isInteger(length) || length < 1 || length > 20) {
    throw new Error("Length must be an integer between 1 and 20");
  }

  // Character set: 0-9, a-z, A-Z, _ (63 characters total)
  const charset =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  const charsetLength = charset.length; // 63

  let result = "";

  // Check for Web Crypto API (available in Next.js client and server)
  if (
    typeof globalThis !== "undefined" &&
    globalThis.crypto &&
    globalThis.crypto.getRandomValues
  ) {
    // Use Web Crypto API (works in both browser and Node.js 16+)
    const randomBytes = new Uint8Array(length * 2); // Generate extra bytes for rejection sampling
    globalThis.crypto.getRandomValues(randomBytes);

    let byteIndex = 0;
    for (let i = 0; i < length; i++) {
      let randomIndex;

      // Rejection sampling to avoid modulo bias
      do {
        if (byteIndex >= randomBytes.length) {
          // If we run out of random bytes, generate more
          globalThis.crypto.getRandomValues(randomBytes);
          byteIndex = 0;
        }
        randomIndex = randomBytes[byteIndex++];
      } while (randomIndex >= 256 - (256 % charsetLength));

      result += charset[randomIndex % charsetLength];
    }
  } else {
    // Fallback for older environments (should rarely be needed in Next.js)
    console.warn("Web Crypto API not available, using Math.random fallback");
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }

  return result;
}

export interface NextUrlOptions {
  length?: number;
  prefix?: string;
  suffix?: string;
  ensureUnique?: (url: string) => Promise<boolean>; // Check database for uniqueness
}

export async function generateUniqueShortUrl(
  options: NextUrlOptions
): Promise<string> {
  const { length = 7, ensureUnique, prefix = "", suffix = "" } = options;

  let attempts = 0;
  const maxAttempts = 10; // Prevent infinite loops

  while (attempts < maxAttempts) {
    const shortCode = generateShortUrl(length);
    const fullUrl = prefix + shortCode + suffix;

    // If no uniqueness check provided, return immediately
    if (!ensureUnique) {
      return fullUrl;
    }

    // Check if URL is unique in database
    const isUnique = await ensureUnique(fullUrl);
    if (isUnique) {
      return fullUrl;
    }
    attempts++;
  }

  throw new Error(
    `Failed to generate unique URL after ${maxAttempts} attempts. Consider increasing length.`
  );
}

export const generateRedirectLink = (url: string) => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "https://" + url;
  }
  return url;
};
