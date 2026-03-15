'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { useUserTransactions } from '@/hooks/user/useUserTransactions';
import { useUserBalances } from '@/hooks/user/useUserBalances';
import { useTokenApproval } from '@/hooks/user/useTokenApproval';
import { useContractConfig } from '@/hooks/common/useContractData';
import { useUserDashboard } from '@/hooks/user/useUserDashboard';
import { formatUSDT, usdtToWei } from '@/hooks/common/formatters';

interface StakeData {
    stakeIndex: number;
    amount: bigint;
    interest: bigint;
    endTime: number;
    isActive: boolean;
    isClaimed: boolean;
    plan: string;
    interestRate: number;
    progress: number;
    daysLeft: number;
}

interface ActiveStakesProps {
    stakes: StakeData[];
    userId: `0x${string}` | undefined;
    onCreateStake: () => void;
    onRefresh: () => void;
}

// Countdown Timer Component
function CountdownTimer({ endTime }: { endTime: number }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = Math.floor(Date.now() / 1000);
            const diff = endTime - now;

            if (diff <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(diff / 86400),
                hours: Math.floor((diff % 86400) / 3600),
                minutes: Math.floor((diff % 3600) / 60),
                seconds: diff % 60
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="flex gap-1 text-center">
            <div className="bg-black/60 rounded px-2 py-1 border border-gold-primary/30">
                <div className="text-gold-primary font-black text-lg leading-none">{pad(timeLeft.days)}</div>
                <div className="text-[8px] text-gray-500 uppercase">Days</div>
            </div>
            <span className="text-gold-primary font-bold self-center">:</span>
            <div className="bg-black/60 rounded px-2 py-1 border border-gold-primary/30">
                <div className="text-gold-primary font-black text-lg leading-none">{pad(timeLeft.hours)}</div>
                <div className="text-[8px] text-gray-500 uppercase">Hrs</div>
            </div>
            <span className="text-gold-primary font-bold self-center">:</span>
            <div className="bg-black/60 rounded px-2 py-1 border border-gold-primary/30">
                <div className="text-gold-primary font-black text-lg leading-none">{pad(timeLeft.minutes)}</div>
                <div className="text-[8px] text-gray-500 uppercase">Min</div>
            </div>
            <span className="text-gold-primary font-bold self-center">:</span>
            <div className="bg-black/60 rounded px-2 py-1 border border-gold-primary/30">
                <div className="text-gold-primary font-black text-lg leading-none">{pad(timeLeft.seconds)}</div>
                <div className="text-[8px] text-gray-500 uppercase">Sec</div>
            </div>
        </div>
    );
}

