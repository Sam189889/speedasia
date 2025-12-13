"use client";
import { useReadContract } from "thirdweb/react";
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
    activeStakesCount: bigint;
}

/**
 * Stake interface
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
        contract,
        method: "function getUserDashboard(bytes5 _userId) view returns ((bytes5 userId, address referrer, uint256 registrationTime, bool isActive) info, (bytes5[] directReferralIds, uint256 directReferralCount, uint256 qualifyingDirectCount, uint256 directBusinessVolume, uint256 qualifyingDirectBusiness, uint256 teamSize, uint256 teamBusinessVolume, uint256 unlockedLevels) team, (uint256 directIncome, uint256 levelIncome, uint256 stakingIncome, uint256 lifetimeRewardIncome, uint256 totalIncome, uint256 availableBalance, uint256 totalWithdrawn, uint256 lastClaimedRewardTier) incomes, (uint256 totalStaked, uint256 activeStakedAmount, uint256 activeStakesCount) stakingStats, (uint256 stakeId, uint256 amount, uint256 duration, uint256 interestRate, uint256 startTime, uint256 endTime, bool isActive, bool isClaimed)[] stakes, uint256 unlockedLevels, bool[20] levelsUnlocked, uint256 nextRewardTier, bool nextRewardEligible, uint256 nextRewardAmount)",
        params: [userId ?? "0x0000000000"] as const,
        queryOptions: { enabled: !!userId },
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
        activeStakesCount: stakingStatsRaw.activeStakesCount,
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
    }) => ({
        stakeId: s.stakeId,
        amount: s.amount,
        duration: s.duration,
        interestRate: s.interestRate,
        startTime: s.startTime,
        endTime: s.endTime,
        isActive: s.isActive,
        isClaimed: s.isClaimed,
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
