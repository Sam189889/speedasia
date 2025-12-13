"use client";

import { useActiveAccount, useReadContract } from "thirdweb/react";
import { useInterface } from "@/hooks/contracts/useInterface";

/**
 * Custom hook to check if a user is registered
 * @param targetAddress - Optional address to check registration for (defaults to connected wallet)
 */
export function useRegistrationCheck(targetAddress?: string) {
  const activeAccount = useActiveAccount();
  const userAddress = targetAddress || activeAccount?.address;
  const contract = useInterface();

  const {
    data: isRegistered,
    isPending: isLoading,
    error,
  } = useReadContract({
    contract,
    method: "function isUserRegistered(address userAddress) view returns (bool)",
    params: [userAddress as string],
  });

  return {
    isRegistered: isRegistered as boolean | undefined,
    isLoading,
    error,
  };
}
