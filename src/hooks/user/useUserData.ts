"use client";
import { useReadContract } from "wagmi";
import { useSpeed } from "@/hooks/contracts/useSpeed";

/**
 * Hook to get user address by userId
 */
export function useUserByUserId(userId: `0x${string}` | undefined) {
  const contract = useSpeed();

  const { data, isPending } = useReadContract({
    ...contract,
    functionName: "userIdToAddress",
    args: [userId ?? "0x0000000000"],
    query: { enabled: !!userId },
  });

  return {
    userAddress: data,
    isLoading: isPending,
  };
}

/**
 * Hook to get userId by wallet address
 */
export function useUserIdByAddress(userAddress: string | undefined) {
  const contract = useSpeed();

  const { data, isPending } = useReadContract({
    ...contract,
    functionName: "addressToUserId",
    args: [(userAddress ?? "0x0000000000000000000000000000000000000000") as `0x${string}`],
    query: { enabled: !!userAddress },
  });

  return {
    userId: data as `0x${string}` | undefined,
    isLoading: isPending,
  };
}

/**
 * Hook to get all levels summary for a user
 */
export function useAllLevelsSummary(userId: `0x${string}` | undefined) {
  const contract = useSpeed();

  const { data, isPending } = useReadContract({
    ...contract,
    functionName: "getAllLevelsSummary",
    args: [userId ?? "0x0000000000"],
    query: { enabled: !!userId },
  });

  if (!data) {
    return {
      levelCounts: [] as bigint[],
      levelBusiness: [] as bigint[],
      isLoading: isPending,
    };
  }

  return {
    levelCounts: [...data[0]] as bigint[],
    levelBusiness: [...data[1]] as bigint[],
    isLoading: isPending,
  };
}

/**
 * Hook to get users at a specific level
 */
export function useLevelUsers(userId: `0x${string}` | undefined, level: number) {
  const contract = useSpeed();

  const { data, isPending } = useReadContract({
    ...contract,
    functionName: "getLevelUsers",
    args: [userId ?? "0x0000000000", BigInt(level)],
    query: { enabled: !!userId },
  });

  if (!data) {
    return {
      userIds: [] as `0x${string}`[],
      staked: [] as bigint[],
      isLoading: isPending,
    };
  }

  return {
    userIds: [...data[0]] as `0x${string}`[],
    staked: [...data[1]] as bigint[],
    isLoading: isPending,
  };
}

/**
 * Hook to get lifetime reward progress
 */
export function useLifetimeRewardProgress(userId: `0x${string}` | undefined) {
  const contract = useSpeed();

  const { data, isPending } = useReadContract({
    ...contract,
    functionName: "getLifetimeRewardProgress",
    args: [userId ?? "0x0000000000"],
    query: { enabled: !!userId },
  });

  if (!data) {
    return {
      teamSizeRequired: [] as bigint[],
      directsRequired: [] as bigint[],
      businessRequired: [] as bigint[],
      rewardAmounts: [] as bigint[],
      isClaimed: [] as boolean[],
      isEligible: [] as boolean[],
      isLoading: isPending,
    };
  }

  return {
    teamSizeRequired: [...data[0]] as bigint[],
    directsRequired: [...data[1]] as bigint[],
    businessRequired: [...data[2]] as bigint[],
    rewardAmounts: [...data[3]] as bigint[],
    isClaimed: [...data[4]] as boolean[],
    isEligible: [...data[5]] as boolean[],
    isLoading: isPending,
  };
}
