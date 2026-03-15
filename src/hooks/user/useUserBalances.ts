"use client";

import { useAccount, useBalance, useReadContract } from "wagmi";
import { USDT_ADDRESS } from "@/constants/addresses";
import { formatUnits } from "viem";
import { erc20Abi } from "viem";

/**
 * Custom hook to manage user wallet balances
 * Provides native token (BNB) and USDT token balances
 */
export function useUserBalances() {
  const { address: userAddress } = useAccount();

  // Get native token balance (BNB on BSC)
  const { 
    data: nativeBalance, 
    isLoading: isLoadingNativeBalance,
    refetch: refetchNativeBalance 
  } = useBalance({
    address: userAddress,
  });

  // Get USDT token balance using ERC20 balanceOf
  const { 
    data: usdtBalanceRaw, 
    isPending: isLoadingUsdtBalance,
    refetch: refetchUsdtBalance 
  } = useReadContract({
    address: USDT_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress as `0x${string}`],
    query: { enabled: !!userAddress },
  });

  // Format USDT balance to match native balance structure
  const usdtBalance = usdtBalanceRaw !== undefined ? {
    value: usdtBalanceRaw,
    decimals: 18,
    symbol: 'USDT',
  } : undefined;

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
    if (!nativeBalance?.value) return '0.000';
    const formatted = formatUnits(nativeBalance.value, nativeBalance.decimals);
    return `${parseFloat(formatted).toFixed(3)} ${nativeBalance.symbol}`;
  };

  // Get formatted USDT balance display
  const getUsdtBalanceDisplay = (): string => {
    if (isLoadingUsdtBalance) return 'Loading...';
    if (!usdtBalance?.value) return '0.00 USDT';
    const formatted = formatUnits(usdtBalance.value, usdtBalance.decimals);
    return `${parseFloat(formatted).toFixed(2)} ${usdtBalance.symbol}`;
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
