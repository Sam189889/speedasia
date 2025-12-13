"use client";

import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { useGbt } from "@/hooks/contracts/useSpeed";

/**
 * Hook for admin system configuration
 * Handles first user and distribution address settings
 */
export function useAdminSystemConfig() {
  const activeAccount = useActiveAccount();
  const contract = useGbt();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Set the first/root user of the platform
   * @param newFirstUser - Address of the new first user
   */
  const setFirstUser = async (newFirstUser: string): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function setFirstUser(address _newFirstUser)",
        params: [newFirstUser],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setFirstUser error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set the distribution address
   * @param newDistributionAddress - New distribution wallet address
   */
  const setDistributionAddress = async (
    newDistributionAddress: string
  ): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function setDistributionAddress(address _newDistributionAddress)",
        params: [newDistributionAddress],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setDistributionAddress error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Update the distribution address
   * @param newDistributionAddress - Updated distribution wallet address
   */
  const updateDistributionAddress = async (
    newDistributionAddress: string
  ): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function updateDistributionAddress(address _newDistributionAddress)",
        params: [newDistributionAddress],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("updateDistributionAddress error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set the platform fee address
   * @param newPlatformFeeAddress - New platform fee wallet address
   */
  const setPlatformFeeAddress = async (
    newPlatformFeeAddress: string
  ): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function setPlateformFeeAddress(address _newPlateformFeeAddress)",
        params: [newPlatformFeeAddress],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setPlatformFeeAddress error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    // Functions
    setFirstUser,
    setDistributionAddress,
    updateDistributionAddress,
    setPlatformFeeAddress,

    // State
    isProcessing,
    isPending,
  };
}
