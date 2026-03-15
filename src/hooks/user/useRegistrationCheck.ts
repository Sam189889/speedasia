"use client";

import { useAccount, useReadContract } from "wagmi";
import { useSpeed } from "@/hooks/contracts/useSpeed";

/**
 * Custom hook to check if a user is registered
 * @param targetAddress - Optional address to check registration for (defaults to connected wallet)
 */
export function useRegistrationCheck(targetAddress?: string) {
  const { address: activeAccount } = useAccount();
  const userAddress = targetAddress || activeAccount;
  const contract = useSpeed();

  const {
    data: userId,
    isPending: isLoading,
    error,
  } = useReadContract({
    ...contract,
    functionName: "addressToUserId",
    args: [(userAddress || "0x0000000000000000000000000000000000000000") as `0x${string}`],
    query: { enabled: !!userAddress },
  });

  // User is registered if userId is not zero (0x0000000000)
  const isRegistered = userId ? userId !== "0x0000000000" : false;

  return {
    isRegistered,
    isLoading,
    error,
  };
}
