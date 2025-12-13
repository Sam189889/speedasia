"use client";

import { ThirdwebProvider as ThirdwebSDKProvider } from "thirdweb/react";

export function ThirdwebProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThirdwebSDKProvider>
            {children}
        </ThirdwebSDKProvider>
    );
}
