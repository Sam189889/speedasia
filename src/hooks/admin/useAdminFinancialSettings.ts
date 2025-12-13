"use client";

import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { useGbt } from "@/hooks/contracts/useSpeed";

/**
 * Hook for admin financial settings
 * Handles investment amount, ROI, platform fee, trading capital
 */
export function useAdminFinancialSettings() {
  const activeAccount = useActiveAccount();
  const contract = useGbt();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Set the package investment amount
   * @param investmentAmount - Investment amount in USDT (will be converted to wei)
   */
  const setInvestmentAmount = async (investmentAmount: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function setInvestmentAmount(uint256 _investmentAmount)",
        params: [BigInt(Math.floor(investmentAmount * 1e18))],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setInvestmentAmount error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set maximum ROI percentage
   * @param maxROIPercent - ROI percentage (e.g., 200 for 200%)
   */
  const setMaxROIPercent = async (maxROIPercent: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function setMaxROIPercent(uint256 _maxROIPercent)",
        params: [BigInt(maxROIPercent)],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setMaxROIPercent error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set platform fee in USDT
   * @param platformFee - Platform fee in USDT (will be converted to wei)
   */
  const setPlatformFee = async (platformFee: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert USDT to wei (USDT has 18 decimals)
      const platformFeeInWei = BigInt(Math.floor(platformFee * 1e18));

      const transaction = prepareContractCall({
        contract,
        method: "function setPlateformFee(uint256 _plateformFee)",
        params: [platformFeeInWei],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setPlatformFee error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set trading capital in USDT
   * @param tradingCapital - Trading capital in USDT (will be converted to wei)
   */
  const setTradingCapital = async (tradingCapital: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert USDT to wei (USDT has 18 decimals)
      const tradingCapitalInWei = BigInt(Math.floor(tradingCapital * 1e18));

      const transaction = prepareContractCall({
        contract,
        method: "function setTradingCapital(uint256 _tradingCapital)",
        params: [tradingCapitalInWei],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setTradingCapital error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    // Functions
    setInvestmentAmount,
    setMaxROIPercent,
    setPlatformFee,
    setTradingCapital,

    // State
    isProcessing,
    isPending,
  };
}
