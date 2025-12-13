import { toTokens, toWei, shortenAddress, isAddress, fromGwei, hexToString, stringToHex } from "thirdweb/utils";
import { getGasPrice } from "thirdweb";
import { client } from "@/client/client";
import { chain } from "@/chain/chain";

/**
 * Format BigInt USDT value to readable string using ThirdWeb's toTokens
 * @param value - BigInt value in wei (18 decimals)
 * @param decimals - Number of decimal places to show
 * @returns Formatted string like "1,234.56"
 */
export function formatUSDT(value: bigint, decimals: number = 2): string {
    if (!value) return '0';

    // Use ThirdWeb's toTokens to convert wei to tokens
    const tokenValue = toTokens(value, 18);
    const numValue = parseFloat(tokenValue);

    // Format with specified decimals and thousands separator
    return numValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}

/**
 * Format number with thousands separator
 * @param num - Number to format
 * @returns Formatted string like "1,234,567"
 */
export function formatNumber(num: number): string {
    return num.toLocaleString('en-US');
}

/**
 * Format BigInt USDT with dollar sign and thousands separator using ThirdWeb's toTokens
 * @param value - BigInt value in wei
 * @returns Formatted string like "$1,234,567.89"
 */
export function formatUSDTShort(value: bigint): string {
    // Use ThirdWeb's toTokens to convert wei to tokens
    const tokenValue = toTokens(value, 18);
    const numValue = parseFloat(tokenValue);

    return `$${numValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

/**
 * Calculate transactions per day from total users and days since launch
 * For demo purposes - in real app you'd track this from events
 */
export function estimateDailyTransactions(totalUsers: number): number {
    // Rough estimate: 15% of users make a transaction daily
    return Math.floor(totalUsers * 0.15);
}

/**
 * Convert USDT amount to Wei using ThirdWeb's toWei
 * @param amount - Amount in USDT (e.g., "100")
 * @returns BigInt value in wei
 */
export function usdtToWei(amount: string): bigint {
    return toWei(amount);
}

/**
 * Shorten wallet address using ThirdWeb's shortenAddress
 * @param address - Full wallet address
 * @returns Shortened address like "0xA0Cf...251e"
 */
export function formatAddress(address: string): string {
    return shortenAddress(address);
}

/**
 * Validate if a string is a valid Ethereum address using ThirdWeb's isAddress
 * @param address - Address string to validate
 * @returns Boolean indicating if address is valid
 */
export function validateAddress(address: string): boolean {
    return isAddress(address);
}

/**
 * Format date to Indian locale (DD/MM/YYYY format)
 * @param date - Date object or timestamp
 * @returns Formatted date string like "22/11/2025"
 */
export function formatDate(date: Date | number): string {
    const dateObj = typeof date === 'number' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-IN');
}

/**
 * Format date and time to Indian locale
 * @param date - Date object or timestamp
 * @returns Formatted date-time string like "22/11/2025, 6:43:37 pm"
 */
export function formatDateTime(date: Date | number): string {
    const dateObj = typeof date === 'number' ? new Date(date) : date;
    return dateObj.toLocaleString('en-IN');
}

/**
 * Format date with custom options for Indian locale
 * @param date - Date object or timestamp
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDateCustom(
    date: Date | number,
    options?: Intl.DateTimeFormatOptions
): string {
    const dateObj = typeof date === 'number' ? new Date(date) : date;
    const defaultOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };
    return dateObj.toLocaleDateString('en-IN', options || defaultOptions);
}

/**
 * Format time only in Indian locale
 * @param date - Date object or timestamp
 * @returns Formatted time string like "6:43:37 pm"
 */
export function formatTime(date: Date | number): string {
    const dateObj = typeof date === 'number' ? new Date(date) : date;
    return dateObj.toLocaleTimeString('en-IN');
}

/**
 * Format relative time (e.g., "2 days ago", "in 3 hours")
 * @param date - Date object or timestamp
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | number): string {
    const dateObj = typeof date === 'number' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
        const months = Math.floor(diffInSeconds / 2592000);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}

/**
 * Get current gas price from the blockchain
 * @returns Gas price in wei (BigInt)
 */
export async function getCurrentGasPrice(): Promise<bigint> {
    const gasPrice = await getGasPrice({ client, chain });
    return gasPrice;
}

/**
 * Format gas price to Gwei
 * @param gasPriceWei - Gas price in wei
 * @returns Formatted gas price string like "25.5 Gwei"
 */
export function formatGasPrice(gasPriceWei: bigint): string {
    const gwei = Number(gasPriceWei) / 1e9;
    return `${gwei.toFixed(2)} Gwei`;
}

/**
 * Convert Gwei to Wei
 * @param gwei - Amount in Gwei (e.g., "1")
 * @returns BigInt value in wei
 */
export function gweiToWei(gwei: string): bigint {
    return fromGwei(gwei);
}

/**
 * Estimate transaction cost
 * @param gasPrice - Gas price in wei
 * @param gasLimit - Estimated gas limit (default: 21000 for simple transfer)
 * @returns Estimated cost in ETH
 */
export function estimateTransactionCost(gasPrice: bigint, gasLimit: number = 21000): string {
    const costInWei = gasPrice * BigInt(gasLimit);
    const costInEth = toTokens(costInWei, 18);
    return `${parseFloat(costInEth).toFixed(6)} ETH`;
}

// ============================================
// UserId Encoding/Decoding Functions
// ============================================

/**
 * Decode bytes5 hex from contract to readable userId string
 * Uses thirdweb's hexToString utility
 * Example: "0x3341424344" -> "3ABCD"
 * @param bytes5Hex - Hex string from contract (bytes5)
 * @returns Decoded userId string
 */
export function decodeUserId(bytes5Hex: `0x${string}` | string): string {
    if (!bytes5Hex || bytes5Hex === "0x0000000000" || bytes5Hex === "0x") return "";

    try {
        // Use thirdweb's hexToString
        const hex = bytes5Hex.startsWith("0x") ? bytes5Hex as `0x${string}` : `0x${bytes5Hex}` as `0x${string}`;
        const decoded = hexToString(hex);
        // Remove null characters
        return decoded.replace(/\0/g, "");
    } catch {
        return "";
    }
}

/**
 * Encode readable userId string to bytes5 hex for contract calls
 * Uses thirdweb's stringToHex utility
 * Example: "3ABCD" -> "0x3341424344"
 * @param userId - Readable userId string (max 5 characters)
 * @returns bytes5 hex string for contract
 */
export function encodeUserId(userId: string): `0x${string}` {
    if (!userId) return "0x0000000000";

    // Ensure max 5 characters and uppercase
    const trimmed = userId.slice(0, 5).toUpperCase();

    // Use thirdweb's stringToHex with size option for bytes5
    const hex = stringToHex(trimmed, { size: 5 });
    return hex;
}

/**
 * Validate if a userId string is valid (alphanumeric, max 5 chars)
 * @param userId - UserId string to validate
 * @returns Boolean indicating if userId is valid
 */
export function validateUserId(userId: string): boolean {
    if (!userId || userId.length === 0 || userId.length > 5) return false;
    // Only alphanumeric characters allowed
    return /^[A-Za-z0-9]+$/.test(userId);
}

/**
 * Format userId for display (uppercase)
 * @param userId - UserId string
 * @returns Formatted userId string
 */
export function formatUserId(userId: string): string {
    return userId.toUpperCase();
}

/**
 * Check if a bytes5 hex is empty/null
 * @param bytes5Hex - Hex string from contract
 * @returns Boolean indicating if userId is empty
 */
export function isEmptyUserId(bytes5Hex: `0x${string}` | string): boolean {
    if (!bytes5Hex) return true;
    return bytes5Hex === "0x0000000000" || bytes5Hex === "0x" || bytes5Hex === "";
}
