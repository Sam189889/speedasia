"use client";
import { useReadContract } from "thirdweb/react";
import { useSpeed } from "@/hooks/contracts/useSpeed";

/**
 * Contract Stats interface
 */
export interface ContractStats {
    totalUsers: bigint;
    totalStaked: bigint;
    totalWithdrawn: bigint;
    totalDirectIncome: bigint;
    totalLevelIncome: bigint;
    totalStakingIncome: bigint;
    totalLifetimeRewards: bigint;
    contractBalance: bigint;
}

/**
 * Hook to get contract statistics
 */
export function useContractStats() {
    const contract = useSpeed();

    const { data, isPending, refetch } = useReadContract({
        contract,
        method: "function getContractStats() view returns (uint256 _totalUsers, uint256 _totalStaked, uint256 _totalWithdrawn, uint256 _totalDirectIncome, uint256 _totalLevelIncome, uint256 _totalStakingIncome, uint256 _totalLifetimeRewards, uint256 _contractBalance)",
        params: [],
    });

    if (!data) {
        return {
            stats: null,
            isLoading: isPending,
            refetch,
        };
    }

    const stats: ContractStats = {
        totalUsers: data[0],
        totalStaked: data[1],
        totalWithdrawn: data[2],
        totalDirectIncome: data[3],
        totalLevelIncome: data[4],
        totalStakingIncome: data[5],
        totalLifetimeRewards: data[6],
        contractBalance: data[7],
    };

    return {
        stats,
        isLoading: isPending,
        refetch,
    };
}

/**
 * Hook to get first user address
 */
export function useFirstUser() {
    const contract = useSpeed();

    const { data, isPending, refetch } = useReadContract({
        contract,
        method: "function firstUser() view returns (address)",
        params: [],
    });

    return {
        firstUser: data ?? null,
        isLoading: isPending,
        refetch,
    };
}

/**
 * Hook to get total users count
 */
export function useTotalUsersCount() {
    const contract = useSpeed();

    const { data, isPending } = useReadContract({
        contract,
        method: "function totalUsersCount() view returns (uint256)",
        params: [],
    });

    return {
        totalUsers: data ?? BigInt(0),
        isLoading: isPending,
    };
}

/**
 * Hook to get user address by index (for pagination)
 * @param index - User index in allUsers array
 */
export function useUserByIndex(index: number) {
    const contract = useSpeed();

    const { data, isPending } = useReadContract({
        contract,
        method: "function allUsers(uint256) view returns (address)",
        params: [BigInt(index)],
        queryOptions: { enabled: index >= 0 },
    });

    return {
        userAddress: data ?? null,
        isLoading: isPending,
    };
}

/**
 * Partner data interface
 */
export interface Partner {
    address: string;
    share: bigint;
}

/**
 * Hook to get partners list
 */
export function usePartners() {
    const contract = useSpeed();

    const { data, isPending, refetch } = useReadContract({
        contract,
        method: "function getPartners() view returns (address[], uint256[])",
        params: [],
    });

    if (!data) {
        return {
            partners: [] as Partner[],
            isLoading: isPending,
            refetch,
        };
    }

    const partners: Partner[] = data[0].map((address: string, index: number) => ({
        address,
        share: data[1][index],
    }));

    return {
        partners,
        isLoading: isPending,
        refetch,
    };
}

/**
 * Combined Admin Dashboard hook
 */
export function useAdminDashboard() {
    const { stats, isLoading: statsLoading, refetch: refetchStats } = useContractStats();
    const { partners, isLoading: partnersLoading, refetch: refetchPartners } = usePartners();

    return {
        stats,
        partners,
        isLoading: statsLoading || partnersLoading,
        refetch: () => {
            refetchStats();
            refetchPartners();
        },
    };
}
