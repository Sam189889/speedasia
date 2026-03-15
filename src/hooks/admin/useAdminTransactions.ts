"use client";
import { useWriteContract } from "wagmi";
import { useSpeed } from "@/hooks/contracts/useSpeed";
import { useCallback } from "react";

/**
 * Hook for all admin transactional functions
 * Includes: setDirectIncomeConfig, setDurations, setInterestRates, 
 * setLevelUnlockConfig, setMinWithdrawal, setPartners, setStakingTiers, emergencyWithdraw
 */
export function useAdminTransactions() {
    const contract = useSpeed();
    const { writeContractAsync, isPending, error } = useWriteContract();

    /**
     * Set direct income configuration
     * @param percent - Direct income percentage (basis points, e.g., 1000 = 10%)
     * @param minStake - Minimum stake to qualify for direct income
     */
    const setDirectIncomeConfig = useCallback(async (
        percent: bigint,
        minStake: bigint
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "setDirectIncomeConfig",
            args: [percent, minStake],
        });
    }, [contract, writeContractAsync]);

    /**
     * Set staking durations
     * @param d1 - Duration 1 in seconds
     * @param d2 - Duration 2 in seconds
     * @param d3 - Duration 3 in seconds
     * @param d4 - Duration 4 in seconds
     */
    const setDurations = useCallback(async (
        d1: bigint,
        d2: bigint,
        d3: bigint,
        d4: bigint
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "setDurations",
            args: [d1, d2, d3, d4],
        });
    }, [contract, writeContractAsync]);

    /**
     * Set interest rates for staking durations
     * @param r1 - Interest rate 1 (basis points)
     * @param r2 - Interest rate 2 (basis points)
     * @param r3 - Interest rate 3 (basis points)
     * @param r4 - Interest rate 4 (basis points)
     */
    const setInterestRates = useCallback(async (
        r1: bigint,
        r2: bigint,
        r3: bigint,
        r4: bigint
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "setInterestRates",
            args: [r1, r2, r3, r4],
        });
    }, [contract, writeContractAsync]);

    /**
     * Set level unlock configuration
     * @param minStake - Minimum stake to unlock one level
     * @param businessForAll - Business volume to unlock all levels
     */
    const setLevelUnlockConfig = useCallback(async (
        minStake: bigint,
        businessForAll: bigint
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "setLevelUnlockConfig",
            args: [minStake, businessForAll],
        });
    }, [contract, writeContractAsync]);

    /**
     * Set minimum withdrawal amount
     * @param amount - Minimum withdrawal amount in USDT (wei)
     */
    const setMinWithdrawal = useCallback(async (
        amount: bigint
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "setMinWithdrawal",
            args: [amount],
        });
    }, [contract, writeContractAsync]);

    /**
     * Set partners and their shares
     * @param partners - Array of partner addresses
     * @param shares - Array of share percentages (basis points)
     */
    const setPartners = useCallback(async (
        partners: string[],
        shares: bigint[]
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "setPartners",
            args: [partners as `0x${string}`[], shares],
        });
    }, [contract, writeContractAsync]);

    /**
     * Set staking tiers
     * @param tier1 - Tier 1 amount
     * @param tier2 - Tier 2 amount
     * @param tier3Min - Tier 3 minimum amount
     * @param max - Maximum staking amount
     */
    const setStakingTiers = useCallback(async (
        tier1: bigint,
        tier2: bigint,
        tier3Min: bigint,
        max: bigint
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "setStakingTiers",
            args: [tier1, tier2, tier3Min, max],
        });
    }, [contract, writeContractAsync]);

    /**
     * Emergency withdraw funds from contract
     * @param amount - Amount to withdraw in USDT (wei)
     */
    const emergencyWithdraw = useCallback(async (
        amount: bigint
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "emergencyWithdraw",
            args: [amount],
        });
    }, [contract, writeContractAsync]);

    /**
     * Transfer first user role to new address
     * @param newFirstUser - New first user address
     */
    const transferFirstUser = useCallback(async (
        newFirstUser: string
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "transferFirstUser",
            args: [newFirstUser as `0x${string}`],
        });
    }, [contract, writeContractAsync]);

    /**
     * Set level income percentages for all 20 levels
     * @param percents - Array of 20 percentages in basis points
     */
    const setLevelIncomePercents = useCallback(async (
        percents: bigint[]
    ) => {
        if (percents.length !== 20) throw new Error("Must provide exactly 20 percentages");
        return writeContractAsync({
            ...contract,
            functionName: "setLevelIncomePercents",
            args: [percents as unknown as readonly [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint]],
        });
    }, [contract, writeContractAsync]);

    /**
     * Set a specific lifetime reward tier
     * @param tier - Tier index (0-5)
     * @param teamSize - Required team size
     * @param directReferrals - Required direct referrals
     * @param businessVolume - Required business volume in USDT (wei)
     * @param rewardAmount - Reward amount in USDT (wei)
     */
    const setLifetimeRewardTier = useCallback(async (
        tier: bigint,
        teamSize: bigint,
        directReferrals: bigint,
        businessVolume: bigint,
        rewardAmount: bigint
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "setLifetimeRewardTier",
            args: [tier, teamSize, directReferrals, businessVolume, rewardAmount],
        });
    }, [contract, writeContractAsync]);

    /**
     * Initialize V2 features (one-time activation)
     */
    const initializeV2 = useCallback(async () => {
        return writeContractAsync({
            ...contract,
            functionName: "initializeV2",
        });
    }, [contract, writeContractAsync]);

    /**
     * Bulk migrate all V1 stakes for a single user
     * @param userId - User's 5-character ID
     */
    const bulkMigrateUserStakes = useCallback(async (userId: string) => {
        return writeContractAsync({
            ...contract,
            functionName: "bulkMigrateUserStakes",
            args: [userId as `0x${string}`],
        });
    }, [contract, writeContractAsync]);

    /**
     * Bulk migrate ALL users' V1 stakes in batches
     * @param startIndex - Start user index
     * @param endIndex - End user index (exclusive)
     */
    const bulkMigrateAllStakes = useCallback(async (
        startIndex: bigint,
        endIndex: bigint
    ) => {
        return writeContractAsync({
            ...contract,
            functionName: "bulkMigrateAllStakes",
            args: [startIndex, endIndex],
        });
    }, [contract, writeContractAsync]);

    return {
        // Config setters
        setDirectIncomeConfig,
        setDurations,
        setInterestRates,
        setLevelUnlockConfig,
        setMinWithdrawal,
        setPartners,
        setStakingTiers,
        setLevelIncomePercents,
        setLifetimeRewardTier,

        // First User
        transferFirstUser,

        // Emergency
        emergencyWithdraw,

        // V2 Migration
        initializeV2,
        bulkMigrateUserStakes,
        bulkMigrateAllStakes,

        // State
        isPending,
        error,
    };
}

