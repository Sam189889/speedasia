"use client";

import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { useGbt } from '@/hooks/contracts/useSpeed';
import { toTokens } from 'thirdweb/utils';

/**
 * Hook to fetch and calculate user statistics from the GrowBit contract
 * Provides all user-related data including basic info, incomes, and investment details
 * @param targetAddress - Optional address to fetch stats for (defaults to connected wallet)
 */
export function useUserStats(targetAddress?: string) {
  const activeAccount = useActiveAccount();
  const userAddress = targetAddress || activeAccount?.address;
  const contract = useGbt();

  // Get user basic info directly from contract
  const { data: userBasicInfo, isPending: isUserBasicInfoLoading } = useReadContract({
    contract,
    method:
      "function getUserBasicInfo(address _user) view returns (address referrerAddress, address placementParentAddress, uint256 regTime)",
    params: [userAddress as string],
    queryOptions: {
      enabled: !!userAddress,
      retry: 1,
    },
  });

  // Get user incomes directly from contract
  const { data: userIncomes, isPending: isUserIncomesLoading } = useReadContract({
    contract,
    method:
      "function getUserIncomes(address _user) view returns (uint256 dailyProfit, uint256 referral, uint256 binary, uint256 level, uint256 passive, uint256 total, uint256 withdrawn, uint256 available)",
    params: [userAddress as string],
    queryOptions: {
      enabled: !!userAddress,
      retry: 1,
    },
  });

  // Get user investment info directly from contract
  const { data: userInvestmentInfo, isPending: isUserInvestmentInfoLoading } = useReadContract({
    contract,
    method:
      "function getUserInvestmentInfo(address _user) view returns (uint256 invested, uint256 withdrawn, uint256 packages)",
    params: [userAddress as string],
    queryOptions: {
      enabled: !!userAddress,
      retry: 1,
    },
  });

  // Debug logs
  console.log('useUserStats - userBasicInfo:', userBasicInfo);
  console.log('useUserStats - userIncomes:', userIncomes);
  console.log('useUserStats - userInvestmentInfo:', userInvestmentInfo);

  // Calculate parsed values from contract data
  const stats = {
    // Basic user information
    userAddress,
    referrerAddress: userBasicInfo?.[0],
    placementParentAddress: userBasicInfo?.[1],
    registrationTimestamp: userBasicInfo?.[2],
    registrationDate: userBasicInfo ? new Date(Number(userBasicInfo[2]) * 1000) : null,

    // Investment information
    totalInvestment: userInvestmentInfo ? parseFloat(toTokens(userInvestmentInfo[0], 18)) : 0,
    totalWithdrawn: userInvestmentInfo ? parseFloat(toTokens(userInvestmentInfo[1], 18)) : 0,
    totalPackages: userInvestmentInfo ? Number(userInvestmentInfo[2]) : 0,

    // Income breakdown
    dailyProfit: userIncomes ? parseFloat(toTokens(userIncomes[0], 18)) : 0,
    referralIncome: userIncomes ? parseFloat(toTokens(userIncomes[1], 18)) : 0,
    binaryIncome: userIncomes ? parseFloat(toTokens(userIncomes[2], 18)) : 0,
    levelIncome: userIncomes ? parseFloat(toTokens(userIncomes[3], 18)) : 0,
    passiveIncome: userIncomes ? parseFloat(toTokens(userIncomes[4], 18)) : 0,
    totalEarnings: userIncomes ? parseFloat(toTokens(userIncomes[5], 18)) : 0,
    withdrawnAmount: userIncomes ? parseFloat(toTokens(userIncomes[6], 18)) : 0,
    availableBalance: userIncomes ? parseFloat(toTokens(userIncomes[7], 18)) : 0,

    // Raw contract data (for advanced usage)
    rawUserBasicInfo: userBasicInfo,
    rawUserIncomes: userIncomes,
    rawUserInvestmentInfo: userInvestmentInfo,
  };

  // Combined loading state
  const isLoading = isUserIncomesLoading || isUserInvestmentInfoLoading || isUserBasicInfoLoading;

  // Helper functions for common calculations
  const getNetProfit = () => stats.totalEarnings - stats.totalInvestment;
  const getROIPercentage = () => stats.totalInvestment > 0 ? (stats.totalEarnings / stats.totalInvestment) * 100 : 0;
  const getDaysActive = () => {
    if (!stats.registrationDate) return 0;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - stats.registrationDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return {
    // Main stats object
    stats,

    // Loading states
    isLoading,
    isUserBasicInfoLoading,
    isUserIncomesLoading,
    isUserInvestmentInfoLoading,

    // Helper functions
    getNetProfit,
    getROIPercentage,
    getDaysActive,

    // Individual loading states for granular control
    loadingStates: {
      basicInfo: isUserBasicInfoLoading,
      incomes: isUserIncomesLoading,
      investment: isUserInvestmentInfoLoading,
    },
  };
}
