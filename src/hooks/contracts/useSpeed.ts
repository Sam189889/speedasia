"use client";
import { SPEED_ADDRESS } from "@/constants/addresses";
import { SpeedAsiaABI } from "@/constants/abis";

export function useSpeed() {
    return {
        address: SPEED_ADDRESS as `0x${string}`,
        abi: SpeedAsiaABI,
    };
}