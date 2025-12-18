"use client";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { useSpeed } from "@/hooks/contracts/useSpeed";
import { useCallback } from "react";

/**
 * Hook for all admin transactional functions
 * Includes: setDirectIncomeConfig, setDurations, setInterestRates, 
 * setLevelUnlockConfig, setMinWithdrawal, setPartners, setStakingTiers, emergencyWithdraw
 */
export function useAdminTransactions() {
    const contract = useSpeed();
    const { mutateAsync: sendTransaction, isPending, error } = useSendTransaction();

    /**
     * Set direct income configuration
     * @param percent - Direct income percentage (basis points, e.g., 1000 = 10%)
     * @param minStake - Minimum stake to qualify for direct income
     */
    const setDirectIncomeConfig = useCallback(async (
        percent: bigint,
        minStake: bigint
    ) => {
        const transaction = prepareContractCall({
            contract,
            method: "function setDirectIncomeConfig(uint256 _percent, uint256 _minStake)",
            params: [percent, minStake],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

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
        const transaction = prepareContractCall({
            contract,
            method: "function setDurations(uint256 _d1, uint256 _d2, uint256 _d3, uint256 _d4)",
            params: [d1, d2, d3, d4],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

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
        const transaction = prepareContractCall({
            contract,
            method: "function setInterestRates(uint256 _r1, uint256 _r2, uint256 _r3, uint256 _r4)",
            params: [r1, r2, r3, r4],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

    /**
     * Set level unlock configuration
     * @param minStake - Minimum stake to unlock one level
     * @param businessForAll - Business volume to unlock all levels
     */
    const setLevelUnlockConfig = useCallback(async (
        minStake: bigint,
        businessForAll: bigint
    ) => {
        const transaction = prepareContractCall({
            contract,
            method: "function setLevelUnlockConfig(uint256 _minStake, uint256 _businessForAll)",
            params: [minStake, businessForAll],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

    /**
     * Set minimum withdrawal amount
     * @param amount - Minimum withdrawal amount in USDT (wei)
     */
    const setMinWithdrawal = useCallback(async (
        amount: bigint
    ) => {
        const transaction = prepareContractCall({
            contract,
            method: "function setMinWithdrawal(uint256 _amount)",
            params: [amount],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

    /**
     * Set partners and their shares
     * @param partners - Array of partner addresses
     * @param shares - Array of share percentages (basis points)
     */
    const setPartners = useCallback(async (
        partners: string[],
        shares: bigint[]
    ) => {
        const transaction = prepareContractCall({
            contract,
            method: "function setPartners(address[] _partners, uint256[] _shares)",
            params: [partners, shares],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

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
        const transaction = prepareContractCall({
            contract,
            method: "function setStakingTiers(uint256 _tier1, uint256 _tier2, uint256 _tier3Min, uint256 _max)",
            params: [tier1, tier2, tier3Min, max],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

    /**
     * Emergency withdraw funds from contract
     * @param amount - Amount to withdraw in USDT (wei)
     */
    const emergencyWithdraw = useCallback(async (
        amount: bigint
    ) => {
        const transaction = prepareContractCall({
            contract,
            method: "function emergencyWithdraw(uint256 _amount)",
            params: [amount],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

    /**
     * Transfer first user role to new address
     * @param newFirstUser - New first user address
     */
    const transferFirstUser = useCallback(async (
        newFirstUser: string
    ) => {
        const transaction = prepareContractCall({
            contract,
            method: "function transferFirstUser(address _newFirstUser)",
            params: [newFirstUser],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

    /**
     * Set level income percentages for all 20 levels
     * @param percents - Array of 20 percentages in basis points
     */
    const setLevelIncomePercents = useCallback(async (
        percents: bigint[]
    ) => {
        if (percents.length !== 20) throw new Error("Must provide exactly 20 percentages");
        const transaction = prepareContractCall({
            contract,
            method: "function setLevelIncomePercents(uint256[20] _percents)",
            params: [percents as unknown as readonly [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint]],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

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
        const transaction = prepareContractCall({
            contract,
            method: "function setLifetimeRewardTier(uint256 _tier, uint256 _teamSize, uint256 _directReferrals, uint256 _businessVolume, uint256 _rewardAmount)",
            params: [tier, teamSize, directReferrals, businessVolume, rewardAmount],
        });
        return sendTransaction(transaction);
    }, [contract, sendTransaction]);

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

        // State
        isPending,
        error,
    };
}

