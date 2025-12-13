"use client";

import { allowance, approve } from "thirdweb/extensions/erc20";
import { useSendTransaction, useActiveAccount, useReadContract } from "thirdweb/react";
import { toTokens } from "thirdweb/utils";
import { useState } from "react";
import { useGbt } from "@/hooks/contracts/useSpeed";
import { useUsdt } from "@/hooks/contracts/useUsdt";

/**
 * Custom hook to manage USDT token approvals for admin treasury operations
 * Approves USDT spending for GBT contract (not Interface)
 */
export function useAdminTokenApproval() {
  const activeAccount = useActiveAccount();
  const gbtContract = useGbt();
  const usdtContract = useUsdt();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [isApproving, setIsApproving] = useState(false);

  // Spender address (GBT contract for admin operations)
  const spenderAddress = gbtContract?.address;

  // Check current allowance for GBT contract
  const {
    data: currentAllowance,
    refetch: refetchAllowance,
    isPending: isLoadingAllowance
  } = useReadContract(
    allowance,
    {
      contract: usdtContract,
      owner: activeAccount?.address || "0x0000000000000000000000000000000000000000",
      spender: spenderAddress,
    }
  );

  // Check if approval is needed for a specific amount
  const needsApproval = (requiredAmount: bigint): boolean => {
    console.log('=== ADMIN ALLOWANCE CHECK ===');
    console.log('Current Allowance:', currentAllowance?.toString() || 'undefined');
    console.log('Required Amount:', requiredAmount.toString());
    console.log('Spender (GBT):', spenderAddress);
    console.log('Needs Approval:', !currentAllowance || currentAllowance < requiredAmount);
    console.log('=============================');

    if (!currentAllowance) return true;
    return currentAllowance < requiredAmount;
  };

  // Check if user has sufficient allowance
  const hasSufficientAllowance = (requiredAmount: bigint): boolean => {
    if (!currentAllowance) return false;
    return currentAllowance >= requiredAmount;
  };

  // Approve USDT tokens for spending by GBT contract
  const approveTokens = async (amount: bigint): Promise<boolean> => {
    if (!activeAccount) {
      console.error("No active account");
      return false;
    }

    if (!spenderAddress) {
      console.error("No spender address (GBT contract)");
      return false;
    }

    try {
      setIsApproving(true);

      const approvalTokens = toTokens(amount, 18);

      console.log('=== ADMIN APPROVAL REQUEST ===');
      console.log('Required Amount (Raw):', amount.toString());
      console.log('Approval Amount (Tokens):', approvalTokens);
      console.log('Spender Address (GBT):', spenderAddress);
      console.log('Current Allowance:', currentAllowance?.toString());
      console.log('==============================');

      // Prepare approval transaction using thirdweb approve extension
      const approveTx = approve({
        contract: usdtContract,
        spender: spenderAddress,
        amount: approvalTokens, // Amount in token units
      });

      // Send approval transaction
      await new Promise((resolve, reject) => {
        sendTransaction(approveTx, {
          onSuccess: (result) => {
            console.log("✅ Admin approval successful:", result);
            resolve(result);
          },
          onError: (error) => {
            console.error("❌ Admin approval failed:", error);
            reject(error);
          },
        });
      });

      // Wait for blockchain confirmation
      console.log('⏳ Waiting for blockchain confirmation (2s)...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Refetch allowance after approval
      await refetchAllowance();
      console.log('✅ Allowance refetched after approval');

      return true;
    } catch (error) {
      console.error("Admin approval error:", error);
      return false;
    } finally {
      setIsApproving(false);
    }
  };

  // Get formatted allowance display
  const getAllowanceDisplay = (): string => {
    if (isLoadingAllowance) return 'Loading...';
    if (!currentAllowance) return '0.00 USDT';
    const tokens = toTokens(currentAllowance, 18);
    return `${parseFloat(tokens).toFixed(2)} USDT`;
  };

  return {
    // Allowance data
    currentAllowance,
    isLoadingAllowance,

    // Approval state
    isApproving,
    isPending,

    // Helper functions
    needsApproval,
    hasSufficientAllowance,
    approveTokens,
    refetchAllowance,
    getAllowanceDisplay,
  };
}
