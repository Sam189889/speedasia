## Admin Functions
import { useReadContract } from "thirdweb/react";

## Total Users Count
const { data, isPending } = useReadContract({
    contract,
    method: "function totalUsersCount() view returns (uint256)",
    params: [],
});

## All Users array to be used with totalUsersCount for pagination
const { data, isPending } = useReadContract({
    contract,
    method: "function allUsers(uint256) view returns (address)",
    params: [],
});

## Contract Stats
const { data, isPending } = useReadContract({
    contract,
    method:
      "function getContractStats() view returns (uint256 _totalUsers, uint256 _totalStaked, uint256 _totalWithdrawn, uint256 _totalDirectIncome, uint256 _totalLevelIncome, uint256 _totalStakingIncome, uint256 _totalLifetimeRewards, uint256 _contractBalance)",
    params: [],
});


## Partners of administration
const { data, isPending } = useReadContract({
    contract,
    method: "function getPartners() view returns (address[], uint256[])",
    params: [],
});

## Admin Transactional Functions(Call on proxy --> src\hooks\contracts\useSpeed.ts )
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

const sendTransaction = useSendTransaction();

## setDirectIncomeConfig
const transaction = prepareContractCall({
    contract,
    method:
    "function setDirectIncomeConfig(uint256 _percent, uint256 _minStake)",
    params: [_percent, _minStake],
});
sendTransaction(transaction);

## setDurations
const transaction = prepareContractCall({
    contract,
    method:
    "function setDurations(uint256 _d1, uint256 _d2, uint256 _d3, uint256 _d4)",
    params: [_d1, _d2, _d3, _d4],
});
sendTransaction(transaction);

## setInterestRates
const transaction = prepareContractCall({
    contract,
    method:
    "function setInterestRates(uint256 _r1, uint256 _r2, uint256 _r3, uint256 _r4)",
    params: [_r1, _r2, _r3, _r4],
});
sendTransaction(transaction);

## setLevelUnlockConfig
const transaction = prepareContractCall({
    contract,
    method:
    "function setLevelUnlockConfig(uint256 _minStake, uint256 _businessForAll)",
    params: [_minStake, _businessForAll],
});
sendTransaction(transaction);


## setMinWithdrawal
const transaction = prepareContractCall({
    contract,
    method: "function setMinWithdrawal(uint256 _amount)",
    params: [_amount],
});
sendTransaction(transaction);


## setPartners
const transaction = prepareContractCall({
    contract,
    method: "function setPartners(address[] _partners, uint256[] _shares)",
    params: [_partners, _shares],
});
sendTransaction(transaction);


## setStakingTiers
const transaction = prepareContractCall({
    contract,
    method:
    "function setStakingTiers(uint256 _tier1, uint256 _tier2, uint256 _tier3Min, uint256 _max)",
    params: [_tier1, _tier2, _tier3Min, _max],
});
sendTransaction(transaction);

## emergencyWithdraw
const transaction = prepareContractCall({
    contract,
    method: "function emergencyWithdraw(uint256 _amount)",
    params: [_amount],
});
sendTransaction(transaction);


## Get firstUser
const { data, isPending } = useReadContract({
    contract,
    method: "function firstUser() view returns (address)",
    params: [],
});

## transferFirstUser
const transaction = prepareContractCall({
    contract,
    method: "function transferFirstUser(address _newFirstUser)",
    params: [_newFirstUser],
});
sendTransaction(transaction);