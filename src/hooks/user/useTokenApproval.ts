"use client";

import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { useState } from "react";
import { useSpeed } from "@/hooks/contracts/useSpeed";
import { useUsdt } from "@/hooks/contracts/useUsdt";
import { useInterface } from "@/hooks/contracts/useInterface";

/**
 * Custom hook to manage USDT token approvals for GBT contracts
 * Handles approval checks and approval transactions
 */
export function useTokenApproval() {
  const { address: activeAccount } = useAccount();
  const gbtContract = useSpeed();
  const intContract = useInterface();
  const usdtContract = useUsdt();
  const { writeContractAsync, isPending } = useWriteContract();
  const [isApproving, setIsApproving] = useState(false);

  // Spender address (Interface contract for user transactions)
  const spenderAddress = intContract.address;

  // Check current allowance for Interface contract
  const {
    data: currentAllowance,
    refetch: refetchAllowance,
    isPending: isLoadingAllowance
  } = useReadContract({
    ...usdtContract,
    functionName: "allowance",
    args: [
      (activeAccount || "0x0000000000000000000000000000000000000000") as `0x${string}`,
      spenderAddress
    ],
    query: { enabled: !!activeAccount },
  });

  // Check if approval is needed for a specific amount
  const needsApproval = (requiredAmount: bigint): boolean => {
    console.log('=== ALLOWANCE CHECK ===');
    console.log('Current Allowance:', currentAllowance?.toString() || 'undefined');
    console.log('Required Amount:', requiredAmount.toString());
    console.log('Needs Approval:', !currentAllowance || currentAllowance < requiredAmount);
    console.log('=======================');

    if (!currentAllowance) return true;
    return currentAllowance < requiredAmount;
  };

  // Check if user has sufficient allowance
  const hasSufficientAllowance = (requiredAmount: bigint): boolean => {
    if (!currentAllowance) return false;
    return currentAllowance >= requiredAmount;
  };

  // Approve USDT tokens for spending
  const approveTokens = async (amount: bigint): Promise<boolean> => {
    if (!activeAccount) {
      console.error("No active account");
      return false;
    }

    if (!spenderAddress) {
      console.error("No spender address (Interface contract)");
      return false;
    }

    try {
      setIsApproving(true);

      const approvalTokens = amount; // Already in wei

      console.log('=== APPROVAL REQUEST DEBUG ===');
      console.log('Required Amount (Raw):', amount.toString());
      console.log('Approval Amount (Tokens):', approvalTokens);
      console.log('Spender Address:', spenderAddress);
      console.log('Current Allowance:', currentAllowance?.toString());
      console.log('===============================');

      // Send approval transaction using wagmi
      await writeContractAsync({
        ...usdtContract,
        functionName: "approve",
        args: [spenderAddress, approvalTokens],
      });
      
      console.log("✅ Approval successful");

      // Wait for blockchain confirmation
      console.log('⏳ Waiting for blockchain confirmation (2s)...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Refetch allowance after approval
      await refetchAllowance();
      console.log('✅ Allowance refetched after approval');

      return true;
    } catch (error) {
      console.error("Approval error:", error);
      return false;
    } finally {
      setIsApproving(false);
    }
  };

  // Get formatted allowance display
  const getAllowanceDisplay = (): string => {
    if (isLoadingAllowance) return 'Loading...';
    if (!currentAllowance) return '0.00 USDT';
    const tokens = formatUnits(currentAllowance, 18);
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
