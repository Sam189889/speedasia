'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUserDashboard } from '@/hooks/user/useUserDashboard';
import { useLifetimeRewardProgress, useAllLevelsSummary } from '@/hooks/user/useUserData';
import { useUserTransactions } from '@/hooks/user/useUserTransactions';
import { useUserBalances } from '@/hooks/user/useUserBalances';
import { formatUSDT, usdtToWei } from '@/hooks/common/formatters';

interface EarningsTabProps {
    userId: `0x${string}` | undefined;
}

export default function EarningsTab({ userId }: EarningsTabProps) {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    const { dashboard, isLoading } = useUserDashboard(userId);
    const { levelCounts, levelBusiness } = useAllLevelsSummary(userId);

    // Calculate totals from levels (same as TeamTab)
    const totalLevelUsers = levelCounts.reduce((sum, count) => sum + Number(count), 0);
    const totalLevelBusiness = levelBusiness.reduce((sum, biz) => sum + biz, BigInt(0));

    const {
        teamSizeRequired,
        directsRequired,
        businessRequired,
        rewardAmounts,
        isClaimed,
        isEligible,
        isLoading: rewardsLoading
    } = useLifetimeRewardProgress(userId);
    const { withdraw, claimLifetimeReward, isPending } = useUserTransactions();
    const { hasEnoughGas, getNativeBalanceDisplay } = useUserBalances();

    // Loading state
    if (isLoading || rewardsLoading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                    <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-xl">Loading Earnings...</p>
                </div>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                    <p className="text-gray-400">No earnings data available</p>
                </div>
            </div>
        );
    }

    const { incomes, team } = dashboard;

    // Calculate percentages for progress bars
    const totalIncome = Number(incomes.totalIncome) || 1;
    const getPercentage = (amount: bigint) => {
        return Math.round((Number(amount) / totalIncome) * 100);
    };

    // Earnings breakdown data
    const earningsData = [
        {
            type: 'Staking Income',
            amount: incomes.stakingIncome,
            percentage: getPercentage(incomes.stakingIncome),
            icon: '💎',
            color: 'from-blue-500 to-blue-600'
        },
        {
            type: 'Direct Income',
            amount: incomes.directIncome,
            percentage: getPercentage(incomes.directIncome),
            icon: '👥',
            color: 'from-green-500 to-green-600'
        },
        {
            type: 'Level Income',
            amount: incomes.levelIncome,
            percentage: getPercentage(incomes.levelIncome),
            icon: '📊',
            color: 'from-purple-500 to-purple-600'
        },
        {
            type: 'Lifetime Rewards',
            amount: incomes.lifetimeRewardIncome,
            percentage: getPercentage(incomes.lifetimeRewardIncome),
            icon: '🏆',
            color: 'from-yellow-500 to-yellow-600'
        }
    ];

    // Handle withdrawal
    const handleWithdraw = async () => {
        if (!userId) {
            toast.error('User not found!');
            return;
        }

        const amount = parseFloat(withdrawAmount);
        if (isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid amount!');
            return;
        }

        const amountWei = usdtToWei(withdrawAmount);
        if (amountWei > incomes.availableBalance) {
            toast.error('Amount exceeds available balance!');
            return;
        }

        if (!hasEnoughGas()) {
            toast.error('Insufficient BNB for gas fees!');
            return;
        }

        try {
            toast.loading('Processing withdrawal...', { id: 'withdraw' });
            await withdraw(userId, amountWei);
            toast.success('Withdrawal successful! 🎉', { id: 'withdraw' });
            setShowWithdrawModal(false);
            setWithdrawAmount('');
            setTimeout(() => window.location.reload(), 2000);
        } catch (error) {
            console.error('Withdrawal error:', error);
            toast.error('Withdrawal failed. Please try again.', { id: 'withdraw' });
        }
    };

    // Handle claim lifetime reward
    const handleClaimReward = async () => {
        if (!userId) {
            toast.error('User not found!');
            return;
        }

        if (!hasEnoughGas()) {
            toast.error('Insufficient BNB for gas fees!');
            return;
        }

        try {
            toast.loading('Claiming reward...', { id: 'claim' });
            await claimLifetimeReward(userId);
            toast.success('Reward claimed successfully! 🎉', { id: 'claim' });
            setTimeout(() => window.location.reload(), 2000);
        } catch (error) {
            console.error('Claim error:', error);
            toast.error('Claim failed. Please try again.', { id: 'claim' });
        }
    };

    const availableBalance = Number(formatUSDT(incomes.availableBalance).replace(/,/g, ''));

    // Lifetime reward tier names
    const tierNames = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crown'];
    const tierEmojis = ['🥉', '🥈', '🥇', '💎', '👑', '🏆'];

    // Count claimed and completed
    const claimedCount = isClaimed.filter(c => c).length;
    const eligibleCount = isEligible.filter(e => e).length;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Available Balance & Withdraw */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-green-500/10 border-2 border-green-500/30 rounded-lg">
                        <div className="text-sm text-gray-400 uppercase mb-2">Available to Withdraw</div>
                        <div className="text-4xl font-black text-green-400 mb-2">
                            ${formatUSDT(incomes.availableBalance)}
                        </div>
                        <button
                            onClick={() => setShowWithdrawModal(true)}
                            disabled={incomes.availableBalance === BigInt(0)}
                            className="w-full py-3 font-black text-sm uppercase tracking-wider rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                color: '#ffffff'
                            }}
                        >
                            💸 Withdraw Now
                        </button>
                    </div>

                    <div className="text-center p-4 bg-gold-primary/10 border-2 border-gold-primary/30 rounded-lg">
                        <div className="text-sm text-gray-400 uppercase mb-2">Total Withdrawn</div>
                        <div className="text-4xl font-black text-gold-primary mb-2">
                            ${formatUSDT(incomes.totalWithdrawn)}
                        </div>
                        <div className="text-sm text-gray-500">All time withdrawals</div>
                    </div>
                </div>
            </div>

            {/* Total Earnings Card */}
            <div className="card-gold p-6 border-4 border-gold-primary/40 text-center">
                <div className="text-sm text-gray-400 uppercase mb-2">Total Earnings</div>
                <div className="text-5xl font-black text-gold-primary mb-2">
                    ${formatUSDT(incomes.totalIncome)}
                </div>
                <div className="text-gray-400 text-sm">All time earnings from all sources</div>
            </div>

            {/* Earnings Breakdown */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <h2 className="text-xl font-black text-gold-primary mb-6 uppercase">Earnings Breakdown</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {earningsData.map((item, index) => (
                        <div key={index} className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-white font-bold text-sm">{item.type}</span>
                                </div>
                                <span className="text-xl font-black text-gold-primary">
                                    ${formatUSDT(item.amount, 2)}
                                </span>
                            </div>
                            <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${item.color} transition-all`}
                                    style={{ width: `${item.percentage}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{item.percentage}% of total</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lifetime Rewards Section */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-gold-primary uppercase">🏆 Lifetime Rewards</h2>
                    <div className="px-3 py-1.5 bg-gold-primary/10 rounded-full border border-gold-primary/30">
                        <span className="text-gold-primary font-bold text-sm">{claimedCount} / 6 Claimed</span>
                    </div>
                </div>

                {/* Current Stats for Progress */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-black/50 rounded-lg border border-white/10">
                    <div className="text-center">
                        <div className="text-lg font-black text-gold-primary">{totalLevelUsers || Number(team.teamSize)}</div>
                        <div className="text-[10px] text-gray-400 uppercase">Team Size</div>
                    </div>
                    <div className="text-center border-x border-white/10">
                        <div className="text-lg font-black text-green-400">{Number(team.qualifyingDirectCount)}</div>
                        <div className="text-[10px] text-gray-400 uppercase">Directs ($20+)</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-black text-blue-400">${formatUSDT(totalLevelBusiness || team.teamBusinessVolume, 0)}</div>
                        <div className="text-[10px] text-gray-400 uppercase">Business</div>
                    </div>
                </div>

                {/* Reward Tiers */}
                <div className="space-y-3">
                    {rewardAmounts.map((reward, index) => {
                        const claimed = isClaimed[index];
                        const eligible = isEligible[index];
                        const teamReq = Number(teamSizeRequired[index] || 0);
                        const directReq = Number(directsRequired[index] || 0);
                        const businessReq = businessRequired[index] || BigInt(0);

                        // Calculate progress - using qualifyingDirectCount for $20+ referrals
                        const teamProgress = Math.min(100, (Number(team.teamSize) / teamReq) * 100 || 0);
                        const directProgress = Math.min(100, (Number(team.qualifyingDirectCount) / directReq) * 100 || 0);
                        const businessProgress = Math.min(100, (Number(team.teamBusinessVolume) / Number(businessReq)) * 100 || 0);
                        const overallProgress = Math.min(100, (teamProgress + directProgress + businessProgress) / 3);

                        return (
                            <div
                                key={index}
                                className={`p-4 rounded-lg border-2 transition-all ${claimed
                                    ? 'bg-green-500/10 border-green-500/30'
                                    : eligible
                                        ? 'bg-gold-primary/10 border-gold-primary animate-pulse'
                                        : 'bg-black/50 border-white/10'
                                    }`}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{tierEmojis[index]}</span>
                                        <div>
                                            <span className="text-white font-bold">{tierNames[index]}</span>
                                            <span className="text-gray-500 text-xs ml-2">Tier {index + 1}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xl font-black ${claimed ? 'text-green-400' : eligible ? 'text-gold-primary' : 'text-gray-500'}`}>
                                            ${formatUSDT(reward, 0)}
                                        </div>
                                        {claimed && <span className="text-xs text-green-400">✓ Claimed</span>}
                                        {!claimed && eligible && (
                                            <button
                                                onClick={handleClaimReward}
                                                disabled={isPending}
                                                className="text-xs px-2 py-1 bg-gold-primary text-black font-bold rounded hover:scale-105 transition-all"
                                            >
                                                Claim Now
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Requirements */}
                                {!claimed && (
                                    <div className="space-y-2">
                                        {/* Team Size */}
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400">Team Size</span>
                                            <span className={Number(team.teamSize) >= teamReq ? 'text-green-400' : 'text-gray-500'}>
                                                {Number(team.teamSize)} / {teamReq}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 transition-all" style={{ width: `${teamProgress}%` }}></div>
                                        </div>

                                        {/* Directs ($20+) */}
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400">Direct Referrals ($20+)</span>
                                            <span className={Number(team.qualifyingDirectCount) >= directReq ? 'text-green-400' : 'text-gray-500'}>
                                                {Number(team.qualifyingDirectCount)} / {directReq}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 transition-all" style={{ width: `${directProgress}%` }}></div>
                                        </div>

                                        {/* Business */}
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400">Team Business</span>
                                            <span className={team.teamBusinessVolume >= businessReq ? 'text-green-400' : 'text-gray-500'}>
                                                ${formatUSDT(team.teamBusinessVolume, 0)} / ${formatUSDT(businessReq, 0)}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gold-primary transition-all" style={{ width: `${businessProgress}%` }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Withdrawal Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                    <div className="card-gold p-6 border-4 border-gold-primary/40 max-w-md w-full animate-in zoom-in-95">
                        <h3 className="text-xl font-black text-gold-primary mb-4 uppercase">Withdraw Funds</h3>

                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg mb-4 text-center">
                            <span className="text-gray-400 text-sm">Available: </span>
                            <span className="text-green-400 font-bold">${formatUSDT(incomes.availableBalance)}</span>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-400 mb-2">Amount (USDT)</label>
                            <input
                                type="number"
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full px-4 py-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white text-lg focus:border-gold-primary focus:outline-none"
                                max={availableBalance}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {[25, 50, 75, 100].map((percent) => {
                                const amount = (availableBalance * percent / 100).toFixed(2);
                                return (
                                    <button
                                        key={percent}
                                        onClick={() => setWithdrawAmount(amount)}
                                        className="px-2 py-2 text-xs font-bold rounded-lg border border-gold-primary/30 bg-black/30 text-gold-primary hover:bg-gold-primary/10"
                                    >
                                        {percent}%
                                    </button>
                                );
                            })}
                        </div>

                        <div className={`p-2 rounded-lg mb-4 text-center text-sm ${hasEnoughGas() ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            BNB for gas: {getNativeBalanceDisplay()}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowWithdrawModal(false)}
                                className="flex-1 py-3 font-bold rounded-lg border-2 border-gray-600 text-gray-400 hover:border-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleWithdraw}
                                disabled={isPending || !withdrawAmount || parseFloat(withdrawAmount) <= 0}
                                className="flex-1 py-3 font-black uppercase rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-black"
                                style={{
                                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                }}
                            >
                                {isPending ? 'Processing...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
