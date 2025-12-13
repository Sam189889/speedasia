"use client";
import { useReadContract } from "thirdweb/react";
import { useSpeed } from "@/hooks/contracts/useSpeed";
import { validateAddress, isEmptyUserId, decodeUserId, encodeUserId } from "@/hooks/common/formatters";

/**
 * Hook to validate user registration status by wallet address
 * Can be used for:
 * - Checking if current user is registered
 * - Validating if a referrer address is registered
 * 
 * Logic:
 * - userId !== "0x0000000000" → User is registered
 * - userId === "0x0000000000" → User is NOT registered
 */
export function useUserValidation(walletAddress: string | undefined) {
    const contract = useSpeed();

    // Validate address format first
    const isValidAddress = walletAddress ? validateAddress(walletAddress) : false;

    const { data: userId, isPending } = useReadContract({
        contract,
        method: "function getUserIdByAddress(address _user) view returns (bytes5)",
        params: [walletAddress ?? "0x0000000000000000000000000000000000000000"] as const,
        queryOptions: { enabled: !!walletAddress && isValidAddress },
    });

    // Check if user is registered (userId is not empty/zero)
    const isRegistered = userId ? !isEmptyUserId(userId as `0x${string}`) : false;

    // Decoded userId for display
    const displayUserId = userId && isRegistered ? decodeUserId(userId as `0x${string}`) : "";

    return {
        // Raw data
        userId: userId as `0x${string}` | undefined,

        // Validation states
        isValidAddress,
        isRegistered,
        isLoading: isPending,

        // Display values
        displayUserId,

        // Helper for referrer validation
        isValidReferrer: isValidAddress && isRegistered,

        // Error messages
        getErrorMessage: (): string | null => {
            if (!walletAddress) return null;
            if (!isValidAddress) return "Invalid wallet address format";
            if (isPending) return null;
            if (!isRegistered) return "User is not registered";
            return null;
        },
    };
}

/**
 * Hook to validate referrer by userId string (e.g., "3ABCD")
 * Useful when user enters referrer ID directly instead of address
 */
export function useReferrerValidation(referrerId: string | undefined) {
    const contract = useSpeed();

    // Encode userId string to bytes5 hex
    const encodedUserId = referrerId ? encodeUserId(referrerId) : undefined;
    const isValidFormat = referrerId ? referrerId.length > 0 && referrerId.length <= 5 : false;

    const { data: referrerAddress, isPending } = useReadContract({
        contract,
        method: "function getUserByUserId(bytes5 _userId) view returns (address)",
        params: [encodedUserId ?? "0x0000000000"] as const,
        queryOptions: { enabled: !!encodedUserId && isValidFormat },
    });

    // Check if referrer exists (address is not zero)
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    const isValidReferrer = referrerAddress ? referrerAddress !== zeroAddress : false;

    return {
        // Raw data
        referrerAddress,
        encodedUserId,

        // Validation states
        isValidFormat,
        isValidReferrer,
        isLoading: isPending,

        // Error messages
        getErrorMessage: (): string | null => {
            if (!referrerId) return null;
            if (!isValidFormat) return "Referrer ID must be 1-5 characters";
            if (isPending) return null;
            if (!isValidReferrer) return "Referrer ID does not exist";
            return null;
        },
    };
}
