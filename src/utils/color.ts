/**
 * Convert HSL color string to hex format
 * @param hsl - HSL color string in format "hsl(239 84% 67%)"
 * @returns Hex color string in format "#6366F1"
 */
export function hslToHex(hsl: string): string {
    // Extract h, s, l from "hsl(239 84% 67%)" format
    const match = hsl.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
    if (!match) return "#6366F1"; // Fallback to indigo

    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Get the primary color from the current theme palette in hex format
 * Useful for integrating with third-party libraries that require hex colors
 */
export function getPrimaryColorHex(primaryHsl: string): string {
    return hslToHex(primaryHsl);
}
