"use client";
import { useWriteContract } from "wagmi";
import { useInterface } from "@/hooks/contracts/useInterface";
import { useCallback } from "react";

/**
 * Hook for all user transactional functions
 * Includes: register, stake, claimStake, claimLifetimeReward, withdraw
 */
export function useUserTransactions() {
  const contract = useInterface();
  const { writeContractAsync, isPending, error } = useWriteContract();

  /**
   * Register a new user with first stake
   * @param referrerId - Referrer's userId (bytes5)
   * @param amount - Stake amount in USDT (wei)
   * @param duration - Staking duration (1-4)
   */
  const register = useCallback(async (
    referrerId: `0x${string}`,
    amount: bigint,
    duration: bigint
  ) => {
    return writeContractAsync({
      ...contract,
      functionName: "register",
      args: [referrerId, amount, duration],
    });
  }, [contract, writeContractAsync]);

  /**
   * Create a new stake
   * @param userId - User's userId (bytes5)
   * @param amount - Stake amount in USDT (wei)
   * @param duration - Staking duration (1-4)
   */
  const stake = useCallback(async (
    userId: `0x${string}`,
    amount: bigint,
    duration: bigint
  ) => {
    return writeContractAsync({
      ...contract,
      functionName: "stake",
      args: [userId, amount, duration],
    });
  }, [contract, writeContractAsync]);

  /**
   * Claim a completed stake
   * @param userId - User's userId (bytes5)
   * @param stakeIndex - Index of the stake to claim
   */
  const claimStake = useCallback(async (
    userId: `0x${string}`,
    stakeIndex: bigint
  ) => {
    return writeContractAsync({
      ...contract,
      functionName: "claimStake",
      args: [userId, stakeIndex],
    });
  }, [contract, writeContractAsync]);

  /**
   * Claim lifetime reward
   * @param userId - User's userId (bytes5)
   */
  const claimLifetimeReward = useCallback(async (
    userId: `0x${string}`
  ) => {
    return writeContractAsync({
      ...contract,
      functionName: "claimLifetimeReward",
      args: [userId],
    });
  }, [contract, writeContractAsync]);

  /**
   * Withdraw available balance
   * @param userId - User's userId (bytes5)
   * @param amount - Amount to withdraw in USDT (wei)
   */
  const withdraw = useCallback(async (
    userId: `0x${string}`,
    amount: bigint
  ) => {
    return writeContractAsync({
      ...contract,
      functionName: "withdraw",
      args: [userId, amount],
    });
  }, [contract, writeContractAsync]);

  /**
   * Claim matured stake and restake in one transaction
   * @param userId - User's userId (bytes5)
   * @param stakeIndex - Index of stake to claim
   * @param restakeAmount - Amount from claimed payout to restake
   * @param additionalAmount - Extra amount from wallet (0 if none)
   * @param duration - Duration for new stake in seconds
   */
  const claimAndRestake = useCallback(async (
    userId: `0x${string}`,
    stakeIndex: bigint,
    restakeAmount: bigint,
    additionalAmount: bigint,
    duration: bigint
  ) => {
    return writeContractAsync({
      ...contract,
      functionName: "claimAndRestake",
      args: [userId, stakeIndex, restakeAmount, additionalAmount, duration],
    });
  }, [contract, writeContractAsync]);

  /**
   * Claim daily ROI (V2 only)
   * @param userId - User's userId (bytes5)
   * @param stakeIndex - Index of the stake to claim ROI from
   */
  const claimDailyRoi = useCallback(async (
    userId: `0x${string}`,
    stakeIndex: bigint
  ) => {
    return writeContractAsync({
      ...contract,
      functionName: "claimDailyRoi",
      args: [userId, stakeIndex],
    });
  }, [contract, writeContractAsync]);

  /**
   * Withdraw capital and close stake (V2 only)
   * @param userId - User's userId (bytes5)
   * @param stakeIndex - Index of the stake to withdraw capital from
   */
  const withdrawCapital = useCallback(async (
    userId: `0x${string}`,
    stakeIndex: bigint
  ) => {
    return writeContractAsync({
      ...contract,
      functionName: "withdrawCapital",
      args: [userId, stakeIndex],
    });
  }, [contract, writeContractAsync]);

  /**
   * Claim and compound - close old stake, create new stake with capital + ROI + additional (V2 only)
   * @param userId - User's userId (bytes5)
   * @param stakeIndex - Index of the stake to compound
   * @param additionalAmount - Optional additional USDT from wallet (0 if none)
   */
  const claimAndCompound = useCallback(async (
    userId: `0x${string}`,
    stakeIndex: bigint,
    additionalAmount: bigint
  ) => {
    return writeContractAsync({
      ...contract,
      functionName: "claimAndCompound",
      args: [userId, stakeIndex, additionalAmount],
    });
  }, [contract, writeContractAsync]);

  return {
    // Transaction functions
    register,
    stake,
    claimStake,
    claimAndRestake,
    claimLifetimeReward,
    withdraw,
    
    // V2 functions
    claimDailyRoi,
    withdrawCapital,
    claimAndCompound,

    // State
    isPending,
    error,
  };
}
