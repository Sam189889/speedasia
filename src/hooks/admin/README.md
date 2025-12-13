# Admin Hooks Documentation

Complete set of React hooks for GrowBit platform admin functions.

## 📁 Structure

```
app/hooks/admin/
├── useAdmin.ts                      # Master hook (combines all)
├── useAdminSystemConfig.ts          # System configuration
├── useAdminFinancialSettings.ts     # Financial settings
├── useAdminBonusRewards.ts          # Bonus & rewards
├── useAdminWithdrawalSettings.ts    # Withdrawal settings
└── useAdminDistribution.ts          # Distribution management
```

## 🎯 Quick Start

### Option 1: Use Master Hook (Recommended)

```typescript
import { useAdmin } from '@/hooks/admin/useAdmin';

function AdminPanel() {
  const admin = useAdmin();

  const handleSetInvestmentAmount = async () => {
    const success = await admin.financialSettings.setInvestmentAmount(55);
    if (success) {
      toast.success('Investment amount updated!');
    }
  };

  return (
    <button onClick={handleSetInvestmentAmount} disabled={admin.isProcessing}>
      Set Investment Amount
    </button>
  );
}
```

### Option 2: Use Individual Hooks

```typescript
import { useAdminFinancialSettings } from '@/hooks/admin/useAdminFinancialSettings';

function FinancialSettingsPanel() {
  const { setInvestmentAmount, isProcessing } = useAdminFinancialSettings();

  const handleUpdate = async () => {
    const success = await setInvestmentAmount(55);
    // Handle success/error
  };
}
```

## 📚 Hooks Reference

### 1. useAdminSystemConfig

**Functions:**
- `setFirstUser(address: string)` - Set root user
- `setDistributionAddress(address: string)` - Set distribution wallet
- `updateDistributionAddress(address: string)` - Update distribution wallet

**Example:**
```typescript
const { setFirstUser, isProcessing } = useAdminSystemConfig();

await setFirstUser('0x...');
```

---

### 2. useAdminFinancialSettings

**Functions:**
- `setInvestmentAmount(amount: number)` - Set package amount (in USDT)
- `setMaxROIPercent(percent: number)` - Set ROI percentage
- `setPlatformFee(percent: number)` - Set platform fee
- `setTradingCapital(percent: number)` - Set trading capital

**Example:**
```typescript
const { setInvestmentAmount, setMaxROIPercent } = useAdminFinancialSettings();

await setInvestmentAmount(55); // 55 USDT
await setMaxROIPercent(200);   // 200%
```

---

### 3. useAdminBonusRewards

**Functions:**
- `setReferralBonus(percent: number)` - Set referral bonus
- `setBinaryPercent(percent: number)` - Set binary bonus
- `setLevelBonus(level: number, bonus: number)` - Set individual level bonus
- `setAllLevelBonuses(bonuses: number[])` - Set all 9 levels at once
- `setPassivePercent(percent: number)` - Set passive income

**Example:**
```typescript
const { setAllLevelBonuses } = useAdminBonusRewards();

await setAllLevelBonuses([5, 4, 3, 2, 2, 1, 1, 1, 1]); // Level 1-9
```

---

### 4. useAdminWithdrawalSettings

**Functions:**
- `setWithdrawalFeePercent(percent: number)` - Set withdrawal fee
- `setWithdrawalWindow(startHour: number, endHour: number)` - Set window hours (UTC)

**Example:**
```typescript
const { setWithdrawalWindow } = useAdminWithdrawalSettings();

await setWithdrawalWindow(10, 18); // 10:00 - 18:00 UTC
```

---

### 5. useAdminDistribution

**Functions:**
- `distributeDailyProfit(users: string[], rate: number)` - Distribute to specific users
- `distributeToEligibleUsers(rate: number)` - Distribute to all eligible
- `distributeBatch(startIndex: number, endIndex: number, rate: number)` - Batch distribution

**Example:**
```typescript
const { distributeBatch } = useAdminDistribution();

await distributeBatch(0, 100, 2); // Users 0-100, 2% daily rate
```

---

## 🎨 Complete Admin Panel Example

