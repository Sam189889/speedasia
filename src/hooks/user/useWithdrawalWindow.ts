"use client";

import { useReadContract } from "thirdweb/react";
import { useInterface } from "@/hooks/contracts/useInterface";

/**
 * Hook to check if withdrawal window is currently open
 * Used by withdrawal functionality to enable/disable withdrawals
 */
export function useWithdrawalWindow() {
  const contract = useInterface();

  // Get withdrawal window details from contract
  const {
    data: withdrawalWindow,
    isPending: isLoading,
    error,
    refetch: refetchWithdrawalWindow,
  } = useReadContract({
    contract,
    method: "function getWithdrawalWindow() view returns (uint256 startHour, uint256 endHour, bool isOpen)",
    params: [],
    queryOptions: {
      retry: 1,
    },
  });

  // Extract values from the tuple
  const startHour = withdrawalWindow ? Number(withdrawalWindow[0]) : undefined;
  const endHour = withdrawalWindow ? Number(withdrawalWindow[1]) : undefined;
  const isWithdrawalWindowOpen = withdrawalWindow ? withdrawalWindow[2] : undefined;

  return {
    // Withdrawal window status
    isWithdrawalWindowOpen: isWithdrawalWindowOpen as boolean | undefined,
    
    // Withdrawal window hours
    startHour,
    endHour,

    // Loading and error states
    isLoading,
    error,

    // Refetch function
    refetchWithdrawalWindow,
  };
}
