"use client";

import { useState, useEffect, useMemo } from 'react';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { useGbt } from '@/hooks/contracts/useSpeed';
import { toTokens } from 'thirdweb/utils';

export interface TreeNode {
  address: string;
  parent: string | null;
}

/**
 * Hook to manage user team data, binary tree navigation, and referrals
 * Provides centralized team management functionality for TeamTab
 * @param targetAddress - Optional address to fetch team data for (defaults to connected wallet)
 */
export function useUserTeam(targetAddress?: string) {
  const activeAccount = useActiveAccount();
  const userAddress = targetAddress || activeAccount?.address;
  const contract = useGbt();

  // Initialize root node with useMemo for stability
  const initialNode = useMemo<TreeNode | null>(() => {
    if (!userAddress) return null;
    return {
      address: userAddress,
      parent: null,
    };
  }, [userAddress]);

  // State for binary tree navigation
  const [currentNode, setCurrentNode] = useState<TreeNode | null>(initialNode);
  const [navigationHistory, setNavigationHistory] = useState<TreeNode[]>([]);

  // Update currentNode when initialNode changes
  useEffect(() => {
    if (initialNode && !currentNode) {
      setCurrentNode(initialNode);
    }
  }, [initialNode, currentNode]);

  // Get user's direct referrals
  const { data: referrals, isPending: isReferralsLoading } = useReadContract({
    contract,
    method: "function getReferrals(address _user) view returns (address[])",
    params: [userAddress as string],
    queryOptions: {
      enabled: !!userAddress,
      retry: 1,
    },
  });

  // Get user's team info (for stats display)
  const { data: teamInfo, isPending: isTeamInfoLoading } = useReadContract({
    contract,
    method: "function getTeamInfo(address _user) view returns (address leftChild, address rightChild, uint256 leftVolume, uint256 rightVolume, uint256 directReferrals)",
    params: [userAddress as string],
    queryOptions: {
      enabled: !!userAddress,
      retry: 1,
    },
  });

  // Get team info for current node in tree
  const { data: currentTeamData, isPending: isCurrentTeamLoading } = useReadContract({
    contract,
    method: "function getTeamInfo(address _user) view returns (address leftChild, address rightChild, uint256 leftVolume, uint256 rightVolume, uint256 directReferrals)",
    params: [currentNode?.address as string],
    queryOptions: {
      enabled: !!currentNode?.address,
      retry: 1,
    },
  });

  // Get income data for current node in tree
  const { data: currentIncomeData, isPending: isCurrentIncomeLoading } = useReadContract({
    contract,
    method: "function getUserIncomes(address _user) view returns (uint256 dailyProfit, uint256 referral, uint256 binary, uint256 level, uint256 passive, uint256 total, uint256 withdrawn, uint256 available)",
    params: [currentNode?.address as string],
    queryOptions: {
      enabled: !!currentNode?.address,
      retry: 1,
    },
  });

  // Debug logs
  console.log('useUserTeam - referrals:', referrals);
  console.log('useUserTeam - teamInfo:', teamInfo);
  console.log('useUserTeam - currentTeamData:', currentTeamData);
  console.log('useUserTeam - currentNode:', currentNode);

  // Parse user's team statistics
  const userTeamStats = {
    directReferralsCount: referrals?.length || 0,
    leftVolume: teamInfo ? parseFloat(toTokens(teamInfo[2] as bigint, 18)) : 0,
    rightVolume: teamInfo ? parseFloat(toTokens(teamInfo[3] as bigint, 18)) : 0,
    totalVolume: teamInfo ? parseFloat(toTokens(teamInfo[2] as bigint, 18)) + parseFloat(toTokens(teamInfo[3] as bigint, 18)) : 0,
    leftChild: teamInfo?.[0] as string,
    rightChild: teamInfo?.[1] as string,
    directReferrals: referrals || [],
  };

  // Parse current node data
  const currentNodeData = {
    address: currentNode?.address,
    leftChild: currentTeamData?.[0] as string,
    rightChild: currentTeamData?.[1] as string,
    leftVolume: currentTeamData ? toTokens(currentTeamData[2] as bigint, 18) : '0',
    rightVolume: currentTeamData ? toTokens(currentTeamData[3] as bigint, 18) : '0',
    totalIncome: currentIncomeData ? toTokens(currentIncomeData[5] as bigint, 18) : '0',
    isUserNode: currentNode?.address === userAddress,
  };

  // Navigation functions
  const navigateToChild = (childAddress: string) => {
    if (!childAddress || childAddress === '0x0000000000000000000000000000000000000000' || !currentNode) {
      return;
    }

    // Add current node to history
    setNavigationHistory([...navigationHistory, currentNode]);

    // Navigate to child
    setCurrentNode({
      address: childAddress,
      parent: currentNode.address,
    });
  };

  const navigateBack = () => {
    if (navigationHistory.length === 0) return;

    const previousNode = navigationHistory[navigationHistory.length - 1];
    setNavigationHistory(navigationHistory.slice(0, -1));
    setCurrentNode(previousNode);
  };

  const resetToRoot = () => {
    if (!userAddress) return;

    setCurrentNode({
      address: userAddress,
      parent: null,
    });
    setNavigationHistory([]);
  };

  // Helper function to check if address is valid (not zero address)
  const isValidAddress = (address: string | undefined) => {
    return address && address !== '0x0000000000000000000000000000000000000000';
  };

  // Combined loading states
  const isLoading = isReferralsLoading || isTeamInfoLoading;
  const isCurrentNodeLoading = isCurrentTeamLoading || isCurrentIncomeLoading;

  return {
    // User data
    userAddress,
    userTeamStats,

    // Current node data
    currentNode,
    currentNodeData,
    navigationHistory,

    // Navigation functions
    navigateToChild,
    navigateBack,
    resetToRoot,

    // Helper functions
    isValidAddress,

    // Loading states
    isLoading,
    isCurrentNodeLoading,
    loadingStates: {
      referrals: isReferralsLoading,
      teamInfo: isTeamInfoLoading,
      currentTeam: isCurrentTeamLoading,
      currentIncome: isCurrentIncomeLoading,
    },

    // Raw contract data (for advanced usage)
    rawData: {
      referrals,
      teamInfo,
      currentTeamData,
      currentIncomeData,
    },
  };
}

