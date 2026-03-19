# Upgrade Requirements Analysis

## Setter vs Contract Logic Change

### ✅ Requirement 1: Lifetime Reward - 50% Strongest Leg + 50% Other Legs Matching
**Status:** ❌ **NEEDS CONTRACT UPGRADE**

**Leg Matching Formula (Correct Logic):**
1. **Leg A** = Strongest leg by volume (highest direct referral's total team business)
2. **Leg B** = Sum of all other legs (all other directs' team business combined)
3. **Target** = Lifetime reward tier business volume requirement
4. **Match Condition:**
   - `Leg A >= Target × 50%` (Leg A must have at least 50% of target)
   - `Leg B >= Target × 50%` (Leg B must have at least 50% of target)
   - **Both conditions must be true** to claim reward

**Example:**
- Target = 10,000 USDT
- Leg A (strongest) = 5,000 USDT ✅ (meets 50% = 5,000)
- Leg B (all others) = 6,000 USDT ✅ (meets 50% = 5,000)
- **Result:** Target matched! User can claim reward.

**Implementation Logic:**
```solidity
// 1. Loop through all direct referrals
// 2. Calculate each direct's total team business
// 3. Find strongest leg (Leg A)
// 4. Sum all other legs (Leg B)
// 5. Check: (Leg A >= target/2) && (Leg B >= target/2)
```

**Why No Setter Works:**
- Requires looping through directs and calculating leg volumes
- Needs dynamic comparison logic
- Current `claimLifetimeReward()` only checks total team stats

**Files to modify:**
- `SpeedAsia.sol` - `claimLifetimeReward()` function
- May need helper function to calculate leg volumes

---

### ✅ Requirement 2: Principal & ROI Separate Columns
**Status:** ✅ **FRONTEND ONLY - NO CONTRACT CHANGE**

**Why:**
- This is purely UI display change
- Contract already stores `stakeData.amount` (principal) and `stakeData.totalRoiEarned` (ROI) separately
- Just update dashboard to show in separate columns

**Files to modify:**
- `ActiveStakes.tsx` - Update table/card layout
- Add columns for Principal and ROI separately

---

### ✅ Requirement 3: Principal Withdrawal Penalty (30% → 20% → 10% → 0%)
**Status:** ❌ **NEEDS CONTRACT UPGRADE**

**Why:**
- Current `withdrawCapital()` has no penalty logic
- New logic needs:
  - Calculate stake age (months since creation)
  - Apply penalty: Month 1 = 30%, Month 2 = 20%, Month 3 = 10%, Month 4+ = 0%
  - Deduct penalty from principal before returning
- Growth/ROI withdrawal keeps 5% fee (already exists via `withdrawalFeePercent`)
- **No setter can add this logic** - requires time-based calculation

**Files to modify:**
- `SpeedAsia.sol` - `withdrawCapital()` function
- Add penalty calculation based on stake age

---

### ✅ Requirement 4: Each $100 Direct Opens 2 Levels (10 directs = 20 levels)
**Status:** ⚠️ **PARTIALLY VIA SETTER + CONTRACT UPGRADE NEEDED**

**Current Logic:**
```solidity
// Each $20+ direct = 1 level
uint256 levelsByCount = qualifyingDirectCount; // 1:1 mapping
// OR $2000 business = all 20 levels
if (qualifyingDirectBusiness >= 2000e18) newLevels = 20;
```

**What Setter Can Do:**
```solidity
setLevelUnlockConfig(100e18, 999999999e18); // Min $100, disable $2000 option
```
- Changes minimum stake from $20 to $100 ✅
- Disables $2000 shortcut ✅

**What Setter CANNOT Do:**
- Make 1 direct = 2 levels (currently hardcoded 1:1)
- Current: `levelsByCount = qualifyingDirectCount`
- Needed: `levelsByCount = qualifyingDirectCount * 2`

**Required Change:**
Modify `_updateUnlockedLevels()` to multiply count by 2:
```solidity
uint256 levelsByCount = userTeam[_user].qualifyingDirectCount * 2;
```

---

### ✅ Requirement 5: Remove $2000 Single Opening Option
**Status:** ⚠️ **CAN WORKAROUND WITH SETTER, BUT UPGRADE BETTER**

**Workaround via Setter:**
```solidity
setLevelUnlockConfig(100e18, type(uint256).max); // Set to impossible value
```
- Sets `directBusinessForAllLevels` to max uint256
- Effectively disables the $2000 shortcut ✅

**Better Solution (Contract Upgrade):**
Remove the entire branch from `_updateUnlockedLevels()`:
```solidity
// DELETE THIS:
if (userTeam[_user].qualifyingDirectBusiness >= directBusinessForAllLevels) {
    newLevels = maxLevels;
}
```

---

## Summary

| # | Requirement | Setter Possible? | Contract Upgrade Needed? |
|---|-------------|------------------|--------------------------|
| 1 | 50% Leg Matching Rewards | ❌ No | ✅ Yes - New logic |
| 2 | Separate Principal/ROI Columns | ✅ Yes (Frontend only) | ❌ No |
| 3 | Principal Withdrawal Penalty | ❌ No | ✅ Yes - Add penalty calc |
| 4 | $100 Direct = 2 Levels | ⚠️ Partial ($100 min) | ✅ Yes - Change 1:1 to 1:2 |
| 5 | Remove $2000 Option | ⚠️ Workaround (set max) | ⚠️ Better to remove code |

---

## Recommendation

**Via Setters (Immediate):**
- Req #2: Frontend update only ✅
- Req #4: Call `setLevelUnlockConfig(100e18, type(uint256).max)` ✅
- Req #5: Same setter call ✅

**Via Contract Upgrade (Required):**
- Req #1: Leg-wise reward matching logic
- Req #3: Time-based principal withdrawal penalty
- Req #4: Make 1 direct = 2 levels multiplier
- Req #5: Clean removal of $2000 branch

**Total: 3/5 require contract upgrade, 1 is frontend only, 1 partially via setter**
