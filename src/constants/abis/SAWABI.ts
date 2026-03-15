export const SAWABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
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
    "name": "claimStake",
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
    "name": "emergencyRecoverTokens",
    "inputs": [
      {
        "name": "_token",
        "type": "address",
        "internalType": "address"
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
    "name": "emergencyRecoverUSDT",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
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
        "internalType": "struct ISpeedAsia.UserInfo",
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
        "internalType": "struct ISpeedAsia.UserTeam",
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
        "internalType": "struct ISpeedAsia.UserIncomes",
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
        "internalType": "struct ISpeedAsia.UserStakingStats",
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
        "internalType": "struct ISpeedAsia.UserStake[]",
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
    "name": "isUserActiveNow",
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
    "name": "migrateStakeToV2",
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
    "name": "register",
    "inputs": [
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
    "name": "speedAsia",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract ISpeedAsia"
      }
    ],
    "stateMutability": "view"
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
    "name": "startSpeedAsia",
    "inputs": [
      {
        "name": "_contAddr",
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
  }
] as const;
