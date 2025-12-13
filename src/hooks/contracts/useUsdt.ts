"use client"
import { getContract } from "thirdweb";
import { USDT_ADDRESS } from "@/constants/addresses";
import { client } from "@/client/client";
import { chain } from "@/chain/chain";

export function useUsdt() {
    const contract = getContract({
        client: client,
        address: USDT_ADDRESS,
        chain: chain,
    });

    return contract;
}