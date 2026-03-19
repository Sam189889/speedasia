export const SpeedAsiaABI = [
  {
    "type": "function",
    "name": "PERCENTAGE_DENOMINATOR",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "addressToUserId",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "allUsers",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "boosterIncomePercent",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "boosterTimeWindow",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "boosterTrackers",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "ownPackageActivationTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "ownPackageAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "qualifyingReferralsCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "windowStartTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "currentStakeIndex",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "claimAndCompound",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      },
      {
        "name": "_stakeIndex",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_additionalAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "claimAndRestake",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      },
      {
        "name": "_stakeIndex",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_restakeAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_additionalAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_duration",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "claimDailyRoi",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      },
      {
        "name": "_stakeIndex",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "claimLifetimeReward",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "dailyRoiPercent",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "directBusinessForAllLevels",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "directIncomePercent",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "durationFour",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "durationOne",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "durationThree",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "durationTwo",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "emergencyWithdraw",
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "firstUser",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getAllLevelsSummary",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "outputs": [
      {
        "name": "levelCounts",
        "type": "uint256[20]",
        "internalType": "uint256[20]"
      },
      {
        "name": "levelBusiness",
        "type": "uint256[20]",
        "internalType": "uint256[20]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getBoosterTracker",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "outputs": [
      {
        "name": "windowStartTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "windowEndTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "qualifyingReferralsCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "ownPackageAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "currentStakeIndex",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "isWindowActive",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "timeRemaining",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCompletedRoiDays",
    "inputs": [
      {
        "name": "_lastClaimTime",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getContractStats",
    "inputs": [],
    "outputs": [
      {
        "name": "_totalUsers",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_totalStaked",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_totalWithdrawn",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_totalDirectIncome",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_totalLevelIncome",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_totalStakingIncome",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_totalLifetimeRewards",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_contractBalance",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCurrentDayRoiCloseTime",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLegsBreakdown",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "outputs": [
      {
        "name": "strongestLeg",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "otherLegsSum",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "legVolumes",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLevelUsers",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      },
      {
        "name": "_level",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "userIds",
        "type": "bytes5[]",
        "internalType": "bytes5[]"
      },
      {
        "name": "staked",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getLifetimeRewardProgress",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "outputs": [
      {
        "name": "teamSizeRequired",
        "type": "uint256[6]",
        "internalType": "uint256[6]"
      },
      {
        "name": "directsRequired",
        "type": "uint256[6]",
        "internalType": "uint256[6]"
      },
      {
        "name": "businessRequired",
        "type": "uint256[6]",
        "internalType": "uint256[6]"
      },
      {
        "name": "rewardAmounts",
        "type": "uint256[6]",
        "internalType": "uint256[6]"
      },
      {
        "name": "isClaimed",
        "type": "bool[6]",
        "internalType": "bool[6]"
      },
      {
        "name": "isEligible",
        "type": "bool[6]",
        "internalType": "bool[6]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPartners",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserByUserId",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserDashboard",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "outputs": [
      {
        "name": "info",
        "type": "tuple",
        "internalType": "struct SpeedAsia.UserInfo",
        "components": [
          {
            "name": "userId",
            "type": "bytes5",
            "internalType": "bytes5"
          },
          {
            "name": "referrer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "registrationTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      },
      {
        "name": "team",
        "type": "tuple",
        "internalType": "struct SpeedAsia.UserTeam",
        "components": [
          {
            "name": "directReferralIds",
            "type": "bytes5[]",
            "internalType": "bytes5[]"
          },
          {
            "name": "directReferralCount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "qualifyingDirectCount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "directBusinessVolume",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "qualifyingDirectBusiness",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "teamSize",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "teamBusinessVolume",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "unlockedLevels",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "incomes",
        "type": "tuple",
        "internalType": "struct SpeedAsia.UserIncomes",
        "components": [
          {
            "name": "directIncome",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "levelIncome",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "stakingIncome",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lifetimeRewardIncome",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalIncome",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "availableBalance",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalWithdrawn",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lastClaimedRewardTier",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "stakingStats",
        "type": "tuple",
        "internalType": "struct SpeedAsia.UserStakingStats",
        "components": [
          {
            "name": "totalStaked",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "activeStakedAmount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalClaimed",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "activeStakesCount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lastStakeAmount",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "stakes",
        "type": "tuple[]",
        "internalType": "struct SpeedAsia.UserStake[]",
        "components": [
          {
            "name": "stakeId",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "amount",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "duration",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "interestRate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "startTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "endTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "isClaimed",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "lastRoiClaimTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "totalRoiEarned",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "isMigrated",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "boostedRoiPercent",
            "type": "uint256",
            "internalType": "uint256"
          }
        ]
      },
      {
        "name": "unlockedLevels",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "levelsUnlocked",
        "type": "bool[20]",
        "internalType": "bool[20]"
      },
      {
        "name": "nextRewardTier",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "nextRewardEligible",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "nextRewardAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserIdByAddress",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "_usdtToken",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_firstUser",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "interestFour",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "interestOne",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "interestThree",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "interestTwo",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isUserActiveNow",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isV2Active",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "levelIncomePercents",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "levelsPerDirect",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "lifetimeRewardTiers",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "teamSize",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "directReferrals",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "businessVolume",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "rewardAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "maxLevels",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "maxStaking",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "minDirectIncomeStake",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "minStakeForLevelCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "minWithdrawal",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "partnerAddresses",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "partnerShares",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "register",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_referrerId",
        "type": "bytes5",
        "internalType": "bytes5"
      },
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_duration",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "roiCloseTimeHour",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "roiDayStartTime",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "setDirectIncomeConfig",
    "inputs": [
      {
        "name": "_percent",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_minStake",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setDurations",
    "inputs": [
      {
        "name": "_d1",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_d2",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_d3",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_d4",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setInterestRates",
    "inputs": [
      {
        "name": "_r1",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_r2",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_r3",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_r4",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setLevelIncomePercent",
    "inputs": [
      {
        "name": "_level",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_percent",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setLevelIncomePercents",
    "inputs": [
      {
        "name": "_percents",
        "type": "uint256[20]",
        "internalType": "uint256[20]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setLevelUnlockConfig",
    "inputs": [
      {
        "name": "_minStake",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_businessForAll",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_levelsPerDirect",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setLifetimeRewardTier",
    "inputs": [
      {
        "name": "_tier",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_teamSize",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_directReferrals",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_businessVolume",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_rewardAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setMinWithdrawal",
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setPartners",
    "inputs": [
      {
        "name": "_partners",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "_shares",
        "type": "uint256[]",
        "internalType": "uint256[]"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "setStakingTiers",
    "inputs": [
      {
        "name": "_tier1",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_tier2",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_tier3Min",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_max",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "stake",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      },
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "_duration",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "stakingTier1",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "stakingTier2",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "stakingTier3Min",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "stringToUserId",
    "inputs": [
      {
        "name": "_userIdStr",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "stateMutability": "pure"
  },
  {
    "type": "function",
    "name": "totalDirectIncomePaid",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalLevelIncomePaid",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalLifetimeRewardsPaid",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalStakedAmount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalStakesMigrated",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalStakingIncomePaid",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalUsersCount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalWithdrawnAmount",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferFirstUser",
    "inputs": [
      {
        "name": "_newFirstUser",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "usdtToken",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IERC20"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userIdToAddress",
    "inputs": [
      {
        "name": "",
        "type": "bytes5",
        "internalType": "bytes5"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userIncomes",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "directIncome",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "levelIncome",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "stakingIncome",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "lifetimeRewardIncome",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "totalIncome",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "availableBalance",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "totalWithdrawn",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "lastClaimedRewardTier",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userInfo",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "userId",
        "type": "bytes5",
        "internalType": "bytes5"
      },
      {
        "name": "referrer",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "registrationTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "isActive",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userStakes",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "stakeId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "duration",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "interestRate",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "startTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "endTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "isActive",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "isClaimed",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "lastRoiClaimTime",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "totalRoiEarned",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "isMigrated",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "boostedRoiPercent",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userStakingStats",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "totalStaked",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "activeStakedAmount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "totalClaimed",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "activeStakesCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "lastStakeAmount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userTeam",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "directReferralCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "qualifyingDirectCount",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "directBusinessVolume",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "qualifyingDirectBusiness",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "teamSize",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "teamBusinessVolume",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "unlockedLevels",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      },
      {
        "name": "_amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawCapital",
    "inputs": [
      {
        "name": "_userId",
        "type": "bytes5",
        "internalType": "bytes5"
      },
      {
        "name": "_stakeIndex",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawalFeePercent",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "BoosterIncomeEarned",
    "inputs": [
      {
        "name": "referrer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "CapitalWithdrawn",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "stakeId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DailyRoiClaimed",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "stakeId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "roiAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "daysClaimed",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "DirectIncomeEarned",
    "inputs": [
      {
        "name": "earner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Initialized",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "usdtToken",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LevelIncomeEarned",
    "inputs": [
      {
        "name": "earner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "from",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "level",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "LifetimeRewardClaimed",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "tier",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "StakeClaimed",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "stakeId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "principal",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "interest",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Staked",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "stakeId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "duration",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "UserRegistered",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "referrer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Withdrawal",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AlreadyFirstUser",
    "inputs": []
  },
  {
    "type": "error",
    "name": "AlreadyInitialized",
    "inputs": []
  },
  {
    "type": "error",
    "name": "BelowMinimumWithdrawal",
    "inputs": []
  },
  {
    "type": "error",
    "name": "CannotReferSelf",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InsufficientAvailableBalance",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidAmount",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidDuration",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidLevel",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidPartner",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidReferrer",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidStakingAmount",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidTier",
    "inputs": []
  },
  {
    "type": "error",
    "name": "InvalidUserIdLength",
    "inputs": []
  },
  {
    "type": "error",
    "name": "LengthMismatch",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NoPartners",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NoPartnersSet",
    "inputs": []
  },
  {
    "type": "error",
    "name": "NoRoiAvailable",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ReferrerNotActive",
    "inputs": []
  },
  {
    "type": "error",
    "name": "RewardAlreadyClaimed",
    "inputs": []
  },
  {
    "type": "error",
    "name": "RewardConditionsNotMet",
    "inputs": []
  },
  {
    "type": "error",
    "name": "SharesMustTotal10000",
    "inputs": []
  },
  {
    "type": "error",
    "name": "StakeAlreadyClaimed",
    "inputs": []
  },
  {
    "type": "error",
    "name": "StakeAmountTooLow",
    "inputs": [
      {
        "name": "required",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "provided",
        "type": "uint256",
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "error",
    "name": "StakeMustBeGreaterOrEqual",
    "inputs": []
  },
  {
    "type": "error",
    "name": "StakeNotActive",
    "inputs": []
  },
  {
    "type": "error",
    "name": "StakeNotFound",
    "inputs": []
  },
  {
    "type": "error",
    "name": "StakeNotMatured",
    "inputs": []
  },
  {
    "type": "error",
    "name": "StakeNotMigrated",
    "inputs": []
  },
  {
    "type": "error",
    "name": "Unauthorized",
    "inputs": []
  },
  {
    "type": "error",
    "name": "UserAlreadyRegistered",
    "inputs": []
  },
  {
    "type": "error",
    "name": "UserNotRegistered",
    "inputs": []
  },
  {
    "type": "error",
    "name": "V2NotActive",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ZeroAddress",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ZeroAmount",
    "inputs": []
  }
] as const;
