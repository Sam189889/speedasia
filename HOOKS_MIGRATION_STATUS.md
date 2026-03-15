# 🔄 Hooks Migration Status - Thirdweb → Wagmi

## ✅ Completed Migrations

### Contract Hooks
- ✅ **useInterface.ts** - Returns SAW contract config
- ✅ **useSpeed.ts** - Returns SpeedAsia contract config
- ✅ **useUsdt.ts** - Returns USDT contract config with ERC20 ABI

### User Hooks
- ✅ **useUserDashboard.ts** - Migrated to wagmi + V2 fields added
  - Added V2 fields to `Stake` interface: `lastRoiClaimTime`, `totalRoiEarned`, `isMigrated`, `boostedRoiPercent`
  - Added V2 fields to `StakingStats`: `totalClaimed`, `lastStakeAmount`
  
- ✅ **useUserData.ts** - All read hooks migrated
  - `useUserByUserId`
  - `useUserIdByAddress`
  - `useAllLevelsSummary`
  - `useLevelUsers`
  - `useLifetimeRewardProgress`

- ✅ **useUserTransactions.ts** - All write hooks migrated
  - `register`, `stake`, `claimStake`, `claimAndRestake`, `withdraw`, `claimLifetimeReward`

---

## ⚠️ Needs Migration (Using Thirdweb)

### User Hooks
- ⚠️ **useRegistrationCheck.ts** - Uses `useActiveAccount`, `useReadContract`
- ⚠️ **useReferrerValidation.ts** - Uses `useActiveAccount`, `useReadContract`, `isAddress`
- ⚠️ **useUserValidation.ts** - Uses `useReadContract`
- ⚠️ **useUserBalances.ts** - Uses `useActiveAccount`, `useWalletBalance`
- ⚠️ **useTokenApproval.ts** - Uses `useSendTransaction`, `useActiveAccount`, `approve`, `allowance`

### Common Hooks
- ⚠️ **useContractData.ts** - LARGE file with many `useReadContract` calls
  - ~60 contract reads for configuration
  - Needs systematic migration

### Admin Hooks
- ⚠️ **useAdminData.ts** - Uses `useReadContract`
- ⚠️ **useAdminTransactions.ts** - Uses `prepareContractCall`, `useSendTransaction`

### Utilities
- ⚠️ **formatters.ts** - Uses thirdweb utils: `toTokens`, `toWei`, `shortenAddress`, `isAddress`, etc.

---

## 🔧 Migration Pattern

### Read Hooks (thirdweb → wagmi)

**Before:**
```typescript
import { useReadContract } from "thirdweb/react";

const { data } = useReadContract({
  contract,
  method: "function getUserData(...)",
  params: [arg1, arg2],
  queryOptions: { enabled: true },
});
```

**After:**
```typescript
import { useReadContract } from "wagmi";

const { data } = useReadContract({
  ...contract,
  functionName: "getUserData",
  args: [arg1, arg2],
  query: { enabled: true },
});
```

### Write Hooks (thirdweb → wagmi)

**Before:**
```typescript
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

const { mutateAsync } = useSendTransaction();
const tx = prepareContractCall({
  contract,
  method: "function register(...)",
  params: [...]
});
await mutateAsync(tx);
```

**After:**
```typescript
import { useWriteContract } from "wagmi";

const { writeContractAsync } = useWriteContract();
await writeContractAsync({
  ...contract,
  functionName: "register",
  args: [...]
});
```

### Account Hook (thirdweb → wagmi)

**Before:**
```typescript
import { useActiveAccount } from "thirdweb/react";
const account = useActiveAccount();
const address = account?.address;
```

**After:**
```typescript
import { useAccount } from "wagmi";
const { address, isConnected } = useAccount();
```

### Utils (thirdweb → viem)

**Before:**
```typescript
import { toTokens, toWei, isAddress } from "thirdweb/utils";
```

**After:**
```typescript
import { formatUnits, parseUnits, isAddress } from "viem";
```

---

## 📋 TODO List

### High Priority
1. ⚠️ **Migrate useTokenApproval** - Critical for transactions
2. ⚠️ **Migrate useUserBalances** - Shows wallet/contract balances
3. ⚠️ **Migrate useRegistrationCheck** - User onboarding
4. ⚠️ **Update formatters.ts** - Used everywhere

### Medium Priority
5. ⚠️ **Migrate useContractData** - Config data (large file)
6. ⚠️ **Migrate useReferrerValidation** - Referral system
7. ⚠️ **Migrate useUserValidation** - Form validation

### Low Priority
8. ⚠️ **Migrate useAdminData** - Admin panel
9. ⚠️ **Migrate useAdminTransactions** - Admin functions

---

## 🎯 Next Steps

1. **Install viem utilities** (if not already):
   ```bash
   npm install viem
   ```

2. **Create utility wrapper** for common viem functions in `formatters.ts`

3. **Systematic migration**:
   - Start with `formatters.ts` (used everywhere)
   - Then `useTokenApproval` and `useUserBalances` (critical)
   - Then registration/validation hooks
   - Finally admin hooks

4. **Test each migration** before moving to next

---

## ⚠️ Known Issues

1. **Type mismatch** in `useUserData.ts` line 33:
   ```typescript
   // Fix needed:
   args: [userAddress as `0x${string}` ?? "0x0000000000000000000000000000000000000000"],
   ```

2. **Missing client/chain** references:
   - Some hooks reference `@/client/client` and `@/chain/chain`
   - These need to be removed or replaced with wagmi config

---

## 📚 Resources

- [Wagmi Docs](https://wagmi.sh/)
- [Viem Docs](https://viem.sh/)
- [RainbowKit Docs](https://rainbowkit.com/)
- Migration complete for: useInterface, useSpeed, useUsdt, useUserDashboard, useUserData, useUserTransactions

---

**Status:** ~40% Complete | ~60% Remaining
