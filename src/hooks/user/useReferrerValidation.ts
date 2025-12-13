"use client";

import { useActiveAccount, useReadContract } from "thirdweb/react";
import { isAddress } from "thirdweb/utils";
import { useInterface } from "@/hooks/contracts/useInterface";

/**
 * Custom hook to validate if a referrer is registered
 * @param targetAddress - Optional address to validate (defaults to connected wallet)
 */
export function useReferrerValidation(targetAddress?: string) {
  const activeAccount = useActiveAccount();
  const referrerAddress = targetAddress || activeAccount?.address;
  const contract = useInterface();

  // Skip if no address or invalid address format
  const shouldValidate = !!referrerAddress && isAddress(referrerAddress);

  const {
    data: isReferrerRegistered,
    isPending: isValidating,
    error,
  } = useReadContract({
    contract,
    method: "function isUserRegistered(address userAddress) view returns (bool)",
    params: shouldValidate ? [referrerAddress] : ["0x0000000000000000000000000000000000000000"],
  });

  return {
    isReferrerRegistered: shouldValidate ? (isReferrerRegistered as boolean | undefined) : false,
    isValidating: shouldValidate ? isValidating : false,
    isReferrerValid: shouldValidate && isReferrerRegistered === true,
    error,
  };
}
