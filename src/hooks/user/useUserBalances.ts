"use client";

import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "@/client/client";
import { chain } from "@/chain/chain";
import { USDT_ADDRESS } from "@/constants/addresses";

/**
 * Custom hook to manage user wallet balances
 * Provides native token (BNB) and USDT token balances
 */
export function useUserBalances() {
  const activeAccount = useActiveAccount();
  const userAddress = activeAccount?.address;

  // Get native token balance (BNB on BSC)
  const { 
    data: nativeBalance, 
    isLoading: isLoadingNativeBalance,
    refetch: refetchNativeBalance 
  } = useWalletBalance({
    chain: chain,
    address: userAddress,
    client,
  });

  // Get USDT token balance
  const { 
    data: usdtBalance, 
    isLoading: isLoadingUsdtBalance,
    refetch: refetchUsdtBalance 
  } = useWalletBalance({
    chain: chain,
    address: userAddress,
    client,
    tokenAddress: USDT_ADDRESS,
  });

  // Check if user has enough native balance for gas fees (minimum 0.003 BNB)
  const hasEnoughGas = (): boolean => {
    if (!nativeBalance?.value) return false;
    const minGasRequired = BigInt("3000000000000000"); // 0.003 BNB in wei
    return nativeBalance.value >= minGasRequired;
  };

  // Check if user has enough USDT balance for a specific amount
  const hasEnoughUsdt = (requiredAmount: bigint): boolean => {
    if (!usdtBalance?.value) return false;
    return usdtBalance.value >= requiredAmount;
  };

  // Get formatted native balance display
  const getNativeBalanceDisplay = (): string => {
    if (isLoadingNativeBalance) return 'Loading...';
    if (!nativeBalance?.displayValue) return '0.000';
    return `${parseFloat(nativeBalance.displayValue).toFixed(3)} ${nativeBalance.symbol}`;
  };

  // Get formatted USDT balance display
  const getUsdtBalanceDisplay = (): string => {
    if (isLoadingUsdtBalance) return 'Loading...';
    if (!usdtBalance?.displayValue) return '0.00 USDT';
    return `${parseFloat(usdtBalance.displayValue).toFixed(2)} ${usdtBalance.symbol}`;
  };

  // Refetch all balances
  const refetchAllBalances = async () => {
    await Promise.all([
      refetchNativeBalance(),
      refetchUsdtBalance()
    ]);
  };

  return {
    // Raw balance data
    nativeBalance,
    usdtBalance,
    // Loading states
    isLoading: isLoadingNativeBalance || isLoadingUsdtBalance,
    isLoadingNativeBalance,
    isLoadingUsdtBalance,
    // Helper functions
    hasEnoughGas,
    hasEnoughUsdt,
    getNativeBalanceDisplay,
    getUsdtBalanceDisplay,
    refetchAllBalances,
    refetchNativeBalance,
    refetchUsdtBalance,
  };
}
