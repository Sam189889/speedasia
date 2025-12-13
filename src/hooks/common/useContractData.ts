"use client";
import { useReadContract } from "thirdweb/react";
import { useSpeed } from "@/hooks/contracts/useSpeed";
import { useEffect, useState } from "react";

/**
 * Contract configuration data interface
 */
export interface ContractConfig {
    // Staking Tiers
    stakingTier1: bigint;
    stakingTier2: bigint;
    stakingTier3Min: bigint;
    maxStaking: bigint;

    // Income Config
    minDirectIncomeStake: bigint;
    directIncomePercent: bigint;

    // Level Config
    minStakeForLevelCount: bigint;
    maxLevels: bigint;
    directBusinessForAllLevels: bigint;
    levelIncomePercents: bigint[];

    // Withdrawal
    minWithdrawal: bigint;

    // Staking Durations (in days)
    durationOne: bigint;
    durationTwo: bigint;
    durationThree: bigint;
    durationFour: bigint;

    // Interest Rates (percentage)
    interestOne: bigint;
    interestTwo: bigint;
    interestThree: bigint;
    interestFour: bigint;
}

/**
 * Lifetime Reward Tier interface
 */
export interface LifetimeRewardTier {
    teamSize: bigint;
    directReferrals: bigint;
    businessVolume: bigint;
    rewardAmount: bigint;
}

/**
 * Hook to get all contract configuration data
 */
export function useContractConfig() {
    const contract = useSpeed();
    const [config, setConfig] = useState<ContractConfig | null>(null);
    const [lifetimeRewards, setLifetimeRewards] = useState<LifetimeRewardTier[]>([]);

    // Staking Tiers
    const { data: stakingTier1 } = useReadContract({
        contract,
        method: "function stakingTier1() view returns (uint256)",
        params: [],
    });

    const { data: stakingTier2 } = useReadContract({
        contract,
        method: "function stakingTier2() view returns (uint256)",
        params: [],
    });

    const { data: stakingTier3Min } = useReadContract({
        contract,
        method: "function stakingTier3Min() view returns (uint256)",
        params: [],
    });

    const { data: maxStaking } = useReadContract({
        contract,
        method: "function maxStaking() view returns (uint256)",
        params: [],
    });

    // Income Config
    const { data: minDirectIncomeStake } = useReadContract({
        contract,
        method: "function minDirectIncomeStake() view returns (uint256)",
        params: [],
    });

    const { data: directIncomePercent } = useReadContract({
        contract,
        method: "function directIncomePercent() view returns (uint256)",
        params: [],
    });

    // Level Config
    const { data: minStakeForLevelCount } = useReadContract({
        contract,
        method: "function minStakeForLevelCount() view returns (uint256)",
        params: [],
    });

    const { data: maxLevels } = useReadContract({
        contract,
        method: "function maxLevels() view returns (uint256)",
        params: [],
    });

    const { data: directBusinessForAllLevels } = useReadContract({
        contract,
        method: "function directBusinessForAllLevels() view returns (uint256)",
        params: [],
    });

    // Withdrawal
    const { data: minWithdrawal } = useReadContract({
        contract,
        method: "function minWithdrawal() view returns (uint256)",
        params: [],
    });

    // Staking Durations
    const { data: durationOne } = useReadContract({
        contract,
        method: "function durationOne() view returns (uint256)",
        params: [],
    });

    const { data: durationTwo } = useReadContract({
        contract,
        method: "function durationTwo() view returns (uint256)",
        params: [],
    });

    const { data: durationThree } = useReadContract({
        contract,
        method: "function durationThree() view returns (uint256)",
        params: [],
    });

    const { data: durationFour } = useReadContract({
        contract,
        method: "function durationFour() view returns (uint256)",
        params: [],
    });

    // Interest Rates
    const { data: interestOne } = useReadContract({
        contract,
        method: "function interestOne() view returns (uint256)",
        params: [],
    });

    const { data: interestTwo } = useReadContract({
        contract,
        method: "function interestTwo() view returns (uint256)",
        params: [],
    });

    const { data: interestThree } = useReadContract({
        contract,
        method: "function interestThree() view returns (uint256)",
        params: [],
    });

    const { data: interestFour } = useReadContract({
        contract,
        method: "function interestFour() view returns (uint256)",
        params: [],
    });

    // Level Income Percents (0-19 for levels 1-20) - Using Array.from pattern
    const levelQueries = Array.from({ length: 20 }, (_, i) => {
        const { data } = useReadContract({
            contract,
            method: "function levelIncomePercents(uint256) view returns (uint256)",
            params: [BigInt(i)],
        });
        return data;
    });

    // Lifetime Reward Tiers (0-5 for 6 tiers) - Using Array.from pattern
    const rewardQueries = Array.from({ length: 6 }, (_, i) => {
        const { data } = useReadContract({
            contract,
            method: "function lifetimeRewardTiers(uint256) view returns (uint256 teamSize, uint256 directReferrals, uint256 businessVolume, uint256 rewardAmount)",
            params: [BigInt(i)],
        });
        return data;
    });

    // Store config data when all values are loaded
    useEffect(() => {
        const allLevelsLoaded = levelQueries.every(v => v !== undefined);

        if (
            stakingTier1 !== undefined &&
            stakingTier2 !== undefined &&
            stakingTier3Min !== undefined &&
            maxStaking !== undefined &&
            minDirectIncomeStake !== undefined &&
            directIncomePercent !== undefined &&
            minStakeForLevelCount !== undefined &&
            maxLevels !== undefined &&
            directBusinessForAllLevels !== undefined &&
            minWithdrawal !== undefined &&
            durationOne !== undefined &&
            durationTwo !== undefined &&
            durationThree !== undefined &&
            durationFour !== undefined &&
            interestOne !== undefined &&
            interestTwo !== undefined &&
            interestThree !== undefined &&
            interestFour !== undefined &&
            allLevelsLoaded
        ) {
            const levelPercents = levelQueries.map(v => v ?? BigInt(0));

            setConfig({
                stakingTier1,
                stakingTier2,
                stakingTier3Min,
                maxStaking,
                minDirectIncomeStake,
                directIncomePercent,
                minStakeForLevelCount,
                maxLevels,
                directBusinessForAllLevels,
                minWithdrawal,
                durationOne,
                durationTwo,
                durationThree,
                durationFour,
                interestOne,
                interestTwo,
                interestThree,
                interestFour,
                levelIncomePercents: levelPercents,
            });
        }
    }, [
        stakingTier1, stakingTier2, stakingTier3Min, maxStaking,
        minDirectIncomeStake, directIncomePercent,
        minStakeForLevelCount, maxLevels, directBusinessForAllLevels,
        minWithdrawal,
        durationOne, durationTwo, durationThree, durationFour,
        interestOne, interestTwo, interestThree, interestFour,
        ...levelQueries
    ]);

    // Store lifetime rewards
    useEffect(() => {
        const validRewards = rewardQueries
            .filter((r): r is readonly [bigint, bigint, bigint, bigint] => r !== undefined)
            .map(r => ({
                teamSize: r[0],
                directReferrals: r[1],
                businessVolume: r[2],
                rewardAmount: r[3],
            }));

        if (validRewards.length === 6) {
            setLifetimeRewards(validRewards);
        }
    }, [...rewardQueries]);

    const isLoading = config === null;

    return {
        config,
        lifetimeRewards,
        isLoading,

        // Individual formatted values for easy access
        stakingTiers: config ? {
            tier1: config.stakingTier1,
            tier2: config.stakingTier2,
            tier3Min: config.stakingTier3Min,
            max: config.maxStaking,
        } : null,

        durations: config ? [
            { days: config.durationOne, interest: config.interestOne },
            { days: config.durationTwo, interest: config.interestTwo },
            { days: config.durationThree, interest: config.interestThree },
            { days: config.durationFour, interest: config.interestFour },
        ] : null,
    };
}

