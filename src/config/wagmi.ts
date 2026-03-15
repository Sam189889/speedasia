import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http, fallback, createConfig } from 'wagmi';
import { Chain } from 'viem';
import { env } from './env';

// ============================================
// RPC ENDPOINTS WITH FALLBACK
// ============================================

// Multiple RPC endpoints for BSC Smart Chain Mainnet (auto-failover on rate limit)
const MAINNET_RPC_ENDPOINTS = [
  'https://bsc-dataseed1.binance.org',
  'https://bsc-dataseed2.binance.org',
  'https://bsc-dataseed3.binance.org',
  'https://bsc-dataseed4.binance.org',
];

// Multiple RPC endpoints for opBNB Testnet
const TESTNET_RPC_ENDPOINTS = [
  'https://opbnb-testnet-rpc.bnbchain.org',
  'https://opbnb-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5',
];

// ============================================
// CUSTOM CHAIN DEFINITIONS WITH ICONS
// ============================================

// BSC Smart Chain Mainnet with custom icon for RainbowKit
export const bscMainnet: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: { http: MAINNET_RPC_ENDPOINTS },
    public: { http: MAINNET_RPC_ENDPOINTS },
  },
  blockExplorers: {
    default: { name: 'BSCScan', url: 'https://bscscan.com' },
  },
  testnet: false,
  iconUrl: '/bnb.svg',
  iconBackground: '#F3BA2F',
} as Chain & { iconUrl: string; iconBackground: string };

// opBNB Testnet with custom icon for RainbowKit
export const opBnbTestnet: Chain = {
  id: 5611,
  name: 'opBNB Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: { http: TESTNET_RPC_ENDPOINTS },
    public: { http: TESTNET_RPC_ENDPOINTS },
  },
  blockExplorers: {
    default: { name: 'opBNBScan', url: 'https://testnet.opbnbscan.com' },
  },
  testnet: true,
  iconUrl: '/bnb.svg',
  iconBackground: '#F3BA2F',
} as Chain & { iconUrl: string; iconBackground: string };

// ============================================
// WAGMI CONFIG WITH FALLBACK TRANSPORT
// ============================================

// Auto-select chains based on active network
const chains = env.network.isMainnet 
  ? [bscMainnet, opBnbTestnet] as const  // BSC Mainnet first
  : [opBnbTestnet, bscMainnet] as const; // Testnet first

export const config = createConfig({
  chains,
  transports: {
    // BSC Mainnet with fallback RPC endpoints
    [bscMainnet.id]: fallback(
      MAINNET_RPC_ENDPOINTS.map(url => http(url, {
        timeout: 10000,      // 10 second timeout
        retryCount: 2,       // Retry 2 times before failover
      }))
    ),
    // Testnet with fallback RPC endpoints
    [opBnbTestnet.id]: fallback(
      TESTNET_RPC_ENDPOINTS.map(url => http(url, {
        timeout: 10000,
        retryCount: 2,
      }))
    ),
  },
  ssr: true,
});

// Export active chain for convenience
export const activeChain = env.network.isMainnet ? bscMainnet : opBnbTestnet;

// Export for RainbowKit
export { chains };
