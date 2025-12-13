"use client"
import { getContract } from "thirdweb";
import { INT_ADDRESS } from "@/constants/addresses";
import { client } from "@/client/client";
import { chain } from "@/chain/chain";

export function useInterface() {
    const contract = getContract({
        client: client,
        address: INT_ADDRESS,
        chain: chain,
    });

    return contract;
}