"use client";

import '@/lib/indexedDBPolyfill';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme, AvatarComponent } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  tokenPocketWallet,
  trustWallet,
  safepalWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createStorage, cookieStorage } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { bscMainnet, opBnbTestnet } from '@/config/wagmi';
import { env } from '@/config/env';
import Image from 'next/image';

// ============================================
// WAGMI CONFIG - SINGLETON PATTERN
// ============================================
let wagmiConfig: ReturnType<typeof getDefaultConfig> | null = null;
const getWagmiConfig = () => {
  if (!wagmiConfig) {
    wagmiConfig = getDefaultConfig({
      appName: env.app.name,
      projectId: env.walletConnect.projectId,
      chains: env.network.isMainnet 
        ? [bscMainnet, opBnbTestnet] 
        : [opBnbTestnet, bscMainnet],
      wallets: [
        {
          groupName: 'Popular',
          wallets: [
            metaMaskWallet,
            trustWallet,
            safepalWallet,
            tokenPocketWallet,
            rainbowWallet,
            walletConnectWallet,
          ],
        },
      ],
      ssr: true,
      storage: createStorage({
        storage: cookieStorage,
      }),
    });
  }
  return wagmiConfig;
};

// ============================================
// QUERY CLIENT - SINGLETON PATTERN
// ============================================
let queryClientInstance: QueryClient | null = null;
const getQueryClient = () => {
  if (!queryClientInstance) {
    queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    });
  }
  return queryClientInstance;
};

// ============================================
// CUSTOM AVATAR - SPEEDASIA LOGO
// ============================================
const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return (
    <div 
      style={{ width: size, height: size }} 
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] p-1"
    >
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
        <span className="text-[#D4AF37] font-bold" style={{ fontSize: size * 0.5 }}>SA</span>
      </div>
    </div>
  );
};

// ============================================
// WEB3 PROVIDER
// ============================================
export function Web3Provider({ children }: { children: React.ReactNode }) {
  const config = getWagmiConfig();
  const queryClient = getQueryClient();
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          coolMode
          modalSize="compact"
          initialChain={env.network.isMainnet ? bscMainnet : opBnbTestnet}
          avatar={CustomAvatar}
          theme={darkTheme({
            accentColor: '#D4AF37', // SpeedAsia Gold
            accentColorForeground: 'black',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
