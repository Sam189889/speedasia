"use client";

import { ThirdwebProvider } from "./ThirdwebProvider";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThirdwebProvider>
            {children}
            <ToastProvider />
        </ThirdwebProvider>
    );
}
