/**
 * Centralized Configuration
 * Change values here directly - no environment variables needed
 */

// ============================================
// NETWORK CONFIGURATION
// ============================================
// 🎯 Change this to switch between 'testnet' and 'mainnet'
export const ACTIVE_NETWORK = 'mainnet' as 'testnet' | 'mainnet';

export const IS_MAINNET = ACTIVE_NETWORK === 'mainnet';

// ============================================
// CONTRACT ADDRESSES
// ============================================

// Admin Addresses (Both have access on both networks)
const ADMIN_ADDRESSES = [
  '0xe6666633Ff58dfA607C3827464D4B51478e7628a' as `0x${string}`, // Admin 1 (Testnet Primary)
  '0x2a38acb4cd565b064ceb30d6abcdc3b12402e649' as `0x${string}`, // Admin 2 (Mainnet Primary)
];

// Testnet Addresses (opBNB Testnet)
const TESTNET_ADDRESSES = {
  speed: '0xFB3D6F8A1c82652839b562aE727aaBB118f4f74e' as `0x${string}`, // Proxy
  interface: '0x64daef6748e42946e4f7e7f9ead7ccd790e0440f' as `0x${string}`, // SAW V2 (New)
  usdt: '0x17DdB9d0f7d54fB86aE3f73069A4F34cDF3Df3B1' as `0x${string}`,
  admin: ADMIN_ADDRESSES[0], // Primary testnet admin
};

// Mainnet Addresses (BSC Mainnet) - V2 Deployment
const MAINNET_ADDRESSES = {
  speed: '0x8186afd23dbfe55bb4079441a14e8ddd53f72a86' as `0x${string}`, // Proxy
  interface: '0x5AB47CD9c3D122800FEB25B5E16d9e11EB2D952e' as `0x${string}`, // SAW V2 (New)
  usdt: '0x55d398326f99059fF775485246999027B3197955' as `0x${string}`,
  admin: ADMIN_ADDRESSES[1], // Primary mainnet admin
};

// Auto-select addresses based on active network
const CURRENT_ADDRESSES = IS_MAINNET ? MAINNET_ADDRESSES : TESTNET_ADDRESSES;

// ============================================
// WALLET CONNECT
// ============================================
// Get your Project ID from: https://cloud.walletconnect.com/
export const WALLET_CONNECT_PROJECT_ID = 'dc1cc7993801e3321f8e636f1e2c9a58';

// ============================================
// APP CONFIGURATION
// ============================================
export const APP_NAME = 'SpeedAsia';

// ============================================
// UNIFIED ENVIRONMENT EXPORT
// ============================================
export const env = {
  // Network info
  network: {
    active: ACTIVE_NETWORK,
    isMainnet: IS_MAINNET,
    isTestnet: !IS_MAINNET,
  },
  
  // Contract addresses (auto-selected based on network)
  contracts: CURRENT_ADDRESSES,
  
  // Admin addresses (both work on both networks)
  admins: ADMIN_ADDRESSES,
  
  // All addresses for reference
  addresses: {
    testnet: TESTNET_ADDRESSES,
    mainnet: MAINNET_ADDRESSES,
  },
  
  // WalletConnect
  walletConnect: {
    projectId: WALLET_CONNECT_PROJECT_ID,
  },
  
  // App info
  app: {
    name: APP_NAME,
  },
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if an address is an admin (works on both networks)
 * @param address - Address to check
 * @returns boolean
 */
export function isAdmin(address: string | undefined): boolean {
  if (!address) return false;
  return ADMIN_ADDRESSES.some(
    admin => admin.toLowerCase() === address.toLowerCase()
  );
}

// Type-safe environment variables
export type Env = typeof env;

// Helper to log current network on startup (development only)
if (process.env.NODE_ENV === 'development') {
  console.log(`🌐 Network: ${ACTIVE_NETWORK.toUpperCase()}`);
  console.log(`📍 Addresses:`, CURRENT_ADDRESSES);
}