/**
 * Hook to get individual referral data for a specific address
 * Used within referral cards for detailed information
 */
export function useReferralData(referralAddress: string) {
  const contract = useGbt();

  const { data: referralBasicInfo, isPending: isBasicInfoLoading } = useReadContract({
    contract,
    method: "function getUserBasicInfo(address _user) view returns (address referrerAddress, address placementParentAddress, uint256 regTime)",
    params: [referralAddress],
    queryOptions: {
      enabled: !!referralAddress,
      retry: 1,
    },
  });

  const { data: referralInvestmentInfo, isPending: isInvestmentLoading } = useReadContract({
    contract,
    method: "function getUserInvestmentInfo(address _user) view returns (uint256 invested, uint256 withdrawn, uint256 packages)",
    params: [referralAddress],
    queryOptions: {
      enabled: !!referralAddress,
      retry: 1,
    },
  });

  const referralData = {
    address: referralAddress,
    placementParent: referralBasicInfo?.[1] as string,
    registrationTime: referralBasicInfo?.[2],
    packageCount: referralInvestmentInfo ? Number(referralInvestmentInfo[2]) : 0,
    totalInvestment: referralInvestmentInfo ? Number(toTokens(referralInvestmentInfo[0] as bigint, 18)) : 0,
    totalWithdrawn: referralInvestmentInfo ? Number(toTokens(referralInvestmentInfo[1] as bigint, 18)) : 0,
  };

  const isLoading = isBasicInfoLoading || isInvestmentLoading;

  return {
    referralData,
    isLoading,
    rawData: {
      basicInfo: referralBasicInfo,
      investmentInfo: referralInvestmentInfo,
    },
  };
}
