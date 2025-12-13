"use client";

import { useActiveAccount, useReadContract } from "thirdweb/react";
import { useGbt } from "@/hooks/contracts/useSpeed";
import { toTokens } from "thirdweb/utils";

/**
 * Hook to fetch user incomes data
 * Used for income breakdown display
 * @param targetAddress - Optional address to fetch income data for (defaults to connected wallet)
 */
export function useUserIncomes(targetAddress?: string) {
  const activeAccount = useActiveAccount();
  const userAddress = targetAddress || activeAccount?.address;
  const contract = useGbt();

  // Get user incomes for display
  const {
    data: userIncomes,
    isPending: isUserIncomesLoading,
    error: userIncomesError,
    refetch: refetchUserIncomes,
  } = useReadContract({
    contract,
    method:
      "function getUserIncomes(address _user) view returns (uint256 dailyProfit, uint256 referral, uint256 binary, uint256 level, uint256 passive, uint256 total, uint256 withdrawn, uint256 available)",
    params: [userAddress as string],
    queryOptions: {
      enabled: !!userAddress,
      retry: 1,
    },
  });

  return {
    // Income breakdown
    userIncomes: userIncomes
      ? {
        dailyProfit: userIncomes[0] as bigint,
        dailyProfitFormatted: toTokens(userIncomes[0] as bigint, 18),
        referral: userIncomes[1] as bigint,
        referralFormatted: toTokens(userIncomes[1] as bigint, 18),
        binary: userIncomes[2] as bigint,
        binaryFormatted: toTokens(userIncomes[2] as bigint, 18),
        level: userIncomes[3] as bigint,
        levelFormatted: toTokens(userIncomes[3] as bigint, 18),
        passive: userIncomes[4] as bigint,
        passiveFormatted: toTokens(userIncomes[4] as bigint, 18),
        total: userIncomes[5] as bigint,
        totalFormatted: toTokens(userIncomes[5] as bigint, 18),
        withdrawn: userIncomes[6] as bigint,
        withdrawnFormatted: toTokens(userIncomes[6] as bigint, 18),
        available: userIncomes[7] as bigint,
        availableFormatted: toTokens(userIncomes[7] as bigint, 18),
      }
      : null,

    // Loading and error states
    isLoading: isUserIncomesLoading,
    error: userIncomesError,

    // Refetch function
    refetchUserIncomes,
  };
}
