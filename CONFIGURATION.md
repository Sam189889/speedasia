# ⚙️ SpeedAsia Configuration Guide

## 🎯 Simple Configuration - No Environment Variables

All configuration is done directly in `src/config/env.ts`. No `.env` files needed!

---

## 🌐 Network Switching

### Change Network (Testnet ↔ Mainnet)

**File:** `src/config/env.ts`

```typescript
// Change this line:
export const ACTIVE_NETWORK: 'testnet' | 'mainnet' = 'testnet';

// For Mainnet:
export const ACTIVE_NETWORK: 'testnet' | 'mainnet' = 'mainnet';
```

**That's it!** Everything automatically switches:
- ✅ Contract addresses
- ✅ Wagmi chain configuration  
- ✅ All contract interactions

---

## 📝 Configuration Values

### `src/config/env.ts`

```typescript
// ============================================
// NETWORK - Change this to switch networks
// ============================================
export const ACTIVE_NETWORK: 'testnet' | 'mainnet' = 'testnet';

// ============================================
// TESTNET ADDRESSES
// ============================================
const TESTNET_ADDRESSES = {
  speed: '0xFB3D6F8A1c82652839b562aE727aaBB118f4f74e',    // Proxy
  interface: '0xf48b57a67c81e432da2696e1aff26c926581d8eb', // SAW V2
  usdt: '0x17DdB9d0f7d54fB86aE3f73069A4F34cDF3Df3B1',
  admin: '0xe6666633Ff58dfA607C3827464D4B51478e7628a',
};

// ============================================
// MAINNET ADDRESSES
// ============================================
const MAINNET_ADDRESSES = {
  speed: '0x8186afd23dbfe55bb4079441a14e8ddd53f72a86',    // Proxy
  interface: '0x0559b579893f778D7B7c70f98A41e07b38C9fa04', // SAW
  usdt: '0x55d398326f99059fF775485246999027B3197955',
  admin: '0x2a38acb4cd565b064ceb30d6abcdc3b12402e649',
};

// ============================================
// WALLET CONNECT
// ============================================
export const WALLET_CONNECT_PROJECT_ID = 'YOUR_PROJECT_ID';

// ============================================
// APP NAME
// ============================================
export const APP_NAME = 'SpeedAsia';
```

---

## 🚀 Quick Start

### 1. **Set WalletConnect Project ID**

Get ID from: https://cloud.walletconnect.com/

Edit `src/config/env.ts`:
```typescript
export const WALLET_CONNECT_PROJECT_ID = 'your_actual_project_id';
```

### 2. **Choose Network**

```typescript
// For Testnet (default)
export const ACTIVE_NETWORK: 'testnet' | 'mainnet' = 'testnet';

// For Mainnet
export const ACTIVE_NETWORK: 'testnet' | 'mainnet' = 'mainnet';
```

### 3. **Start Development**

```bash
npm run dev
```

Check console:
```
🌐 Network: TESTNET
📍 Addresses: { speed: '0x...', interface: '0x...', usdt: '0x...' }
```

---

## 📦 Deployment

### Testnet Deployment

1. Set in `env.ts`:
   ```typescript
   export const ACTIVE_NETWORK: 'testnet' | 'mainnet' = 'testnet';
   export const WALLET_CONNECT_PROJECT_ID = 'your_testnet_project_id';
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm run start
   ```

### Mainnet Deployment

1. **Double-check** `env.ts`:
   ```typescript
   export const ACTIVE_NETWORK: 'testnet' | 'mainnet' = 'mainnet';
   export const WALLET_CONNECT_PROJECT_ID = 'your_mainnet_project_id';
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm run start
   ```

---

## ✅ Checklist

### Before Deploying to Testnet:
- [ ] `ACTIVE_NETWORK = 'testnet'`
- [ ] WalletConnect Project ID set
- [ ] Test locally first
- [ ] Verify testnet addresses in console

### Before Deploying to Mainnet:
- [ ] `ACTIVE_NETWORK = 'mainnet'`
- [ ] **Double-check** all mainnet addresses
- [ ] Test on testnet first
- [ ] WalletConnect Project ID for mainnet
- [ ] Review all changes carefully

---

## 🔍 How It Works

### Auto-Selection Logic

```typescript
// In env.ts
const CURRENT_ADDRESSES = IS_MAINNET ? MAINNET_ADDRESSES : TESTNET_ADDRESSES;

export const env = {
  network: {
    active: ACTIVE_NETWORK,
    isMainnet: IS_MAINNET,
  },
  contracts: CURRENT_ADDRESSES, // Auto-selected!
  // ...
}
```

### Usage in Code

```typescript
import { env } from "@/config/env";

// Get current network
console.log(env.network.active);    // 'testnet' or 'mainnet'
console.log(env.network.isMainnet); // true or false

// Get addresses (automatically correct for current network)
const speedAddress = env.contracts.speed;
const sawAddress = env.contracts.interface;
```

---

## 📂 File Structure

```
src/
├── config/
│   ├── env.ts          # 🎯 Edit this to configure
│   └── wagmi.ts        # Auto-uses env.ts
├── constants/
│   ├── addresses.ts    # Auto-uses env.ts
│   └── abis/
│       ├── SpeedAsiaABI.ts
│       ├── SAWABI.ts
│       └── index.ts
```

---

## 💡 Tips

1. **Network Switching:** Just change `ACTIVE_NETWORK` in `env.ts`
2. **No Restart Needed:** Hot reload works (but refresh browser)
3. **Type Safety:** TypeScript enforces correct network type
4. **Console Logging:** Development mode shows current network
5. **One File:** Everything in `src/config/env.ts`

---

## ⚠️ Important Notes

- **No `.env` files needed** - all config in `env.ts`
- **Restart dev server** after changing network
- **Clear browser cache** if addresses don't update
- **Git commit** your network choice before deploying
- **Review twice** before mainnet deployment

---

**Simple. Direct. No confusion.** 🎯
