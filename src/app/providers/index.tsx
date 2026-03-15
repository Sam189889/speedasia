"use client";

import { Web3Provider } from "@/providers/Web3Provider";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Web3Provider>
            {children}
            <ToastProvider />
        </Web3Provider>
    );
}
