export const copyToClipboard = async (text: string, options: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    if (!text) return;
    try {
        await navigator.clipboard.writeText(text);
        options.onSuccess?.();
    } catch {
        options.onError?.();
    }
};