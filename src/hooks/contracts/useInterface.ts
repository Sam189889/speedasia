"use client";
import { INT_ADDRESS } from "@/constants/addresses";
import { SAWABI } from "@/constants/abis";

export function useInterface() {
    return {
        address: INT_ADDRESS as `0x${string}`,
        abi: SAWABI,
    };
}