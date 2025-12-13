"use client";

import { useReadContract } from "thirdweb/react";
import { useGbt } from "@/hooks/contracts/useSpeed";
import { toTokens } from "thirdweb";
/**
 * Hook to read current admin configuration values from GBT contract
 * Displays current settings before admin makes changes
 */
export function useAdminReadConfig() {
  const contract = useGbt();

  // Read individual public variables from GrowBitTrade contract
  const { data: investmentAmount, isLoading: isInvestmentLoading } = useReadContract({
    contract,
    method: "function INVESTMENT_AMOUNT() view returns (uint256)",
    params: [],
  });

  const { data: tradingCapital, isLoading: isTradingCapitalLoading } = useReadContract({
    contract,
    method: "function TRADING_CAPITAL() view returns (uint256)",
    params: [],
  });

  const { data: platformFee, isLoading: isPlatformFeeLoading } = useReadContract({
    contract,
    method: "function PLATEFORM_FEE() view returns (uint256)",
    params: [],
  });

  const { data: referralBonus, isLoading: isReferralBonusLoading } = useReadContract({
    contract,
    method: "function REFERRAL_BONUS() view returns (uint256)",
    params: [],
  });

  const { data: withdrawalFeePercent, isLoading: isWithdrawalFeeLoading } = useReadContract({
    contract,
    method: "function WITHDRAWAL_FEE_PERCENT() view returns (uint256)",
    params: [],
  });

  const { data: binaryPercent, isLoading: isBinaryPercentLoading } = useReadContract({
    contract,
    method: "function BINARY_PERCENT() view returns (uint256)",
    params: [],
  });

  const { data: passivePercent, isLoading: isPassivePercentLoading } = useReadContract({
    contract,
    method: "function PASSIVE_PERCENT() view returns (uint256)",
    params: [],
  });

  const { data: maxROIPercent, isLoading: isMaxROILoading } = useReadContract({
    contract,
    method: "function MAX_ROI_PERCENT() view returns (uint256)",
    params: [],
  });

  // Get withdrawal window settings from individual public variables (GBT contract)
  const { data: withdrawalStartHour, isLoading: isStartHourLoading } = useReadContract({
    contract,
    method: "function withdrawalStartHour() view returns (uint256)",
    params: [],
  });

  const { data: withdrawalEndHour, isLoading: isEndHourLoading } = useReadContract({
    contract,
    method: "function withdrawalEndHour() view returns (uint256)",
    params: [],
  });

  // Get level bonuses (levels 0-8 for UI levels 2-10)
  const { data: levelBonus0, isLoading: isLevelBonus0Loading } = useReadContract({
    contract,
    method: "function levelBonus(uint256) view returns (uint256)",
    params: [BigInt(0)],
  });
  const { data: levelBonus1, isLoading: isLevelBonus1Loading } = useReadContract({
    contract,
    method: "function levelBonus(uint256) view returns (uint256)",
    params: [BigInt(1)],
  });
  const { data: levelBonus2, isLoading: isLevelBonus2Loading } = useReadContract({
    contract,
    method: "function levelBonus(uint256) view returns (uint256)",
    params: [BigInt(2)],
  });
  const { data: levelBonus3, isLoading: isLevelBonus3Loading } = useReadContract({
    contract,
    method: "function levelBonus(uint256) view returns (uint256)",
    params: [BigInt(3)],
  });
  const { data: levelBonus4, isLoading: isLevelBonus4Loading } = useReadContract({
    contract,
    method: "function levelBonus(uint256) view returns (uint256)",
    params: [BigInt(4)],
  });
  const { data: levelBonus5, isLoading: isLevelBonus5Loading } = useReadContract({
    contract,
    method: "function levelBonus(uint256) view returns (uint256)",
    params: [BigInt(5)],
  });
  const { data: levelBonus6, isLoading: isLevelBonus6Loading } = useReadContract({
    contract,
    method: "function levelBonus(uint256) view returns (uint256)",
    params: [BigInt(6)],
  });
  const { data: levelBonus7, isLoading: isLevelBonus7Loading } = useReadContract({
    contract,
    method: "function levelBonus(uint256) view returns (uint256)",
    params: [BigInt(7)],
  });
  const { data: levelBonus8, isLoading: isLevelBonus8Loading } = useReadContract({
    contract,
    method: "function levelBonus(uint256) view returns (uint256)",
    params: [BigInt(8)],
  });

  // Get contract financials (total stats)
  const { data: financials, isLoading: isFinancialsLoading } = useReadContract({
    contract,
    method: "function getContractFinancials() view returns (uint256 totalInvestment, uint256 totalWithdrawn, uint256 totalUsers, uint256 totalLiability, uint256 platformBalance, uint256 tradingBalance)",
    params: [],
  });

  // Get total users count
  const { data: totalUsers, isLoading: isTotalUsersLoading } = useReadContract({
    contract,
    method: "function getTotalUsers() view returns (uint256)",
    params: [],
  });

  // Get total liability
  const { data: totalLiability, isLoading: isTotalLiabilityLoading } = useReadContract({
    contract,
    method: "function getTotalLiability() view returns (uint256)",
    params: [],
  });

  // Get distribution address (public variable - auto-generated getter)
  const { data: distributionAddress, isLoading: isDistributionAddressLoading } = useReadContract({
    contract,
    method: "function distributionAddress() view returns (address)",
    params: [],
  });
  console.log('useAdminReadConfig - distributionAddress:', distributionAddress);

  // Get first user (public variable - auto-generated getter)
  const { data: firstUser, isLoading: isFirstUserLoading } = useReadContract({
    contract,
    method: "function firstUser() view returns (address)",
    params: [],
  });
  console.log('useAdminReadConfig - firstUser:', firstUser);

  // Get platform fee address (public variable - auto-generated getter)
  const { data: platformFeeAddress, isLoading: isPlatformFeeAddressLoading } = useReadContract({
    contract,
    method: "function plateformFeeAddress() view returns (address)",
    params: [],
  });
  console.log('useAdminReadConfig - platformFeeAddress:', platformFeeAddress);

  // Parse config from individual variables
  const config = (investmentAmount !== undefined || distributionAddress || firstUser || platformFeeAddress) ? {
    investmentAmount: investmentAmount ? toTokens(investmentAmount, 18) : "0",
    tradingCapital: tradingCapital ? toTokens(tradingCapital, 18) : "0", // Convert from wei to USDT
    platformFeePercent: platformFee ? toTokens(platformFee, 18) : "0", // Convert from wei to USDT
    referralBonus: referralBonus ? toTokens(referralBonus, 18) : "0", // Convert from wei to USDT
    withdrawalFeePercent: withdrawalFeePercent ? Number(withdrawalFeePercent) : 0,
    binaryPercent: binaryPercent ? Number(binaryPercent) : 0,
    passivePercent: passivePercent ? Number(passivePercent) : 0,
    maxROIPercent: maxROIPercent ? Number(maxROIPercent) : 0,
    distributionAddress: distributionAddress ? String(distributionAddress) : '0x0000000000000000000000000000000000000000',
    firstUser: firstUser ? String(firstUser) : '0x0000000000000000000000000000000000000000',
    platformFeeAddress: platformFeeAddress ? String(platformFeeAddress) : '0x0000000000000000000000000000000000000000',
  } : null;

  // Parse withdrawal window from individual variables
  const withdrawal = (withdrawalStartHour !== undefined && withdrawalEndHour !== undefined && withdrawalFeePercent !== undefined) ? {
    startHour: Number(withdrawalStartHour),
    endHour: Number(withdrawalEndHour),
    feePercent: Number(withdrawalFeePercent),
  } : null;

  // Combine all level bonuses into array
  const levelBonuses = [
    levelBonus0, levelBonus1, levelBonus2, levelBonus3, levelBonus4,
    levelBonus5, levelBonus6, levelBonus7, levelBonus8
  ].filter(bonus => bonus !== undefined) as bigint[];

  // Parse level bonuses (convert from wei to USDT)
  const levels = levelBonuses.length > 0 ?
    levelBonuses.map((bonus: bigint) => toTokens(bonus, 18)) :
    null;

  // Parse financials
  const stats = financials ? {
    totalInvestment: toTokens(financials[0], 18),
    totalWithdrawn: toTokens(financials[1], 18),
    totalUsers: Number(financials[2]),
    totalLiability: toTokens(financials[3], 18),
    platformBalance: toTokens(financials[4], 18),
    tradingBalance: toTokens(financials[5], 18),
  } : null;

  const isLoading =
    isInvestmentLoading ||
    isTradingCapitalLoading ||
    isPlatformFeeLoading ||
    isReferralBonusLoading ||
    isWithdrawalFeeLoading ||
    isBinaryPercentLoading ||
    isPassivePercentLoading ||
    isMaxROILoading ||
    isStartHourLoading ||
    isEndHourLoading ||
    isLevelBonus0Loading || isLevelBonus1Loading || isLevelBonus2Loading ||
    isLevelBonus3Loading || isLevelBonus4Loading || isLevelBonus5Loading ||
    isLevelBonus6Loading || isLevelBonus7Loading || isLevelBonus8Loading ||
    isFinancialsLoading ||
    isTotalUsersLoading ||
    isTotalLiabilityLoading ||
    isDistributionAddressLoading ||
    isFirstUserLoading ||
    isPlatformFeeAddressLoading;

  // Debug logs
  console.log('useAdminReadConfig - investmentAmount:', investmentAmount);
  console.log('useAdminReadConfig - parsed config:', config);
  console.log('useAdminReadConfig - contract:', contract);

  return {
    config,
    withdrawal,
    levels,
    stats,
    totalUsers: totalUsers ? Number(totalUsers) : 0,
    totalLiability: totalLiability ? toTokens(totalLiability, 18) : "0",
    isLoading,
  };
}
