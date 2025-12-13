## User Functions
import { useReadContract } from "thirdweb/react";


## getUserByUserId
const { data, isPending } = useReadContract({
    contract,
    method: "function getUserByUserId(bytes5 _userId) view returns (address)",
    params: [_userId],
});

## getUserIdByAddress
const { data, isPending } = useReadContract({
    contract,
    method: "function getUserIdByAddress(address _user) view returns (bytes5)",
    params: [_user],
});

## getAllLevelsSummary
const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllLevelsSummary(bytes5 _userId) view returns (uint256[20] levelCounts, uint256[20] levelBusiness)",
    params: [_userId],
});

## getLevelUsers
const { data, isPending } = useReadContract({
    contract,
    method:
      "function getLevelUsers(bytes5 _userId, uint256 _level) view returns (bytes5[] userIds, uint256[] staked)",
    params: [_userId, _level],
});

## getLifetimeRewardProgress
const { data, isPending } = useReadContract({
    contract,
    method:
      "function getLifetimeRewardProgress(bytes5 _userId) view returns (uint256[6] teamSizeRequired, uint256[6] directsRequired, uint256[6] businessRequired, uint256[6] rewardAmounts, bool[6] isClaimed, bool[6] isEligible)",
    params: [_userId],
});


## getUserDashboard
const { data, isPending } = useReadContract({
    contract,
    method:
      "function getUserDashboard(bytes5 _userId) view returns ((bytes5 userId, address referrer, uint256 registrationTime, bool isActive) info, (bytes5[] directReferralIds, uint256 directReferralCount, uint256 qualifyingDirectCount, uint256 directBusinessVolume, uint256 qualifyingDirectBusiness, uint256 teamSize, uint256 teamBusinessVolume, uint256 unlockedLevels) team, (uint256 directIncome, uint256 levelIncome, uint256 stakingIncome, uint256 lifetimeRewardIncome, uint256 totalIncome, uint256 availableBalance, uint256 totalWithdrawn, uint256 lastClaimedRewardTier) incomes, (uint256 totalStaked, uint256 activeStakedAmount, uint256 activeStakesCount) stakingStats, (uint256 stakeId, uint256 amount, uint256 duration, uint256 interestRate, uint256 startTime, uint256 endTime, bool isActive, bool isClaimed)[] stakes, uint256 unlockedLevels, bool[20] levelsUnlocked, uint256 nextRewardTier, bool nextRewardEligible, uint256 nextRewardAmount)",
    params: [_userId],
});


## User Transactional Functions( Should be called to E:\speedasia\web\src\hooks\contracts\useInterface.ts)
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

## Register ( First Stake will be performed during registration )
const transaction = prepareContractCall({
    contract,
    method:
    "function register(bytes5 _referrerId, uint256 _amount, uint256 _duration)",
    params: [_referrerId, _amount, _duration],
});
sendTransaction(transaction);

## Stake
const transaction = prepareContractCall({
    contract,
    method:
    "function stake(bytes5 _userId, uint256 _amount, uint256 _duration)",
    params: [_userId, _amount, _duration],
});
sendTransaction(transaction);

## Claim Stake
const transaction = prepareContractCall({
    contract,
    method: "function claimStake(bytes5 _userId, uint256 _stakeIndex)",
    params: [_userId, _stakeIndex],
});
sendTransaction(transaction);

## Claim Lifetime Reward
const transaction = prepareContractCall({
    contract,
    method: "function claimLifetimeReward(bytes5 _userId)",
    params: [_userId],
});
sendTransaction(transaction);

## Withdraw
const transaction = prepareContractCall({
    contract,
    method: "function withdraw(bytes5 _userId, uint256 _amount)",
    params: [_userId, _amount],
});
sendTransaction(transaction);