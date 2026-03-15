"use client";
import { USDT_ADDRESS } from "@/constants/addresses";
import { erc20Abi } from "viem";

export function useUsdt() {
    return {
        address: USDT_ADDRESS as `0x${string}`,
        abi: erc20Abi,
    };
}