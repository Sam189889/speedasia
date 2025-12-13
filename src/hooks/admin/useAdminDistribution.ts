"use client";

import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { useGbt } from "@/hooks/contracts/useSpeed";

/**
 * Hook for admin distribution management
 * Handles daily profit distribution to users
 */
export function useAdminDistribution() {
  const activeAccount = useActiveAccount();
  const contract = useGbt();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Distribute daily profit to specific users
   * @param users - Array of user addresses
   * @param dailyProfitRate - Daily profit rate percentage (e.g., 1.5 for 1.5%)
   */
  const distributeDailyProfit = async (
    users: string[],
    dailyProfitRate: number
  ): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    if (users.length === 0) {
      console.error("No users provided");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert percentage to contract format: 1.5% → 150, 2% → 200
      const rateForContract = BigInt(Math.floor(dailyProfitRate * 100));

      const transaction = prepareContractCall({
        contract,
        method: "function distributeDailyProfit(address[] _users, uint256 _dailyProfitRate)",
        params: [users, rateForContract],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("distributeDailyProfit error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Distribute to all eligible users automatically
   * @param dailyProfitRate - Daily profit rate percentage (e.g., 1.5 for 1.5%)
   */
  const distributeToEligibleUsers = async (
    dailyProfitRate: number
  ): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert percentage to contract format: 1.5% → 150, 2% → 200
      const rateForContract = BigInt(Math.floor(dailyProfitRate * 100));

      const transaction = prepareContractCall({
        contract,
        method: "function distributeToEligibleUsers(uint256 _dailyProfitRate)",
        params: [rateForContract],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("distributeToEligibleUsers error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Distribute to a batch of users (gas optimized)
   * @param startIndex - Starting user index
   * @param endIndex - Ending user index
   * @param dailyProfitRate - Daily profit rate percentage (e.g., 1.5 for 1.5%)
   */
  const distributeBatch = async (
    startIndex: number,
    endIndex: number,
    dailyProfitRate: number
  ): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    if (startIndex > endIndex) {
      console.error("Start index must be less than or equal to end index");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert percentage to contract format: 1.5% → 150, 2% → 200
      const rateForContract = BigInt(Math.floor(dailyProfitRate * 100));

      const batchSize = endIndex - startIndex + 1;
      const transaction = prepareContractCall({
        contract,
        method: "function distributeBatch(uint256 _startIndex, uint256 _endIndex, uint256 _dailyProfitRate)",
        params: [BigInt(startIndex), BigInt(endIndex), rateForContract],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("distributeBatch error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    // Functions
    distributeDailyProfit,
    distributeToEligibleUsers,
    distributeBatch,

    // State
    isProcessing,
    isPending,
  };
}
