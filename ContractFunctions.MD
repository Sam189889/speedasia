# Contract Functions
import { useReadContract } from "thirdweb/react";
## stakingTier1

const { data, isPending } = useReadContract({
    contract,
    method: "function stakingTier1() view returns (uint256)",
    params: [],
});

## stakingTier2
const { data, isPending } = useReadContract({
    contract,
    method: "function stakingTier2() view returns (uint256)",
    params: [],
});

## stakingTier3
const { data, isPending } = useReadContract({
    contract,
    method: "function stakingTier3Min() view returns (uint256)",
    params: [],
});

## Maximum staking aloowed while chosen Tier 3
const { data, isPending } = useReadContract({
    contract,
    method: "function maxStaking() view returns (uint256)",
    params: [],
});

## Direct Referral Income Generated only if stake is equal or more then below
const { data, isPending } = useReadContract({
    contract,
    method: "function minDirectIncomeStake() view returns (uint256)",
    params: [],
});


## Minimum stake for level count
const { data, isPending } = useReadContract({
    contract,
    method: "function minStakeForLevelCount() view returns (uint256)",
    params: [],
});


## Minimum withdrawal amount
const { data, isPending } = useReadContract({
    contract,
    method: "function minWithdrawal() view returns (uint256)",
    params: [],
});


## Maximum levels
const { data, isPending } = useReadContract({
    contract,
    method: "function maxLevels() view returns (uint256)",
    params: [],
});

## Level Income Percents ( Use query for 1-20 levels index 0-19)
const { data, isPending } = useReadContract({
    contract,
    method: "function levelIncomePercents(uint256) view returns (uint256)",
    params: [],
});

## Direct Business For All Levels opening
const { data, isPending } = useReadContract({
    contract,
    method: "function directBusinessForAllLevels() view returns (uint256)",
    params: [],
});

## Staking Duration To be chosen while staking
const { data, isPending } = useReadContract({
    contract,
    method: "function durationOne() view returns (uint256)",
    params: [],
});

const { data, isPending } = useReadContract({
    contract,
    method: "function durationTwo() view returns (uint256)",
    params: [],
});

const { data, isPending } = useReadContract({
    contract,
    method: "function durationThree() view returns (uint256)",
    params: [],
});

const { data, isPending } = useReadContract({
    contract,
    method: "function durationFour() view returns (uint256)",
    params: [],
});

## Interest Rate Duration 1
const { data, isPending } = useReadContract({
    contract,
    method: "function interestOne() view returns (uint256)",
    params: [],
});

## Interest Rate Duration 2
const { data, isPending } = useReadContract({
    contract,
    method: "function interestTwo() view returns (uint256)",
    params: [],
});

## Interest Rate Duration 3
const { data, isPending } = useReadContract({
    contract,
    method: "function interestThree() view returns (uint256)",
    params: [],
});

## Interest Rate Duration 4
const { data, isPending } = useReadContract({
    contract,
    method: "function interestFour() view returns (uint256)",
    params: [],
});

## Direct Income Percent( only given for Tier 3 and no Direct Income for Tier 1 and Tier 2 & re-topup )
const { data, isPending } = useReadContract({
    contract,
    method: "function directIncomePercent() view returns (uint256)",
    params: [],
});

## Lifetime Reward Tiers( all requirements in one query )
const { data, isPending } = useReadContract({
    contract,
    method:
      "function lifetimeRewardTiers(uint256) view returns (uint256 teamSize, uint256 directReferrals, uint256 businessVolume, uint256 rewardAmount)",
    params: [],
});
