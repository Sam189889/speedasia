"use client";

import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { useGbt } from "@/hooks/contracts/useSpeed";

/**
 * Hook for admin withdrawal settings
 * Handles withdrawal fee and withdrawal window configuration
 */
export function useAdminWithdrawalSettings() {
  const activeAccount = useActiveAccount();
  const contract = useGbt();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Set withdrawal fee percentage
   * @param feePercent - Withdrawal fee percentage (e.g., 20 for 20%)
   */
  const setWithdrawalFeePercent = async (feePercent: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function setWithdrawalFeePercent(uint256 _feePercent)",
        params: [BigInt(feePercent)],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setWithdrawalFeePercent error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set withdrawal window hours (UTC)
   * @param startHour - Start hour (0-23)
   * @param endHour - End hour (0-23)
   */
  const setWithdrawalWindow = async (
    startHour: number,
    endHour: number
  ): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
      console.error("Hours must be between 0 and 23");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function setWithdrawalWindow(uint256 _startHour, uint256 _endHour)",
        params: [BigInt(startHour), BigInt(endHour)],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setWithdrawalWindow error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    // Functions
    setWithdrawalFeePercent,
    setWithdrawalWindow,

    // State
    isProcessing,
    isPending,
  };
}
