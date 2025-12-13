"use client"
import { getContract } from "thirdweb";
import { SPEED_ADDRESS } from "@/constants/addresses";
import { client } from "@/client/client";
import { chain } from "@/chain/chain";

export function useSpeed() {
    const contract = getContract ({
        client : client,
        address : SPEED_ADDRESS,
        chain : chain,
    });

    return contract;
}