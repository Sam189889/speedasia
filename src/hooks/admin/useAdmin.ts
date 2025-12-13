"use client";

import { useAdminSystemConfig } from "./useAdminSystemConfig";
import { useAdminFinancialSettings } from "./useAdminFinancialSettings";
import { useAdminBonusRewards } from "./useAdminBonusRewards";
import { useAdminWithdrawalSettings } from "./useAdminWithdrawalSettings";
import { useAdminDistribution } from "./useAdminDistribution";

/**
 * Master admin hook that combines all admin functionality
 * Provides a single interface for all admin operations
 */
export function useAdmin() {
  const systemConfig = useAdminSystemConfig();
  const financialSettings = useAdminFinancialSettings();
  const bonusRewards = useAdminBonusRewards();
  const withdrawalSettings = useAdminWithdrawalSettings();
  const distribution = useAdminDistribution();

  // Combined processing state
  const isProcessing =
    systemConfig.isProcessing ||
    financialSettings.isProcessing ||
    bonusRewards.isProcessing ||
    withdrawalSettings.isProcessing ||
    distribution.isProcessing;

  const isPending =
    systemConfig.isPending ||
    financialSettings.isPending ||
    bonusRewards.isPending ||
    withdrawalSettings.isPending ||
    distribution.isPending;

  return {
    // System Configuration
    systemConfig: {
      setFirstUser: systemConfig.setFirstUser,
      setDistributionAddress: systemConfig.setDistributionAddress,
      updateDistributionAddress: systemConfig.updateDistributionAddress,
    },

    // Financial Settings
    financialSettings: {
      setInvestmentAmount: financialSettings.setInvestmentAmount,
      setMaxROIPercent: financialSettings.setMaxROIPercent,
      setPlatformFee: financialSettings.setPlatformFee,
      setTradingCapital: financialSettings.setTradingCapital,
    },

    // Bonus & Rewards
    bonusRewards: {
      setReferralBonus: bonusRewards.setReferralBonus,
      setBinaryPercent: bonusRewards.setBinaryPercent,
      setLevelBonus: bonusRewards.setLevelBonus,
      setAllLevelBonuses: bonusRewards.setAllLevelBonuses,
      setPassivePercent: bonusRewards.setPassivePercent,
    },

    // Withdrawal Settings
    withdrawalSettings: {
      setWithdrawalFeePercent: withdrawalSettings.setWithdrawalFeePercent,
      setWithdrawalWindow: withdrawalSettings.setWithdrawalWindow,
    },

    // Distribution Management
    distribution: {
      distributeDailyProfit: distribution.distributeDailyProfit,
      distributeToEligibleUsers: distribution.distributeToEligibleUsers,
      distributeBatch: distribution.distributeBatch,
    },

    // Combined state
    isProcessing,
    isPending,
  };
}