// Simple Just Claim Modal
function JustClaimModal({
    stake,
    userId,
    onClose,
    onSuccess
}: {
    stake: StakeData;
    userId: `0x${string}`;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const { claimStake, isPending } = useUserTransactions();
    const { hasEnoughGas, getNativeBalanceDisplay } = useUserBalances();

    // Calculate total payout
    const principal = stake.amount;
    const interestAmount = (principal * stake.interest) / BigInt(10000);
    const totalPayout = principal + interestAmount;

    const handleClaim = async () => {
        if (!hasEnoughGas()) {
            toast.error('Insufficient BNB for gas fees!');
            return;
        }

        try {
            toast.loading('Claiming stake...', { id: 'claim' });
            await claimStake(userId, BigInt(stake.stakeIndex));
            toast.success('Stake claimed successfully! 🎉', { id: 'claim' });
            onSuccess();
        } catch (error) {
            console.error('Claim error:', error);
            toast.error('Claim failed. Please try again.', { id: 'claim' });
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4">
            <div className="card-gold p-6 border-4 border-green-500/40 max-w-sm w-full animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-black text-green-400 uppercase">💰 Claim Stake</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>

                {/* Payout Summary */}
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-4 text-center">
                    <div className="text-sm text-gray-400 mb-1">You will receive</div>
                    <div className="text-4xl font-black text-green-400">${formatUSDT(totalPayout)}</div>
                    <div className="text-xs text-gray-500 mt-2">
                        Principal: ${formatUSDT(principal)} + Interest: ${formatUSDT(interestAmount)}
                    </div>
                </div>

                {/* Where it goes */}
                <div className="p-3 bg-black/50 rounded-lg border border-white/10 mb-4 text-center">
                    <div className="text-sm text-gray-400">Amount will be added to your</div>
                    <div className="text-lg font-bold text-gold-primary">Available Balance</div>
                </div>

                {/* Gas Info */}
                <div className={`p-2 rounded-lg mb-4 text-center text-sm ${hasEnoughGas() ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    BNB for gas: {getNativeBalanceDisplay()}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        className="py-3 font-bold rounded-lg border-2 border-gray-600 text-gray-400 hover:border-gray-400 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleClaim}
                        disabled={isPending}
                        className="py-3 font-black rounded-lg transition-all hover:scale-105 disabled:opacity-50 text-black"
                        style={{
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                        }}
                    >
                        {isPending ? 'Processing...' : 'Confirm Claim'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Claim & Restake Modal
function ClaimRestakeModal({
    stake,
    userId,
    onClose,
    onSuccess
}: {
    stake: StakeData;
    userId: `0x${string}`;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [restakeAmount, setRestakeAmount] = useState('');
    const [additionalAmount, setAdditionalAmount] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(1);

    const { claimAndRestake, isPending } = useUserTransactions();
    const { hasEnoughGas, hasEnoughUsdt, getUsdtBalanceDisplay, getNativeBalanceDisplay } = useUserBalances();
    const { needsApproval, approveTokens, isApproving } = useTokenApproval();
    const { config, durations } = useContractConfig();

    // Get user's dashboard to find last stake amount
    const { dashboard } = useUserDashboard(userId);

    // Calculate total payout (principal + interest)
    const principal = stake.amount;
    const interestAmount = (principal * stake.interest) / BigInt(10000);
    const totalPayout = principal + interestAmount;
    const totalPayoutNum = Number(formatUSDT(totalPayout).replace(/,/g, ''));

    // Get duration options
    const durationOptions = durations?.map((d, index) => ({
        id: index + 1,
        days: Number(d.days) / 86400,
        interest: Number(d.interest) / 100,
        daysRaw: d.days,
    })) || [];

    const selectedDurationInfo = durationOptions.find(d => d.id === selectedDuration) || durationOptions[0];

    // Calculate amounts
    const restakeAmountNum = Number(restakeAmount) || 0;
    const additionalAmountNum = Number(additionalAmount) || 0;
    const newStakeTotal = restakeAmountNum + additionalAmountNum;
    const newStakeTotalWei = usdtToWei(newStakeTotal.toString());
    const toBalance = totalPayoutNum - restakeAmountNum;

    // Stake limits from contract config
    const minStake = config?.stakingTier1 || BigInt(5e18); // Default $5
    const maxStake = config?.maxStaking || BigInt(5000e18); // Default $5000

    // Get user's last stake amount (minimum for new stake) - same as StakeTab
    const getMinStakeAmount = (): bigint => {
        if (!dashboard?.stakes || dashboard.stakes.length === 0) {
            return config?.stakingTier1 || BigInt(0);
        }
        const lastStake = dashboard.stakes[dashboard.stakes.length - 1];
        return lastStake.amount;
    };
    const minStakeAmount = getMinStakeAmount();

    // Validation
    const isRestakeValid = restakeAmountNum <= totalPayoutNum && restakeAmountNum >= 0;
    const isAboveMinStake = newStakeTotal === 0 || newStakeTotalWei >= minStakeAmount;
    const isWithinLimits = newStakeTotal === 0 || (newStakeTotalWei >= minStake && newStakeTotalWei <= maxStake);
    const additionalWei = additionalAmountNum > 0 ? usdtToWei(additionalAmount) : BigInt(0);
    const hasBalance = additionalAmountNum === 0 || hasEnoughUsdt(additionalWei);

    // Handle Claim & Restake
    const handleClaimAndRestake = async () => {
        if (!hasEnoughGas()) {
            toast.error('Insufficient BNB for gas fees!');
            return;
        }

        if (!isRestakeValid) {
            toast.error('Invalid restake amount!');
            return;
        }

        if (newStakeTotal === 0) {
            toast.error('Please enter restake amount!');
            return;
        }

        if (newStakeTotalWei < minStakeAmount) {
            toast.error(`Minimum stake is $${formatUSDT(minStakeAmount)} (based on your last stake)!`);
            return;
        }

        if (newStakeTotalWei < minStake) {
            toast.error(`Minimum stake is $${formatUSDT(minStake)}!`);
            return;
        }

        if (newStakeTotalWei > maxStake) {
            toast.error(`Maximum stake is $${formatUSDT(maxStake)}!`);
            return;
        }

        if (!hasBalance) {
            toast.error('Insufficient USDT balance for additional amount!');
            return;
        }

        try {
            // Approve if needed for additional amount
            if (additionalWei > BigInt(0) && needsApproval(additionalWei)) {
                toast.loading('Approving USDT...', { id: 'restake' });
                const approved = await approveTokens(additionalWei);
                if (!approved) {
                    toast.error('Approval failed!', { id: 'restake' });
                    return;
                }
            }

            toast.loading('Processing claim & restake...', { id: 'restake' });

            const restakeWei = usdtToWei(restakeAmount || '0');
            const durationSeconds = durationOptions[selectedDuration - 1]?.daysRaw || BigInt(604800);

            // Debug log
            console.log('ClaimAndRestake params:', {
                userId,
                stakeIndex: stake.stakeIndex,
                restakeAmount: restakeAmount,
                restakeWei: restakeWei.toString(),
                additionalAmount: additionalAmount,
                additionalWei: additionalWei.toString(),
                duration: durationSeconds.toString()
            });

            await claimAndRestake(
                userId,
                BigInt(stake.stakeIndex),
                restakeWei,
                additionalWei,
                durationSeconds
            );

            toast.success('Claim & Restake successful! 🎉', { id: 'restake' });
            onSuccess();
        } catch (error: unknown) {
            console.error('Claim & Restake error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast.error(`Failed: ${errorMessage.slice(0, 100)}`, { id: 'restake' });
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4">
            <div className="card-gold p-6 border-4 border-gold-primary/40 max-w-sm w-full max-h-[85vh] overflow-y-auto animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-black text-gold-primary uppercase">🔄 Claim & Restake</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>

                {/* Payout Summary */}
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-4">
                    <div className="text-sm text-gray-400 mb-1">Total Payout Available</div>
                    <div className="text-3xl font-black text-green-400">${formatUSDT(totalPayout)}</div>
                    <div className="text-xs text-gray-500 mt-1">
                        Principal: ${formatUSDT(principal)} + Interest: ${formatUSDT(interestAmount)}
                    </div>
                </div>

                {/* Validation Warning */}
                {newStakeTotal > 0 && !isAboveMinStake && (
                    <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg mb-4 text-center">
                        <p className="text-red-400 text-xs">
                            ⚠️ Your last stake was ${formatUSDT(minStakeAmount)}. Minimum required is ${formatUSDT(minStakeAmount)}!
                        </p>
                    </div>
                )}
                {newStakeTotal > 0 && isAboveMinStake && !isWithinLimits && (
                    <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg mb-4 text-center">
                        <p className="text-red-400 text-xs">
                            ⚠️ Maximum stake allowed is ${formatUSDT(maxStake)}!
                        </p>
                    </div>
                )}

                {/* Restake & Additional Amount - Single Row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Restake Amount */}
                    <div>
                        <label className="block text-xs font-bold text-gold-primary mb-1">From Payout</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={restakeAmount}
                                onChange={(e) => setRestakeAmount(e.target.value)}
                                onBlur={() => {
                                    const val = Number(restakeAmount) || 0;
                                    if (val > totalPayoutNum) setRestakeAmount(totalPayoutNum.toString());
                                    if (val < 0) setRestakeAmount('0');
                                }}
                                placeholder="0"
                                className="w-full px-3 py-2 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white text-sm focus:border-gold-primary focus:outline-none"
                            />
                            <button
                                onClick={() => {
                                    // Fill full payout first
                                    setRestakeAmount(totalPayoutNum.toString());

                                    const maxStakeNum = Number(formatUSDT(maxStake).replace(/,/g, ''));
                                    const minStakeNum = Number(formatUSDT(minStakeAmount).replace(/,/g, ''));
                                    const totalWithAdditional = totalPayoutNum + additionalAmountNum;

                                    // Then show appropriate error
                                    if (totalWithAdditional < minStakeNum) {
                                        toast.error(`Your last stake was $${minStakeNum}. Minimum required is $${minStakeNum}!`);
                                    } else if (totalWithAdditional > maxStakeNum) {
                                        toast.error(`Maximum stake allowed is $${maxStakeNum}!`);
                                    }
                                }}
                                className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] font-bold bg-gold-primary/20 text-gold-primary rounded"
                            >
                                MAX
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">Max: ${Math.min(totalPayoutNum, Number(formatUSDT(maxStake).replace(/,/g, ''))).toFixed(0)}</p>
                    </div>

                    {/* Additional Amount */}
                    <div>
                        <label className="block text-xs font-bold text-gold-primary mb-1">From Wallet</label>
                        <input
                            type="number"
                            value={additionalAmount}
                            onChange={(e) => setAdditionalAmount(e.target.value)}
                            placeholder="0"
                            className="w-full px-3 py-2 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white text-sm focus:border-gold-primary focus:outline-none"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">Bal: {getUsdtBalanceDisplay()}</p>
                    </div>
                </div>

                {/* Duration Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gold-primary mb-2">New Stake Duration</label>
                    <div className="grid grid-cols-4 gap-2">
                        {durationOptions.map((duration) => (
                            <button
                                key={duration.id}
                                onClick={() => setSelectedDuration(duration.id)}
                                className={`p-2 rounded-lg border-2 transition-all text-center ${selectedDuration === duration.id
                                    ? 'border-gold-primary bg-gold-primary/20'
                                    : 'border-white/10 bg-black/40 hover:border-gold-primary/40'
                                    }`}
                            >
                                <div className={`text-sm font-bold ${selectedDuration === duration.id ? 'text-gold-primary' : 'text-gray-400'}`}>{duration.days}d</div>
                                <div className={`text-xs ${selectedDuration === duration.id ? 'text-green-400' : 'text-gray-500'}`}>{duration.interest}%</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="p-3 bg-black/50 rounded-lg border border-white/10 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">New Stake Amount:</span>
                        <span className="text-gold-primary font-bold">${newStakeTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">To Available Balance:</span>
                        <span className="text-green-400 font-bold">${toBalance.toFixed(2)}</span>
                    </div>
                    {newStakeTotal > 0 && selectedDurationInfo && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Expected Return:</span>
                            <span className="text-blue-400 font-bold">+${(newStakeTotal * selectedDurationInfo.interest / 100).toFixed(2)} ({selectedDurationInfo.interest}%)</span>
                        </div>
                    )}
                </div>

                {/* Gas Info */}
                <div className={`p-2 rounded-lg mb-4 text-center text-sm ${hasEnoughGas() ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    BNB for gas: {getNativeBalanceDisplay()}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        className="py-3 font-bold rounded-lg border-2 border-gray-600 text-gray-400 hover:border-gray-400 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleClaimAndRestake}
                        disabled={isPending || isApproving || newStakeTotal === 0}
                        className="py-3 font-black rounded-lg transition-all hover:scale-105 disabled:opacity-50 text-black"
                        style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                        }}
                    >
                        {isPending || isApproving ? 'Processing...' : 'Confirm Restake'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ActiveStakes({ stakes, userId, onCreateStake, onRefresh }: ActiveStakesProps) {
    const [claimStake, setClaimStake] = useState<StakeData | null>(null);
    const [restakeStake, setRestakeStake] = useState<StakeData | null>(null);

    // Separate active and matured stakes
    const activeStakes = stakes.filter(s => s.isActive && s.progress < 100);
    const maturedStakes = stakes.filter(s => s.isActive && s.progress >= 100);

    const handleSuccess = () => {
        setClaimStake(null);
        setRestakeStake(null);
        onRefresh();
        setTimeout(() => window.location.reload(), 2000);
    };

    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40">
            <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">Active Stakes</h2>

            {/* Matured Stakes - Ready to Claim */}
            {maturedStakes.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-green-400 mb-3 uppercase flex items-center gap-2">
                        <span className="animate-pulse">🎉</span> Ready to Claim
                    </h3>
                    <div className="space-y-3">
                        {maturedStakes.map((stake) => {
                            const interestAmount = (stake.amount * stake.interest) / BigInt(10000);
                            const totalPayout = stake.amount + interestAmount;

                            return (
                                <div key={stake.stakeIndex} className="p-4 bg-green-500/10 border-2 border-green-500/50 rounded-lg">
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <div className="text-xl font-black text-white">${formatUSDT(stake.amount)}</div>
                                            <div className="text-sm text-gray-400">{stake.plan} • {stake.interestRate}%</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">Total Payout</div>
                                            <div className="text-xl font-black text-green-400">${formatUSDT(totalPayout)}</div>
                                        </div>
                                    </div>
                                    {/* Two Separate Buttons */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setClaimStake(stake)}
                                            className="py-3 font-black uppercase rounded-lg transition-all hover:scale-105 text-black text-sm"
                                            style={{
                                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                            }}
                                        >
                                            💰 Just Claim
                                        </button>
                                        <button
                                            onClick={() => setRestakeStake(stake)}
                                            className="py-3 font-black uppercase rounded-lg transition-all hover:scale-105 text-black text-sm"
                                            style={{
                                                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                                            }}
                                        >
                                            🔄 Restake
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Active Stakes - Still Running */}
            <div className="space-y-4">
                {activeStakes.length === 0 && maturedStakes.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-3">📊</div>
                        <p>No active stakes yet</p>
                        <p className="text-sm">Create your first stake to start earning!</p>
                    </div>
                ) : activeStakes.length > 0 && (
                    <>
                        <h3 className="text-sm font-bold text-gold-primary uppercase">In Progress</h3>
                        {activeStakes.map((stake) => (
                            <div key={stake.stakeIndex} className="p-5 bg-black/50 border-2 border-gold-primary/30 rounded-lg hover:border-gold-primary transition-all">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                    <div>
                                        <div className="text-2xl font-black text-white mb-1">${formatUSDT(stake.amount)}</div>
                                        <div className="text-sm text-gray-400">{stake.plan} • {stake.interestRate}% Return</div>
                                    </div>
                                    {stake.endTime && <CountdownTimer endTime={stake.endTime} />}
                                </div>

                                {/* Progress Bar */}
                                <div className="relative">
                                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-gold-secondary to-gold-primary transition-all duration-500 relative"
                                            style={{ width: `${stake.progress}%` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="text-xs text-gold-primary font-bold">{stake.progress}% Complete</div>
                                        <div className="text-xs text-gray-400">{stake.daysLeft} days remaining</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* New Stake Button */}
            <button
                onClick={onCreateStake}
                className="w-full mt-6 py-4 font-black uppercase rounded-lg transition-all hover:scale-105"
                style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#000000',
                    boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)'
                }}
            >
                + Create New Stake
            </button>

            {/* Just Claim Modal - Portal to body */}
            {claimStake && userId && typeof document !== 'undefined' && createPortal(
                <JustClaimModal
                    stake={claimStake}
                    userId={userId}
                    onClose={() => setClaimStake(null)}
                    onSuccess={handleSuccess}
                />,
                document.body
            )}

            {/* Claim & Restake Modal - Portal to body */}
            {restakeStake && userId && typeof document !== 'undefined' && createPortal(
                <ClaimRestakeModal
                    stake={restakeStake}
                    userId={userId}
                    onClose={() => setRestakeStake(null)}
                    onSuccess={handleSuccess}
                />,
                document.body
            )}
        </div>
    );
}
