"use client";
import { useReadContract } from "wagmi";
import { useSpeed } from "@/hooks/contracts/useSpeed";

/**
 * User Info interface
 */
export interface UserInfo {
    userId: `0x${string}`;
    referrer: string;
    registrationTime: bigint;
    isActive: boolean;
}

/**
 * Team data interface
 */
export interface TeamData {
    directReferralIds: `0x${string}`[];
    directReferralCount: bigint;
    qualifyingDirectCount: bigint;
    directBusinessVolume: bigint;
    qualifyingDirectBusiness: bigint;
    teamSize: bigint;
    teamBusinessVolume: bigint;
    unlockedLevels: bigint;
}

/**
 * Income data interface
 */
export interface IncomeData {
    directIncome: bigint;
    levelIncome: bigint;
    stakingIncome: bigint;
    lifetimeRewardIncome: bigint;
    totalIncome: bigint;
    availableBalance: bigint;
    totalWithdrawn: bigint;
    lastClaimedRewardTier: bigint;
}

/**
 * Staking stats interface
 */
export interface StakingStats {
    totalStaked: bigint;
    activeStakedAmount: bigint;
    totalClaimed: bigint;
    activeStakesCount: bigint;
    lastStakeAmount: bigint;
}

/**
 * Stake interface (V2 compatible)
 */
export interface Stake {
    stakeId: bigint;
    amount: bigint;
    duration: bigint;
    interestRate: bigint;
    startTime: bigint;
    endTime: bigint;
    isActive: boolean;
    isClaimed: boolean;
    lastRoiClaimTime: bigint;
    totalRoiEarned: bigint;
    isMigrated: boolean;
    boostedRoiPercent: bigint;
}

/**
 * Complete User Dashboard data
 */
export interface UserDashboard {
    info: UserInfo;
    team: TeamData;
    incomes: IncomeData;
    stakingStats: StakingStats;
    stakes: Stake[];
    unlockedLevels: bigint;
    levelsUnlocked: boolean[];
    nextRewardTier: bigint;
    nextRewardEligible: boolean;
    nextRewardAmount: bigint;
}

/**
 * Hook to get complete user dashboard data
 * This is a comprehensive hook that fetches all user data in one call
 */
export function useUserDashboard(userId: `0x${string}` | undefined) {
    const contract = useSpeed();

    const { data, isPending, refetch } = useReadContract({
        ...contract,
        functionName: "getUserDashboard",
        args: [userId ?? "0x0000000000"],
        query: { enabled: !!userId },
    });

    if (!data) {
        return {
            dashboard: null as UserDashboard | null,
            isLoading: isPending,
            refetch,
        };
    }

    // Parse the complex return data
    const [infoRaw, teamRaw, incomesRaw, stakingStatsRaw, stakesRaw, unlockedLevels, levelsUnlocked, nextRewardTier, nextRewardEligible, nextRewardAmount] = data;

    const info: UserInfo = {
        userId: infoRaw.userId as `0x${string}`,
        referrer: infoRaw.referrer,
        registrationTime: infoRaw.registrationTime,
        isActive: infoRaw.isActive,
    };

    const team: TeamData = {
        directReferralIds: teamRaw.directReferralIds as `0x${string}`[],
        directReferralCount: teamRaw.directReferralCount,
        qualifyingDirectCount: teamRaw.qualifyingDirectCount,
        directBusinessVolume: teamRaw.directBusinessVolume,
        qualifyingDirectBusiness: teamRaw.qualifyingDirectBusiness,
        teamSize: teamRaw.teamSize,
        teamBusinessVolume: teamRaw.teamBusinessVolume,
        unlockedLevels: teamRaw.unlockedLevels,
    };

    const incomes: IncomeData = {
        directIncome: incomesRaw.directIncome,
        levelIncome: incomesRaw.levelIncome,
        stakingIncome: incomesRaw.stakingIncome,
        lifetimeRewardIncome: incomesRaw.lifetimeRewardIncome,
        totalIncome: incomesRaw.totalIncome,
        availableBalance: incomesRaw.availableBalance,
        totalWithdrawn: incomesRaw.totalWithdrawn,
        lastClaimedRewardTier: incomesRaw.lastClaimedRewardTier,
    };

    const stakingStats: StakingStats = {
        totalStaked: stakingStatsRaw.totalStaked,
        activeStakedAmount: stakingStatsRaw.activeStakedAmount,
        totalClaimed: stakingStatsRaw.totalClaimed,
        activeStakesCount: stakingStatsRaw.activeStakesCount,
        lastStakeAmount: stakingStatsRaw.lastStakeAmount,
    };

    const stakes: Stake[] = stakesRaw.map((s: {
        stakeId: bigint;
        amount: bigint;
        duration: bigint;
        interestRate: bigint;
        startTime: bigint;
        endTime: bigint;
        isActive: boolean;
        isClaimed: boolean;
        lastRoiClaimTime: bigint;
        totalRoiEarned: bigint;
        isMigrated: boolean;
        boostedRoiPercent: bigint;
    }) => ({
        stakeId: s.stakeId,
        amount: s.amount,
        duration: s.duration,
        interestRate: s.interestRate,
        startTime: s.startTime,
        endTime: s.endTime,
        isActive: s.isActive,
        isClaimed: s.isClaimed,
        lastRoiClaimTime: s.lastRoiClaimTime,
        totalRoiEarned: s.totalRoiEarned,
        isMigrated: s.isMigrated,
        boostedRoiPercent: s.boostedRoiPercent,
    }));

    const dashboard: UserDashboard = {
        info,
        team,
        incomes,
        stakingStats,
        stakes,
        unlockedLevels,
        levelsUnlocked: [...levelsUnlocked],
        nextRewardTier,
        nextRewardEligible,
        nextRewardAmount,
    };

    return {
        dashboard,
        isLoading: isPending,
        refetch,
    };
}
