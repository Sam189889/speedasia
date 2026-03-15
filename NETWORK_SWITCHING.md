# 🌐 Network Switching Guide

## One-Switch Network Configuration

SpeedAsia uses a **centralized network switching system**. Change one environment variable to switch the entire app between testnet and mainnet.

---

## 🎯 How to Switch Networks

### Option 1: Environment Variable (Recommended)
Edit `.env.local`:
```bash
# For Testnet
NEXT_PUBLIC_NETWORK=testnet

# For Mainnet
NEXT_PUBLIC_NETWORK=mainnet
```

### Option 2: Build-time Configuration
```bash
# Build for testnet
NEXT_PUBLIC_NETWORK=testnet npm run build

# Build for mainnet
NEXT_PUBLIC_NETWORK=mainnet npm run build
```

---

## ✅ What Automatically Changes

When you switch the network, **everything** updates automatically:

### 1. **Contract Addresses**
```typescript
// In env.ts
TESTNET: {
  speed: '0xFB3D6F8A1c82652839b562aE727aaBB118f4f74e',
  interface: '0xf48b57a67c81e432da2696e1aff26c926581d8eb',
  usdt: '0x17DdB9d0f7d54fB86aE3f73069A4F34cDF3Df3B1',
}

MAINNET: {
  speed: '0x8186afd23dbfe55bb4079441a14e8ddd53f72a86',
  interface: '0x0559b579893f778D7B7c70f98A41e07b38C9fa04',
  usdt: '0x55d398326f99059fF775485246999027B3197955',
}
```

### 2. **Wagmi Chain Configuration**
```typescript
// Automatically uses:
- opBNBTestnet (for testnet)
- opBNB (for mainnet)
```

### 3. **All Contract Interactions**
- All read/write operations use correct addresses
- All hooks automatically point to correct network
- No manual address changes needed

---

## 📁 File Structure

### `src/config/env.ts` - Network Config
```typescript
export const ACTIVE_NETWORK = 'testnet' | 'mainnet';
export const env = {
  network: {
    active: ACTIVE_NETWORK,
    isMainnet: boolean,
    isTestnet: boolean,
  },
  contracts: { /* auto-selected */ },
  // ...
}
```

### `src/config/wagmi.ts` - Wagmi Config
```typescript
// Auto-selects chain based on env.network.isMainnet
const chains = env.network.isMainnet 
  ? [opBNB, opBNBTestnet]
  : [opBNBTestnet, opBNB];
```

### `src/constants/addresses.ts` - Address Exports
```typescript
import { env } from "@/config/env";

// Automatically uses correct network addresses
export const SPEED_ADDRESS = env.contracts.speed;
export const INT_ADDRESS = env.contracts.interface;
```

---

## 🔍 How to Check Current Network

### In Code
```typescript
import { env } from "@/config/env";

console.log(env.network.active);    // 'testnet' or 'mainnet'
console.log(env.network.isMainnet); // true or false
console.log(env.contracts);         // Current network addresses
```

### In Development Console
```bash
# Console will show on startup:
🌐 Network: TESTNET
📍 Addresses: { speed: '0x...', interface: '0x...', ... }
```

---

## ⚠️ Important Notes

1. **Restart Dev Server** after changing network:
   ```bash
   npm run dev
   ```

2. **Clear Browser Cache** if addresses don't update

3. **Addresses are Hardcoded** in `env.ts`:
   - No need to set individual address env vars
   - Just change `NEXT_PUBLIC_NETWORK`

4. **Production Builds**:
   ```bash
   # Testnet build
   NEXT_PUBLIC_NETWORK=testnet npm run build
   
   # Mainnet build  
   NEXT_PUBLIC_NETWORK=mainnet npm run build
   ```

---

## 📋 Deployment Checklist

### For Testnet Deployment:
- [ ] Set `NEXT_PUBLIC_NETWORK=testnet`
- [ ] Verify testnet addresses in console
- [ ] Test transactions on testnet
- [ ] Deploy

### For Mainnet Deployment:
- [ ] Set `NEXT_PUBLIC_NETWORK=mainnet`
- [ ] **Double-check** mainnet addresses
- [ ] Test on testnet first
- [ ] Get mainnet WalletConnect Project ID
- [ ] Deploy to mainnet

---

## 🚀 Quick Start

1. Copy `.env.example` to `.env.local`
2. Set network:
   ```bash
   NEXT_PUBLIC_NETWORK=testnet
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_id
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Check console for network confirmation ✅

---

**One variable. Everything switches. Simple.** 🎯