/**
 * Hook to get contract statistics (admin data)
 */
export function useContractStats() {
    const contract = useSpeed();

    const { data, isPending } = useReadContract({
        contract,
        method: "function getContractStats() view returns (uint256 _totalUsers, uint256 _totalStaked, uint256 _totalWithdrawn, uint256 _totalDirectIncome, uint256 _totalLevelIncome, uint256 _totalStakingIncome, uint256 _totalLifetimeRewards, uint256 _contractBalance)",
        params: [],
    });

    if (!data) {
        return {
            totalUsers: BigInt(0),
            totalStaked: BigInt(0),
            totalWithdrawn: BigInt(0),
            totalDirectIncome: BigInt(0),
            totalLevelIncome: BigInt(0),
            totalStakingIncome: BigInt(0),
            totalLifetimeRewards: BigInt(0),
            contractBalance: BigInt(0),
            isLoading: isPending,
        };
    }

    return {
        totalUsers: data[0],
        totalStaked: data[1],
        totalWithdrawn: data[2],
        totalDirectIncome: data[3],
        totalLevelIncome: data[4],
        totalStakingIncome: data[5],
        totalLifetimeRewards: data[6],
        contractBalance: data[7],
        isLoading: isPending,
    };
}

/**
 * Hook to get partners data (admin)
 */
export function usePartners() {
    const contract = useSpeed();

    const { data, isPending } = useReadContract({
        contract,
        method: "function getPartners() view returns (address[], uint256[])",
        params: [],
    });

    if (!data) {
        return {
            partners: [] as string[],
            shares: [] as bigint[],
            isLoading: isPending,
        };
    }

    return {
        partners: data[0] as string[],
        shares: data[1] as bigint[],
        isLoading: isPending,
    };
}
