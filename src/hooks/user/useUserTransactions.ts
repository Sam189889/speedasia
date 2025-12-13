"use client";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { useSpeed } from "@/hooks/contracts/useSpeed";
import { useCallback } from "react";

/**
 * Hook for all user transactional functions
 * Includes: register, stake, claimStake, claimLifetimeReward, withdraw
 */
export function useUserTransactions() {
  const contract = useSpeed();
  const { mutateAsync: sendTransaction, isPending, error } = useSendTransaction();

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
    const transaction = prepareContractCall({
      contract,
      method: "function register(bytes5 _referrerId, uint256 _amount, uint256 _duration)",
      params: [referrerId, amount, duration],
    });
    return sendTransaction(transaction);
  }, [contract, sendTransaction]);

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
    const transaction = prepareContractCall({
      contract,
      method: "function stake(bytes5 _userId, uint256 _amount, uint256 _duration)",
      params: [userId, amount, duration],
    });
    return sendTransaction(transaction);
  }, [contract, sendTransaction]);

  /**
   * Claim a completed stake
   * @param userId - User's userId (bytes5)
   * @param stakeIndex - Index of the stake to claim
   */
  const claimStake = useCallback(async (
    userId: `0x${string}`,
    stakeIndex: bigint
  ) => {
    const transaction = prepareContractCall({
      contract,
      method: "function claimStake(bytes5 _userId, uint256 _stakeIndex)",
      params: [userId, stakeIndex],
    });
    return sendTransaction(transaction);
  }, [contract, sendTransaction]);

  /**
   * Claim lifetime reward
   * @param userId - User's userId (bytes5)
   */
  const claimLifetimeReward = useCallback(async (
    userId: `0x${string}`
  ) => {
    const transaction = prepareContractCall({
      contract,
      method: "function claimLifetimeReward(bytes5 _userId)",
      params: [userId],
    });
    return sendTransaction(transaction);
  }, [contract, sendTransaction]);

  /**
   * Withdraw available balance
   * @param userId - User's userId (bytes5)
   * @param amount - Amount to withdraw in USDT (wei)
   */
  const withdraw = useCallback(async (
    userId: `0x${string}`,
    amount: bigint
  ) => {
    const transaction = prepareContractCall({
      contract,
      method: "function withdraw(bytes5 _userId, uint256 _amount)",
      params: [userId, amount],
    });
    return sendTransaction(transaction);
  }, [contract, sendTransaction]);

  return {
    // Transaction functions
    register,
    stake,
    claimStake,
    claimLifetimeReward,
    withdraw,

    // State
    isPending,
    error,
  };
}
