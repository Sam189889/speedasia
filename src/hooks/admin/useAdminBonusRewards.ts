"use client";

import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { useGbt } from "@/hooks/contracts/useSpeed";

/**
 * Hook for admin bonus and rewards settings
 * Handles referral, binary, level, and passive bonuses
 */
export function useAdminBonusRewards() {
  const activeAccount = useActiveAccount();
  const contract = useGbt();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Set referral bonus in USDT
   * @param referralBonus - Referral bonus in USDT (will be converted to wei)
   */
  const setReferralBonus = async (referralBonus: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert USDT to wei (USDT has 18 decimals)
      const referralBonusInWei = BigInt(Math.floor(referralBonus * 1e18));

      const transaction = prepareContractCall({
        contract,
        method: "function setReferralBonus(uint256 _referralBonus)",
        params: [referralBonusInWei],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setReferralBonus error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set binary tree bonus percentage
   * @param binaryPercent - Binary bonus percentage
   */
  const setBinaryPercent = async (binaryPercent: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function setBinaryPercent(uint256 _binaryPercent)",
        params: [BigInt(binaryPercent)],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setBinaryPercent error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set bonus for a specific level
   * @param level - Level number (1-9)
   * @param bonus - Bonus in USDT (will be converted to wei)
   */
  const setLevelBonus = async (level: number, bonus: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert USDT to wei (USDT has 18 decimals)
      const bonusInWei = BigInt(Math.floor(bonus * 1e18));

      const transaction = prepareContractCall({
        contract,
        method: "function setLevelBonus(uint256 _level, uint256 _bonus)",
        params: [BigInt(level), bonusInWei],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setLevelBonus error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set bonuses for all 9 levels at once
   * @param bonuses - Array of 9 bonus amounts in USDT (will be converted to wei)
   */
  const setAllLevelBonuses = async (bonuses: number[]): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    if (bonuses.length !== 9) {
      console.error("Must provide exactly 9 bonuses");
      return false;
    }

    try {
      setIsProcessing(true);

      // Convert USDT to wei and create tuple of exactly 9 bigints
      const bonusTuple: readonly [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint] = [
        BigInt(Math.floor(bonuses[0] * 1e18)),
        BigInt(Math.floor(bonuses[1] * 1e18)),
        BigInt(Math.floor(bonuses[2] * 1e18)),
        BigInt(Math.floor(bonuses[3] * 1e18)),
        BigInt(Math.floor(bonuses[4] * 1e18)),
        BigInt(Math.floor(bonuses[5] * 1e18)),
        BigInt(Math.floor(bonuses[6] * 1e18)),
        BigInt(Math.floor(bonuses[7] * 1e18)),
        BigInt(Math.floor(bonuses[8] * 1e18)),
      ];

      const transaction = prepareContractCall({
        contract,
        method: "function setAllLevelBonuses(uint256[9] _bonuses)",
        params: [bonusTuple],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setAllLevelBonuses error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Set passive income percentage
   * @param passivePercent - Passive income percentage
   */
  const setPassivePercent = async (passivePercent: number): Promise<boolean> => {
    if (!activeAccount?.address) {
      console.error("No active account");
      return false;
    }

    try {
      setIsProcessing(true);

      const transaction = prepareContractCall({
        contract,
        method: "function setPassivePercent(uint256 _passivePercent)",
        params: [BigInt(passivePercent)],
      });

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: resolve,
          onError: reject,
        });
      });

      return true;
    } catch (error) {
      console.error("setPassivePercent error:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    // Functions
    setReferralBonus,
    setBinaryPercent,
    setLevelBonus,
    setAllLevelBonuses,
    setPassivePercent,

    // State
    isProcessing,
    isPending,
  };
}
