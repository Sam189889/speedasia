"use client";
import { useReadContract } from "wagmi";
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

    // V2 Status
    isV2Active: boolean;
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
        ...contract,
        functionName: "stakingTier1",
    });

    const { data: stakingTier2 } = useReadContract({
        ...contract,
        functionName: "stakingTier2",
    });

    const { data: stakingTier3Min } = useReadContract({
        ...contract,
        functionName: "stakingTier3Min",
    });

    const { data: maxStaking } = useReadContract({
        ...contract,
        functionName: "maxStaking",
    });

    // Income Config
    const { data: minDirectIncomeStake } = useReadContract({
        ...contract,
        functionName: "minDirectIncomeStake",
    });

    const { data: directIncomePercent } = useReadContract({
        ...contract,
        functionName: "directIncomePercent",
    });

    // Level Config
    const { data: minStakeForLevelCount } = useReadContract({
        ...contract,
        functionName: "minStakeForLevelCount",
    });

    const { data: maxLevels } = useReadContract({
        ...contract,
        functionName: "maxLevels",
    });

    const { data: directBusinessForAllLevels } = useReadContract({
        ...contract,
        functionName: "directBusinessForAllLevels",
    });

    // Withdrawal
    const { data: minWithdrawal } = useReadContract({
        ...contract,
        functionName: "minWithdrawal",
    });

    // Staking Durations
    const { data: durationOne } = useReadContract({
        ...contract,
        functionName: "durationOne",
    });

    const { data: durationTwo } = useReadContract({
        ...contract,
        functionName: "durationTwo",
    });

    const { data: durationThree } = useReadContract({
        ...contract,
        functionName: "durationThree",
    });

    const { data: durationFour } = useReadContract({
        ...contract,
        functionName: "durationFour",
    });

    // Interest Rates
    const { data: interestOne } = useReadContract({
        ...contract,
        functionName: "interestOne",
    });

    const { data: interestTwo } = useReadContract({
        ...contract,
        functionName: "interestTwo",
    });

    const { data: interestThree } = useReadContract({
        ...contract,
        functionName: "interestThree",
    });

    const { data: interestFour } = useReadContract({
        ...contract,
        functionName: "interestFour",
    });

    // V2 Status
    const { data: isV2Active } = useReadContract({
        ...contract,
        functionName: "isV2Active",
    });

    // Level Income Percents (0-19 for levels 1-20) - Using Array.from pattern
    const levelQueries = Array.from({ length: 20 }, (_, i) => {
        const { data } = useReadContract({
            ...contract,
            functionName: "levelIncomePercents",
            args: [BigInt(i)],
        });
        return data;
    });

    // Lifetime Reward Tiers (0-5 for 6 tiers) - Using Array.from pattern
    const rewardQueries = Array.from({ length: 6 }, (_, i) => {
        const { data } = useReadContract({
            ...contract,
            functionName: "lifetimeRewardTiers",
            args: [BigInt(i)],
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
                isV2Active: isV2Active ?? false,
            });
        }
    }, [
        stakingTier1, stakingTier2, stakingTier3Min, maxStaking,
        minDirectIncomeStake, directIncomePercent,
        minStakeForLevelCount, maxLevels, directBusinessForAllLevels,
        minWithdrawal,
        durationOne, durationTwo, durationThree, durationFour,
        interestOne, interestTwo, interestThree, interestFour,
        isV2Active,
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
        ...contract,
        functionName: "getContractStats",
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
        ...contract,
        functionName: "getPartners",
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
