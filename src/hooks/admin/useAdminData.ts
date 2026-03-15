"use client";
import { useReadContract } from "wagmi";
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
        ...contract,
        functionName: "getContractStats",
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
        ...contract,
        functionName: "firstUser",
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
        ...contract,
        functionName: "totalUsersCount",
    });

    return {
        totalUsers: data ?? BigInt(0),
        isLoading: isPending,
    };
}

/**
 * Hook to get total stakes migrated to V2
 */
export function useTotalStakesMigrated() {
    const contract = useSpeed();

    const { data, isPending, refetch } = useReadContract({
        ...contract,
        functionName: "totalStakesMigrated",
    });

    return {
        totalStakesMigrated: data ?? BigInt(0),
        isLoading: isPending,
        refetch,
    };
}

/**
 * Hook to get user address by index (for pagination)
 * @param index - User index in allUsers array
 */
export function useUserByIndex(index: number) {
    const contract = useSpeed();

    const { data, isPending } = useReadContract({
        ...contract,
        functionName: "allUsers",
        args: [BigInt(index)],
        query: { enabled: index >= 0 },
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
        ...contract,
        functionName: "getPartners",
    });

    // If still loading and no data, return loading state
    if (isPending && !data) {
        return {
            partners: [] as Partner[],
            isLoading: true,
            refetch,
        };
    }

    // If no data or empty arrays, return empty partners (not loading)
    if (!data || !data[0] || data[0].length === 0) {
        return {
            partners: [] as Partner[],
            isLoading: false,
            refetch,
        };
    }

    const partners: Partner[] = (data[0] as readonly `0x${string}`[]).map((address, index) => ({
        address: address as string,
        share: (data[1] as readonly bigint[])[index],
    }));

    return {
        partners,
        isLoading: false,
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
