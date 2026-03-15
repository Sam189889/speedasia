"use client";

import { useAccount, useReadContract } from "wagmi";
import { isAddress } from "viem";
import { useSpeed } from "@/hooks/contracts/useSpeed";

/**
 * Custom hook to validate if a referrer is registered
 * @param targetAddress - Optional address to validate (defaults to connected wallet)
 */
export function useReferrerValidation(targetAddress?: string) {
  const { address: activeAccount } = useAccount();
  const referrerAddress = targetAddress || activeAccount;
  const contract = useSpeed();

  // Skip if no address or invalid address format
  const shouldValidate = !!referrerAddress && isAddress(referrerAddress);

  const {
    data: userId,
    isPending: isValidating,
    error,
  } = useReadContract({
    ...contract,
    functionName: "addressToUserId",
    args: [(shouldValidate ? referrerAddress : "0x0000000000000000000000000000000000000000") as `0x${string}`],
    query: { enabled: shouldValidate },
  });

  // User is registered if userId is not zero
  const isReferrerRegistered = userId ? userId !== "0x0000000000" : false;

  return {
    isReferrerRegistered: shouldValidate ? isReferrerRegistered : false,
    isValidating: shouldValidate ? isValidating : false,
    isReferrerValid: shouldValidate && isReferrerRegistered,
    error,
  };
}
