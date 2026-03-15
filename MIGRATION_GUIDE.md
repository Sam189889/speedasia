# Frontend Migration Guide: Thirdweb → Wagmi + RainbowKit

## ✅ Completed Changes

### 1. **Dependencies Installed**
```bash
npm install wagmi viem @tanstack/react-query @rainbow-me/rainbowkit
```

### 2. **Contract ABIs Exported**
- Created `/src/constants/abis/` folder
- Exported `SpeedAsiaABI.ts` and `SAWABI.ts`
- Created `index.ts` for clean exports
- **Script:** `speedasia/scripts/exportAbis.js` (run after each contract update)

### 3. **Addresses Updated**
**File:** `src/constants/addresses.ts`
```typescript
export const SPEED_ADDRESS = "0xFB3D6F8A1c82652839b562aE727aaBB118f4f74e" // Proxy
export const INT_ADDRESS = "0xf48b57a67c81e432da2696e1aff26c926581d8eb" // SAW V2
```

### 4. **Wagmi Configuration**
**File:** `src/config/wagmi.ts`
- Configured for opBNB Testnet and Mainnet
- Uses RainbowKit's `getDefaultConfig`

### 5. **Web3 Provider Created**
**File:** `src/providers/Web3Provider.tsx`
- Wraps app with WagmiProvider, QueryClientProvider, and RainbowKitProvider
- **Usage:** Wrap your app in `layout.tsx` or `_app.tsx`

### 6. **Contract Hooks Migrated**

#### `src/hooks/contracts/useInterface.ts`
**Before (Thirdweb):**
```typescript
import { getContract } from "thirdweb";
const contract = getContract({...});
return contract;
```

**After (Wagmi):**
```typescript
import { SAWABI } from "@/constants/abis";
return {
  address: INT_ADDRESS as `0x${string}`,
  abi: SAWABI,
};
```

#### `src/hooks/contracts/useSpeed.ts`
**Before (Thirdweb):**
```typescript
import { getContract } from "thirdweb";
const contract = getContract({...});
return contract;
```

**After (Wagmi):**
```typescript
import { SpeedAsiaABI } from "@/constants/abis";
return {
  address: SPEED_ADDRESS as `0x${string}`,
  abi: SpeedAsiaABI,
};
```

### 7. **Transaction Hooks Migrated**

#### `src/hooks/user/useUserTransactions.ts`
**Before (Thirdweb):**
```typescript
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

const { mutateAsync: sendTransaction } = useSendTransaction();

const transaction = prepareContractCall({
  contract,
  method: "function register(...)",
  params: [...]
});
return sendTransaction(transaction);
```

**After (Wagmi):**
```typescript
import { useWriteContract } from "wagmi";

const { writeContractAsync } = useWriteContract();

return writeContractAsync({
  ...contract,
  functionName: "register",
  args: [...]
});
```

---

## 🔧 Remaining Tasks

### 1. **Update Read Hooks**
Files that need migration:
- `src/hooks/user/useUserDashboard.ts`
- `src/hooks/user/useUserData.ts`
- `src/hooks/common/useContractData.ts`
- `src/hooks/admin/useAdminData.ts`

**Change:**
```typescript
// Before
import { useReadContract } from "thirdweb/react";

// After  
import { useReadContract } from "wagmi";
```

### 2. **Update Token Approval Hook**
**File:** `src/hooks/user/useTokenApproval.ts`

Replace thirdweb's USDT contract interaction with wagmi's `useWriteContract` for `approve()`.

### 3. **Update Wallet Connection**
Find and replace all wallet connection logic:
- Remove `ConnectButton` from thirdweb
- Add RainbowKit's `ConnectButton`

```typescript
// Before
import { ConnectButton } from "thirdweb/react";

// After
import { ConnectButton } from "@rainbow-me/rainbowkit";
```

### 4. **Update useAccount Hook**
```typescript
// Before
import { useActiveAccount } from "thirdweb/react";
const account = useActiveAccount();
const address = account?.address;

// After
import { useAccount } from "wagmi";
const { address, isConnected } = useAccount();
```

### 5. **Wrap App with Web3Provider**
**File:** `src/app/layout.tsx` or `_app.tsx`

```typescript
import { Web3Provider } from "@/providers/Web3Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
```

### 6. **Environment Variables**
Add to `.env.local`:
```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

Get Project ID from: https://cloud.walletconnect.com/

---

## 📝 Notes

### V2 Features in ABIs
The exported ABIs include all V2 functions:
- `claimDailyRoi(bytes5 _userId, uint256 _stakeIndex)`
- `withdrawCapital(bytes5 _userId, uint256 _stakeIndex)`
- `migrateStakeToV2(bytes5 _userId, uint256 _stakeIndex)`
- `isV2Active() returns (bool)`
- `isUserActiveNow(address _user) returns (bool)`

### Type Safety
Wagmi provides better TypeScript support:
- All addresses must be `0x${string}` type
- Contract ABIs are strongly typed
- Function args are type-checked

### Testing Checklist
- [ ] Wallet connection works
- [ ] Contract reads work
- [ ] Transactions work (register, stake, withdraw)
- [ ] V2 functions accessible
- [ ] Error handling works
- [ ] Loading states work

---

## 🚀 Quick Reference

**Export ABIs after contract changes:**
```bash
cd speedasia
node scripts/exportAbis.js
```

**Contract Addresses (Testnet):**
- Proxy: `0xFB3D6F8A1c82652839b562aE727aaBB118f4f74e`
- SAW V2: `0xf48b57a67c81e432da2696e1aff26c926581d8eb`
- USDT: `0x17DdB9d0f7d54fB86aE3f73069A4F34cDF3Df3B1`
