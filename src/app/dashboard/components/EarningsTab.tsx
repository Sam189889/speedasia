'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUserDashboard } from '@/hooks/user/useUserDashboard';
import { useLifetimeRewardProgress, useAllLevelsSummary, useLevelUsers } from '@/hooks/user/useUserData';
import { useUserTransactions } from '@/hooks/user/useUserTransactions';
import { useUserBalances } from '@/hooks/user/useUserBalances';
import { useLegsBreakdown } from '@/hooks/user/useLegsBreakdown';
import { formatUSDT, usdtToWei } from '@/hooks/common/formatters';

interface EarningsTabProps {
    userId: `0x${string}` | undefined;
}

export default function EarningsTab({ userId }: EarningsTabProps) {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    const { dashboard, isLoading } = useUserDashboard(userId);
    const { levelCounts, levelBusiness } = useAllLevelsSummary(userId);
    const { legVolumes, isLoading: legsLoading } = useLegsBreakdown(userId);
    const { staked: level1Stakes } = useLevelUsers(userId, 1);

    // Calculate totals from levels (same as TeamTab) - only if we have level data
    const totalLevelUsers = levelCounts.length > 0 ? levelCounts.reduce((sum, count) => sum + Number(count), 0) : 0;
    const totalLevelBusiness = levelBusiness.length > 0 ? levelBusiness.reduce((sum, biz) => sum + biz, BigInt(0)) : BigInt(0);

    // Adjusted leg volumes: add each direct's own stake to their sub-team volume
    // contract _getTeamStats(direct) counts only children, not the direct themselves
    const adjustedLegVolumes = legVolumes.map((vol, i) => vol + (level1Stakes[i] ?? BigInt(0)));
    let adjustedStrongestLeg = BigInt(0);
    let adjustedOtherLegsSum = BigInt(0);
    adjustedLegVolumes.forEach(vol => {
        if (vol > adjustedStrongestLeg) {
            adjustedOtherLegsSum += adjustedStrongestLeg;
            adjustedStrongestLeg = vol;
        } else {
            adjustedOtherLegsSum += vol;
        }
    });
    const totalLegs = adjustedLegVolumes.length;

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

    // Calculate percentages for progress bars - convert from wei to dollars first
    const totalIncomeDollars = Number(incomes.totalIncome / BigInt(1e18)) || 1;
    const getPercentage = (amount: bigint) => {
        const amountDollars = Number(amount / BigInt(1e18));
        const percentage = (amountDollars / totalIncomeDollars) * 100;
        return percentage;
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
            icon: '🤝',
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

    const withdrawalAmountWei = withdrawAmount ? usdtToWei(withdrawAmount) : BigInt(0);
    const withdrawalFeeWei = withdrawalAmountWei > BigInt(0)
        ? (withdrawalAmountWei * BigInt(500)) / BigInt(10000)
        : BigInt(0);
    const withdrawalNetWei = withdrawalAmountWei > BigInt(0)
        ? withdrawalAmountWei - withdrawalFeeWei
        : BigInt(0);

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
                                    style={{ width: `${item.amount > BigInt(0) && item.percentage < 2 ? 2 : item.percentage}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                {item.percentage >= 0.01 ? `${item.percentage.toFixed(2)}%` : item.amount > BigInt(0) ? '< 0.01%' : '0%'} of total
                            </div>
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
                        <div className="text-[10px] text-gray-400 uppercase">Directs ($100+)</div>
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

                        // Calculate progress
                        const currentTeam = totalLevelUsers || Number(team.teamSize);
                        const teamProgress = Math.min(100, (currentTeam / teamReq) * 100 || 0);
                        const directProgress = Math.min(100, (Number(team.qualifyingDirectCount) / directReq) * 100 || 0);

                        // 50-50 leg matching: both legs must reach halfTarget = businessReq / 2
                        const halfTarget = businessReq / BigInt(2);
                        const legADollars = Number(adjustedStrongestLeg / BigInt(1e18));
                        const legBDollars = Number(adjustedOtherLegsSum / BigInt(1e18));
                        const halfTargetDollars = Number(halfTarget / BigInt(1e18));
                        const legAProgress = halfTargetDollars > 0 ? Math.min(100, (legADollars / halfTargetDollars) * 100) : 0;
                        const legBProgress = halfTargetDollars > 0 ? Math.min(100, (legBDollars / halfTargetDollars) * 100) : 0;
                        const legAMet = adjustedStrongestLeg >= halfTarget;
                        const legBMet = adjustedOtherLegsSum >= halfTarget;

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
                                            <span className={currentTeam >= teamReq ? 'text-green-400' : 'text-gray-500'}>
                                                {currentTeam} / {teamReq}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 transition-all" style={{ width: `${teamProgress}%` }}></div>
                                        </div>

                                        {/* Directs ($100+) */}
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400">Direct Referrals ($100+)</span>
                                            <span className={Number(team.qualifyingDirectCount) >= directReq ? 'text-green-400' : 'text-gray-500'}>
                                                {Number(team.qualifyingDirectCount)} / {directReq}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 transition-all" style={{ width: `${directProgress}%` }}></div>
                                        </div>

                                        {/* Leg A Matching */}
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400">🏆 Leg A (Strongest)</span>
                                            <span className={legAMet ? 'text-green-400' : 'text-gray-500'}>
                                                ${formatUSDT(adjustedStrongestLeg, 0)} / ${formatUSDT(halfTarget, 0)}
                                                {legAMet && ' ✓'}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full transition-all rounded-full"
                                                style={{ width: `${legAProgress > 0 && legAProgress < 2 ? 2 : legAProgress}%`, background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)' }}
                                            ></div>
                                        </div>

                                        {/* Leg B Matching */}
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-400">👥 Leg B (Others)</span>
                                            <span className={legBMet ? 'text-green-400' : 'text-gray-500'}>
                                                ${formatUSDT(adjustedOtherLegsSum, 0)} / ${formatUSDT(halfTarget, 0)}
                                                {legBMet && ' ✓'}
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full transition-all rounded-full"
                                                style={{ width: `${legBProgress > 0 && legBProgress < 2 ? 2 : legBProgress}%`, background: 'linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)' }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Leg Breakdown Card - For Lifetime Rewards Matching */}
                {totalLegs > 0 && (
                    <div className="mt-6 p-6 border-4 border-purple-500/40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl">
                        <div className="mb-6">
                            <h3 className="text-xl font-black text-purple-400 uppercase mb-2">⚖️ Leg Business Breakdown</h3>
                            <p className="text-sm text-gray-400">50-50 Matching: Strongest Leg + All Other Legs</p>
                        </div>

                        {/* Main Stats Grid */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {/* Strongest Leg */}
                            <div className="p-4 bg-gradient-to-br from-gold-primary/20 to-transparent border-2 border-gold-primary/40 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gold-primary/20 flex items-center justify-center text-xl">
                                        🏆
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase">Strongest Leg (A)</div>
                                        <div className="text-2xl font-black text-gold-primary">
                                            ${formatUSDT(adjustedStrongestLeg, 0)}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">Highest performing direct + their full team</div>
                            </div>

                            {/* Other Legs Sum */}
                            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-transparent border-2 border-blue-500/40 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xl">
                                        👥
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase">Other Legs (B)</div>
                                        <div className="text-2xl font-black text-blue-400">
                                            ${formatUSDT(adjustedOtherLegsSum, 0)}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">Combined volume of all other directs + their teams</div>
                            </div>
                        </div>

                        {/* Individual Legs */}
                        {adjustedLegVolumes.length > 0 && (
                            <div className="space-y-2">
                                <div className="text-sm font-bold text-purple-400 mb-3">Individual Legs ({totalLegs}):</div>
                                <div className="max-h-40 overflow-y-auto space-y-2">
                                    {adjustedLegVolumes.map((volume, index) => {
                                        const isStrongest = volume === adjustedStrongestLeg;
                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-between p-3 rounded-lg ${
                                                    isStrongest
                                                        ? 'bg-gold-primary/20 border border-gold-primary/40'
                                                        : 'bg-black/30 border border-gray-700/30'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-mono text-gray-400">Leg {index + 1}</span>
                                                    {isStrongest && <span className="text-xs">👑</span>}
                                                </div>
                                                <span className={`font-bold ${isStrongest ? 'text-gold-primary' : 'text-white'}`}>
                                                    ${formatUSDT(volume, 0)}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Info Note */}
                        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <p className="text-xs text-purple-300 text-center">
                                <span className="font-bold">💡 Matching Rule:</span> Both Leg A and Leg B must reach 50% of the target business volume to claim rewards!
                            </p>
                        </div>
                    </div>
                )}
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

                        <div className="p-4 bg-black/50 border border-gold-primary/20 rounded-lg mb-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Requested</span>
                                <span className="text-white font-bold">${withdrawAmount ? formatUSDT(withdrawalAmountWei) : '0.00'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Withdrawal Fee (5%)</span>
                                <span className="text-red-400 font-bold">-${withdrawAmount ? formatUSDT(withdrawalFeeWei) : '0.00'}</span>
                            </div>
                            <div className="border-t border-white/10 pt-2 flex justify-between text-sm">
                                <span className="text-gold-primary font-bold">Net to Wallet</span>
                                <span className="text-gold-primary font-black">${withdrawAmount ? formatUSDT(withdrawalNetWei) : '0.00'}</span>
                            </div>
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