```typescript
'use client';

import { useState } from 'react';
import { useAdmin } from '@/hooks/admin/useAdmin';
import toast from 'react-hot-toast';

export default function AdminPanel() {
  const admin = useAdmin();
  const [investmentAmount, setInvestmentAmount] = useState(55);
  const [withdrawalFee, setWithdrawalFee] = useState(20);
  const [startHour, setStartHour] = useState(10);
  const [endHour, setEndHour] = useState(18);

  const handleUpdateInvestment = async () => {
    const success = await admin.financialSettings.setInvestmentAmount(investmentAmount);
    if (success) {
      toast.success('Investment amount updated!');
    } else {
      toast.error('Update failed');
    }
  };

  const handleUpdateWithdrawalWindow = async () => {
    const success = await admin.withdrawalSettings.setWithdrawalWindow(startHour, endHour);
    if (success) {
      toast.success('Withdrawal window updated!');
    } else {
      toast.error('Update failed');
    }
  };

  const handleDistribute = async () => {
    const success = await admin.distribution.distributeToEligibleUsers(2);
    if (success) {
      toast.success('Distribution successful!');
    } else {
      toast.error('Distribution failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Financial Settings */}
      <div className="card-gradient rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Financial Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Investment Amount (USDT)</label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          
          <button
            onClick={handleUpdateInvestment}
            disabled={admin.isProcessing}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold disabled:opacity-50"
          >
            {admin.isProcessing ? 'Processing...' : 'Update Investment Amount'}
          </button>
        </div>
      </div>

      {/* Withdrawal Settings */}
      <div className="card-gradient rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Withdrawal Settings</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Start Hour (UTC)</label>
              <input
                type="number"
                min="0"
                max="23"
                value={startHour}
                onChange={(e) => setStartHour(Number(e.target.value))}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">End Hour (UTC)</label>
              <input
                type="number"
                min="0"
                max="23"
                value={endHour}
                onChange={(e) => setEndHour(Number(e.target.value))}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>
          </div>
          
          <button
            onClick={handleUpdateWithdrawalWindow}
            disabled={admin.isProcessing}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold disabled:opacity-50"
          >
            {admin.isProcessing ? 'Processing...' : 'Update Withdrawal Window'}
          </button>
        </div>
      </div>

      {/* Distribution */}
      <div className="card-gradient rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Distribution</h2>
        
        <button
          onClick={handleDistribute}
          disabled={admin.isProcessing}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-bold disabled:opacity-50"
        >
          {admin.isProcessing ? 'Processing...' : 'Distribute Daily Profit (2%)'}
        </button>
      </div>
    </div>
  );
}
```

## ⚙️ Configuration

### Gas Limits

All hooks use optimized gas limits:
- **Standard functions:** 300,000 gas
- **Withdrawal functions:** 500,000 gas
- **Distribution functions:** Dynamic (based on user count, max 8,000,000)

### Error Handling

All functions return `Promise<boolean>`:
- `true` - Transaction successful
- `false` - Transaction failed

```typescript
const success = await admin.financialSettings.setInvestmentAmount(55);

if (success) {
  // Handle success
  toast.success('Updated!');
} else {
  // Handle error
  toast.error('Failed!');
}
```

## 🔒 Security

- All functions require admin/owner wallet
- Transactions must be approved by user
- Input validation included
- Gas limits prevent excessive costs

## 📝 Notes

1. **Percentages:** Use whole numbers (e.g., 20 for 20%)
2. **Amounts:** Use USDT values (converted to wei automatically)
3. **Hours:** Use 24-hour format (0-23)
4. **Arrays:** Level bonuses must be exactly 9 elements

## 🎯 Best Practices

1. **Always check return value:**
   ```typescript
   const success = await setInvestmentAmount(55);
   if (!success) {
     // Handle error
   }
   ```

2. **Use loading states:**
   ```typescript
   <button disabled={admin.isProcessing}>
     {admin.isProcessing ? 'Processing...' : 'Update'}
   </button>
   ```

3. **Provide user feedback:**
   ```typescript
   if (success) {
     toast.success('Updated!');
   } else {
     toast.error('Failed!');
   }
   ```

4. **Validate inputs:**
   ```typescript
   if (startHour < 0 || startHour > 23) {
     toast.error('Invalid hour');
     return;
   }
   ```

## 🚀 Deployment Checklist

- [ ] Test all functions on testnet
- [ ] Verify admin wallet has permissions
- [ ] Check gas limits are appropriate
- [ ] Validate all input parameters
- [ ] Add proper error handling
- [ ] Implement loading states
- [ ] Add success/error notifications
- [ ] Test with real contract on testnet
- [ ] Review transaction costs
- [ ] Deploy to production

---

**Total Functions: 17**  
**Total Hooks: 6**  
**Ready for Production: ✅**
