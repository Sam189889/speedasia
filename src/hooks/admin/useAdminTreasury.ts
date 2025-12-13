"use client";

import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { useGbt } from "@/hooks/contracts/useSpeed";

/**
 * Hook for admin treasury management
 * Handles USDT deposits and withdrawals from contract
 */
export function useAdminTreasury() {
  const activeAccount = useActiveAccount();
  const contract = useGbt();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Withdraw USDT from contract to admin wallet
   * @param amount - Amount in USDT (will be converted to wei)
   */
  const withdrawUSDT = async (amount: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    if (amount <= 0) {
      console.error("Amount must be greater than 0");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert USDT to wei (USDT has 18 decimals)
      const amountInWei = BigInt(Math.floor(amount * 1e18));

      const transaction = prepareContractCall({
        contract,
        method: "function withdrawUSDT(uint256 _amount)",
        params: [amountInWei],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("withdrawUSDT error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Deposit USDT to contract from admin wallet
   * @param amount - Amount in USDT (will be converted to wei)
   */
  const depositUSDT = async (amount: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    if (amount <= 0) {
      console.error("Amount must be greater than 0");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert USDT to wei (USDT has 18 decimals)
      const amountInWei = BigInt(Math.floor(amount * 1e18));

      const transaction = prepareContractCall({
        contract,
        method: "function depositUSDT(uint256 _amount)",
        params: [amountInWei],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("depositUSDT error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    // Functions
    withdrawUSDT,
    depositUSDT,

    // State
    isProcessing,
    isPending,
  };
}
