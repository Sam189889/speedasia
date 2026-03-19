'use client';

import { useReadContract } from 'wagmi';
import { SPEED_ADDRESS } from '@/constants/addresses';
import { SpeedAsiaABI } from '@/constants/abis';

/**
 * Hook to get leg-wise business breakdown for lifetime rewards
 * Returns strongest leg, other legs sum, and individual leg volumes
 */
export function useLegsBreakdown(userId: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: SPEED_ADDRESS,
    abi: SpeedAsiaABI,
    functionName: 'getLegsBreakdown',
    args: userId ? [userId] : undefined,
    query: {
      enabled: !!userId,
      refetchInterval: 30000, // Refresh every 30s
    },
  });

  // Parse the returned data
  const strongestLeg = data?.[0] ? BigInt(data[0].toString()) : BigInt(0);
  const otherLegsSum = data?.[1] ? BigInt(data[1].toString()) : BigInt(0);
  const legVolumes = data?.[2] ? (data[2] as bigint[]) : [];

  return {
    strongestLeg,
    otherLegsSum,
    legVolumes,
    totalLegs: legVolumes.length,
    isLoading,
    error,
    refetch,
  };
}
