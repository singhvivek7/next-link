import CryptoJS from "crypto-js";

import { env } from "@/config/env";

// Use a fallback key if env variable is not set (Note: In production, strictly use env var)
const SECRET_KEY = env.NEXT_PUBLIC_ENCRYPTION_KEY;

/**
 * Encrypts data using AES encryption
 */
export const encryptData = (data: any, secret: string = SECRET_KEY): string => {
    try {
        const jsonString = JSON.stringify(data);
        return CryptoJS.AES.encrypt(jsonString, secret).toString();
    } catch (error) {
        console.error("Encryption error:", error);
        return "";
    }
};

/**
 * Decrypts data using AES encryption
 */
export const decryptData = (ciphertext: string, secret: string = SECRET_KEY): any => {
    try {
        if (!ciphertext) return null;
        const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedString) return null;

        return JSON.parse(decryptedString);
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};

// LocalStorage Wrappers

/**
 * Sets an encrypted item in localStorage
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
    if (typeof window !== "undefined") {
        try {
            const encrypted = encryptData(value);
            localStorage.setItem(key, encrypted);
        } catch (error) {
            console.error("Error setting localStorage:", error);
        }
    }
};

/**
 * Gets and decrypts an item from localStorage
 */
export const getLocalStorage = <T>(key: string): T | null => {
    if (typeof window !== "undefined") {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;

            // Try decrypting. If it fails (e.g. old plain data), try returning as is or null
            // But for this task, we assume we want strictly encrypted data.
            // However, needed for migration: if decryption fails/JSON parse fails, maybe it was plain text?
            // Let's rely on decryptData returning null on failure.

            return decryptData(item);
        } catch (error) {
            console.error("Error getting localStorage:", error);
            return null;
        }
    }
    return null;
};

/**
 * Removes an item from localStorage
 */
export const removeLocalStorage = (key: string): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};
