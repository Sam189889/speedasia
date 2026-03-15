# V2 User Dashboard Changes

## 🎯 Overview
After V2 upgrade and migration, the user dashboard must show **ONLY V2 data** and features. V1 stakes will be migrated to V2 system.

---

## 📋 V2 Stake Structure

### **How to Identify V2 Stakes:**
```typescript
// A stake is V2 if:
stake.isMigrated === true  OR  stake.duration === 0n
```

### **V2 Stake Fields:**
- `isMigrated`: `true` for V2 stakes
- `duration`: `0` for V2 stakes (no fixed duration)
- `lastRoiClaimTime`: Last time ROI was claimed
- `totalRoiEarned`: Total ROI earned so far
- `boostedRoiPercent`: `0` = 1% daily, `150` = 1.5% daily (booster)

---

## 🔄 V1 vs V2 Comparison

| Feature | V1 (Old) | V2 (New) |
|---------|----------|----------|
| **Duration** | Fixed (30/60/90/180 days) | Perpetual (no duration) |
| **Interest Rate** | Fixed % (120%, 180%, etc.) | Daily 1% or 1.5% (booster) |
| **ROI Claim** | At maturity only | Daily (claim anytime) |
| **Capital** | Returned at maturity | Withdraw anytime |
| **Status** | Matured/Active | Always Active (until withdrawn) |
| **Functions** | `claimStake()` | `claimDailyRoi()`, `withdrawCapital()` |

---

## 🚀 V2 Features

### **1. Daily ROI (1% or 1.5%)**
- Base: **1% daily** (`dailyRoiPercent = 100`)
- Boosted: **1.5% daily** (`boostedRoiPercent = 150`)
- Claim using: `claimDailyRoi(userId, stakeIndex)`

### **2. Booster Income**
- When referrer gets 2 qualifying referrals within 10 days
- Current stake ROI increases from 1% → 1.5%
- Applies only to the current stake
- Check: `stake.boostedRoiPercent > 0`

### **3. ROI Close Time**
- Daily ROI closes at **4 AM** (`roiCloseTimeHour = 4`)
- Complete days calculated based on this cutoff
- Use `getCompletedRoiDays()` to check claimable days

### **4. Capital Withdrawal**
- Withdraw capital anytime using `withdrawCapital()`
- Automatically claims pending ROI first
- Closes the stake (sets `isActive = false`)

---

## 🎨 UI Changes Required

### **ActiveStakes Component:**

#### **Remove:**
- ❌ V1 duration display (30/60/90/180 days)
- ❌ Interest rate % (120%, 180%, etc.)
- ❌ Progress bar (days completed / total days)
- ❌ Days left counter
- ❌ "Matured" status
- ❌ "Claim" button (V1 claimStake)

#### **Add:**
- ✅ "Daily ROI" badge (1% or 1.5% if boosted)
- ✅ "Claim Daily ROI" button
- ✅ "Withdraw Capital" button
- ✅ Total ROI earned display
- ✅ Last claim time
- ✅ Pending ROI (calculated)
- ✅ Days since last claim
- ✅ Booster badge (if `boostedRoiPercent > 0`)

#### **V2 Stake Card Layout:**
```
┌─────────────────────────────────────┐
│ 💰 Stake #1    [1% Daily] [BOOSTED]│
│                                     │
│ Principal: $1,000                   │
│ Total ROI Earned: $150              │
│ Pending ROI: $15 (15 days)         │
│ Last Claim: 2 hours ago             │
│                                     │
│ [Claim Daily ROI] [Withdraw Capital]│
└─────────────────────────────────────┘
```

### **OverviewTab Component:**

#### **Remove:**
- ❌ "Matured Stakes" counter
- ❌ Total interest earned (V1 concept)

#### **Add:**
- ✅ Total Daily ROI available
- ✅ Active V2 stakes count
- ✅ Total ROI earned (V2)

### **StakeTab Component:**

#### **Remove:**
- ❌ Duration selector (30/60/90/180 days)
- ❌ Interest rate preview

#### **Keep:**
- ✅ Amount input
- ✅ Stake button
- Note: New stakes are automatically V2 if `isV2Active`

---

## 📊 Data Fetching

### **Filter V2 Stakes:**
```typescript
const v2Stakes = allStakes.filter(stake => 
  stake.isMigrated === true || stake.duration === 0n
);
```

### **Calculate Pending ROI:**
```typescript
// Days since last claim (using 4 AM cutoff)
const daysPassed = getCompletedRoiDays(stake.lastRoiClaimTime);

// ROI percent (boosted or normal)
const roiPercent = stake.boostedRoiPercent > 0n 
  ? stake.boostedRoiPercent  // 150 = 1.5%
  : 100n;                     // 100 = 1%

// Pending ROI amount
const pendingRoi = (stake.amount * roiPercent * daysPassed) / 10000n;
```

### **Check if Boosted:**
```typescript
const isBoosted = stake.boostedRoiPercent > 0n;
const dailyRate = isBoosted ? "1.5%" : "1%";
```

---

## 🎯 New User Actions

### **1. Claim Daily ROI:**
```typescript
await claimDailyRoi(userId, stakeIndex);
```

### **2. Withdraw Capital:**
```typescript
await withdrawCapital(userId, stakeIndex);
```

---

## 🔍 V1 Stake Handling

**After migration, V1 stakes should NOT be shown in the UI.**

Only show stakes where:
```typescript
stake.isActive && (stake.isMigrated || stake.duration === 0n)
```

---

## ✅ Summary

1. **Filter**: Show only V2 stakes (`isMigrated || duration === 0`)
2. **Remove**: All V1-specific UI (duration, interest rate, maturity)
3. **Add**: V2-specific UI (daily ROI, pending ROI, claim/withdraw buttons)
4. **Features**: Daily ROI claiming, capital withdrawal, booster display
5. **Status**: No more "matured" - stakes are always active until withdrawn

---

**Implementation Order:**
1. Update `ActiveStakes.tsx` - Main changes
2. Update `OverviewTab.tsx` - Summary stats
3. Update `StakeTab.tsx` - New stake creation (already V2)
4. Update hooks if needed - Add V2 functions
