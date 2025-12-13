'use client';

import { useReadContract } from 'thirdweb/react';
import { useGbt } from '@/hooks/contracts/useSpeed';
import { toTokens } from 'thirdweb/utils';

export function useAdminFinancials() {
  // Create contract instance
  const contract = useGbt();

  // Get contract financials in one call
  const { data: financials, isPending, error } = useReadContract({
    contract,
    method: "function getContractFinancials() view returns (uint256 contractBalance, uint256 totalLiability, uint256 surplus, bool isSolvent)",
    params: []
  });

  // Parse financial data
  const contractBalance = financials?.[0] ? toTokens(financials[0], 18) : "0";
  const totalLiability = financials?.[1] ? toTokens(financials[1], 18) : "0";
  const surplus = financials?.[2] ? toTokens(financials[2], 18) : "0";
  const isSolvent = financials?.[3] || false;

  // Calculate ratios and metrics
  const liquidityRatio = Number(totalLiability) > 0
    ? Number(contractBalance) / Number(totalLiability)
    : Number(contractBalance) > 0
      ? Infinity  // Infinite liquidity when no liabilities
      : 0;        // Zero when no balance and no liabilities

  const coveragePercentage = liquidityRatio === Infinity
    ? 100  // 100% coverage when infinite liquidity
    : liquidityRatio * 100;

  // Determine platform health
  const platformHealth = liquidityRatio === Infinity ? "Perfect" :
    liquidityRatio >= 1.5 ? "Excellent" :
      liquidityRatio >= 1 ? "Good" :
        liquidityRatio >= 0.5 ? "Caution" : "Critical";

  const healthStatus = liquidityRatio === Infinity || liquidityRatio >= 1 ? "success" :
    liquidityRatio >= 0.5 ? "warning" : "danger";

  return {
    // Raw data
    contractBalance,
    totalLiability,
    surplus,
    isSolvent,

    // Calculated metrics
    liquidityRatio,
    coveragePercentage,
    platformHealth,
    healthStatus,

    // Loading states
    isLoading: isPending,
    error,

    // Helper functions
    isHealthy: () => isSolvent && (liquidityRatio === Infinity || liquidityRatio >= 1),
    hasDeficit: () => Number(surplus) < 0,
    getCoverageColor: () => liquidityRatio === Infinity || liquidityRatio >= 1 ? "text-green-400" : "text-red-400",
    getHealthIcon: () => liquidityRatio === Infinity ? "💎" :
      liquidityRatio >= 1.5 ? "🟢" :
        liquidityRatio >= 1 ? "🟡" :
          liquidityRatio >= 0.5 ? "🟠" : "🔴",

    // Format liquidity ratio for display
    formatLiquidityRatio: () => liquidityRatio === Infinity ? "∞" : liquidityRatio.toFixed(2) + "x",

    // Format coverage percentage for display  
    formatCoveragePercentage: () => liquidityRatio === Infinity ? "100.0%" : coveragePercentage.toFixed(1) + "%"
  };
}
