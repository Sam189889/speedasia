'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { useReadContract } from 'wagmi';
import { useUserTransactions } from '@/hooks/user/useUserTransactions';
import { useUserBalances } from '@/hooks/user/useUserBalances';
import { useTokenApproval } from '@/hooks/user/useTokenApproval';
import { formatUSDT } from '@/hooks/common/formatters';
import { env } from '@/config/env';
import { SpeedAsiaABI } from '@/constants/abis';

interface V2StakeData {
    stakeIndex: number;
    amount: bigint;
    isActive: boolean;
    isMigrated: boolean;
    duration: bigint;
    lastRoiClaimTime: bigint;
    totalRoiEarned: bigint;
    boostedRoiPercent: bigint;
}

interface ActiveStakesV2Props {
    stakes: V2StakeData[];
    userId: `0x${string}` | undefined;
    onCreateStake: () => void;
    onRefresh: () => void;
}

// Helper: Calculate pending ROI days (simplified - using current time)
function calculatePendingDays(lastClaimTime: bigint): number {
    const now = Math.floor(Date.now() / 1000);
    const lastClaim = Number(lastClaimTime);
    const daysPassed = Math.floor((now - lastClaim) / 86400);
    return Math.max(0, daysPassed);
}

// Helper: Calculate pending ROI amount
function calculatePendingRoi(stake: V2StakeData): bigint {
    const daysPassed = BigInt(calculatePendingDays(stake.lastRoiClaimTime));
    if (daysPassed === BigInt(0)) return BigInt(0);
    
    const roiPercent = stake.boostedRoiPercent > BigInt(0) ? stake.boostedRoiPercent : BigInt(100); // 100 = 1%, 150 = 1.5%
    return (stake.amount * roiPercent * daysPassed) / BigInt(10000);
}

// Helper: Format time ago
function formatTimeAgo(timestamp: bigint): string {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - Number(timestamp);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}

// Helper: Format countdown time
function formatCountdown(seconds: number): string {
    if (seconds <= 0) return 'Expired';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

// Claim Daily ROI Modal
function ClaimRoiModal({
    stake,
    userId,
    onClose,
    onSuccess
}: {
    stake: V2StakeData;
    userId: `0x${string}`;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const { claimDailyRoi, isPending } = useUserTransactions();
    const { hasEnoughGas, getNativeBalanceDisplay } = useUserBalances();

    const pendingRoi = calculatePendingRoi(stake);
    const daysPending = calculatePendingDays(stake.lastRoiClaimTime);

    const handleClaim = async () => {
        if (!hasEnoughGas()) {
            toast.error('Insufficient BNB for gas fees!');
            return;
        }

        if (pendingRoi === BigInt(0)) {
            toast.error('No ROI available to claim!');
            return;
        }

        try {
            toast.loading('Claiming daily ROI...', { id: 'claimRoi' });
            await claimDailyRoi(userId, BigInt(stake.stakeIndex));
            toast.success('ROI claimed successfully! 🎉', { id: 'claimRoi' });
            onSuccess();
        } catch (error) {
            console.error('Claim ROI error:', error);
            toast.error('Claim failed. Please try again.', { id: 'claimRoi' });
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4">
            <div className="card-gold p-6 border-4 border-green-500/40 max-w-sm w-full animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-black text-green-400 uppercase">💰 Claim Daily ROI</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>

                {/* ROI Summary */}
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-4 text-center">
                    <div className="text-sm text-gray-400 mb-1">Available ROI ({daysPending} days)</div>
                    <div className="text-4xl font-black text-green-400">${formatUSDT(pendingRoi)}</div>
                    <div className="text-xs text-gray-500 mt-2">
                        Principal: ${formatUSDT(stake.amount)} × {stake.boostedRoiPercent > BigInt(0) ? '1.5%' : '1%'} × {daysPending} days
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
                        disabled={isPending || pendingRoi === BigInt(0)}
                        className="py-3 font-black rounded-lg transition-all hover:scale-105 disabled:opacity-50 text-black"
                        style={{
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                        }}
                    >
                        {isPending ? 'Processing...' : 'Claim ROI'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Unstake Modal
function UnstakeModal({
    stake,
    userId,
    onClose,
    onSuccess
}: {
    stake: V2StakeData;
    userId: `0x${string}`;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const { withdrawCapital, isPending } = useUserTransactions();
    const { hasEnoughGas, getNativeBalanceDisplay } = useUserBalances();

    const pendingRoi = calculatePendingRoi(stake);
    const totalReturn = stake.amount + pendingRoi;

    const handleUnstake = async () => {
        if (!hasEnoughGas()) {
            toast.error('Insufficient BNB for gas fees!');
            return;
        }

        if (!confirm('⚠️ This will close your stake permanently. Continue?')) {
            return;
        }

        try {
            toast.loading('Unstaking...', { id: 'unstake' });
            await withdrawCapital(userId, BigInt(stake.stakeIndex));
            toast.success('Stake unstaked successfully! 🎉', { id: 'unstake' });
            onSuccess();
        } catch (error) {
            console.error('Unstake error:', error);
            toast.error('Unstake failed. Please try again.', { id: 'unstake' });
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4">
            <div className="card-gold p-6 border-4 border-red-500/40 max-w-sm w-full animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-black text-red-400 uppercase">🔓 Unstake</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>

                {/* Warning */}
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                    <div className="text-red-400 text-sm font-bold mb-2">⚠️ Important:</div>
                    <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Your stake will be closed permanently</li>
                        <li>• All pending ROI will be claimed first</li>
                        <li>• Funds will be added to Available Balance</li>
                    </ul>
                </div>

                {/* Payout Summary */}
                <div className="p-4 bg-gold-primary/10 border border-gold-primary/30 rounded-lg mb-4 text-center">
                    <div className="text-sm text-gray-400 mb-1">Total to Available Balance</div>
                    <div className="text-4xl font-black text-gold-primary">${formatUSDT(totalReturn)}</div>
                    <div className="text-xs text-gray-500 mt-2">
                        Capital: ${formatUSDT(stake.amount)} + Pending ROI: ${formatUSDT(pendingRoi)}
                    </div>
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
                        onClick={handleUnstake}
                        disabled={isPending}
                        className="py-3 font-black rounded-lg transition-all hover:scale-105 disabled:opacity-50 text-black"
                        style={{
                            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                        }}
                    >
                        {isPending ? 'Processing...' : 'Unstake'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Compound Modal
function CompoundModal({
    stake,
    userId,
    onClose,
    onSuccess
}: {
    stake: V2StakeData;
    userId: `0x${string}`;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [additionalAmount, setAdditionalAmount] = useState('');
    const { claimAndCompound, isPending } = useUserTransactions();
    const { hasEnoughGas, hasEnoughUsdt, getUsdtBalanceDisplay, getNativeBalanceDisplay } = useUserBalances();
    const { needsApproval, approveTokens, isApproving } = useTokenApproval();

    const pendingRoi = calculatePendingRoi(stake);
    const capital = stake.amount;
    const additionalBigInt = additionalAmount ? BigInt(Math.floor(Number(additionalAmount) * 1e18)) : BigInt(0);
    const newStakeAmount = capital + pendingRoi + additionalBigInt;

    const handleCompound = async () => {
        if (!hasEnoughGas()) {
            toast.error('Insufficient BNB for gas fees!');
            return;
        }

        if (additionalBigInt > BigInt(0) && !hasEnoughUsdt(additionalBigInt)) {
            toast.error('Insufficient USDT balance!');
            return;
        }

        try {
            // Approve if needed
            if (additionalBigInt > BigInt(0) && needsApproval(additionalBigInt)) {
                toast.loading('Approving USDT...', { id: 'compound' });
                const approved = await approveTokens(additionalBigInt);
                if (!approved) {
                    toast.error('Approval failed!', { id: 'compound' });
                    return;
                }
            }

            toast.loading('Compounding stake...', { id: 'compound' });
            await claimAndCompound(userId, BigInt(stake.stakeIndex), additionalBigInt);
            toast.success('Stake compounded successfully! 🎉', { id: 'compound' });
            onSuccess();
        } catch (error) {
            console.error('Compound error:', error);
            toast.error('Compound failed. Please try again.', { id: 'compound' });
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4">
            <div className="card-gold p-6 border-4 border-gold-primary/40 max-w-sm w-full animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-black text-gold-primary uppercase">🔄 Compound Stake</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>

                {/* Info */}
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-4">
                    <div className="text-blue-400 text-sm font-bold mb-2">💡 Compound Info:</div>
                    <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Closes current stake</li>
                        <li>• Creates NEW stake with Capital + ROI</li>
                        <li>• Fresh ROI tracking starts</li>
                    </ul>
                </div>

                {/* Breakdown */}
                <div className="p-4 bg-black/50 rounded-lg border border-white/10 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Capital:</span>
                        <span className="text-white font-bold">${formatUSDT(capital)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Pending ROI:</span>
                        <span className="text-green-400 font-bold">${formatUSDT(pendingRoi)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 mt-2">
                        <div className="flex justify-between">
                            <span className="text-gold-primary font-bold">New Stake:</span>
                            <span className="text-gold-primary font-black text-lg">${formatUSDT(newStakeAmount)}</span>
                        </div>
                    </div>
                </div>

                {/* Additional Amount (Optional) */}
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gold-primary mb-2">Add More (Optional)</label>
                    <input
                        type="number"
                        value={additionalAmount}
                        onChange={(e) => setAdditionalAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-4 py-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white focus:border-gold-primary focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Balance: {getUsdtBalanceDisplay()}</p>
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
                        onClick={handleCompound}
                        disabled={isPending || isApproving}
                        className="py-3 font-black rounded-lg transition-all hover:scale-105 disabled:opacity-50 text-black"
                        style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                        }}
                    >
                        {isPending || isApproving ? 'Processing...' : 'Compound'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ActiveStakesV2({ stakes, userId, onCreateStake, onRefresh }: ActiveStakesV2Props) {
    const [claimStake, setClaimStake] = useState<V2StakeData | null>(null);
    const [unstakeStake, setUnstakeStake] = useState<V2StakeData | null>(null);
    const [compoundStake, setCompoundStake] = useState<V2StakeData | null>(null);
    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

    // Fetch booster tracker data
    const { data: boosterData } = useReadContract({
        address: env.contracts.speed,
        abi: SpeedAsiaABI,
        functionName: 'getBoosterTracker',
        args: userId ? [userId] : undefined,
        query: {
            enabled: !!userId,
            refetchInterval: 10000, // Refresh every 10 seconds for countdown
        }
    });

    // Update current time every second for countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(Math.floor(Date.now() / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Filter ACTIVE V2 stakes only (must be active AND (isMigrated OR duration === 0))
    const v2Stakes = stakes.filter(s => 
        s.isActive && (s.isMigrated || s.duration === BigInt(0))
    );

    const handleSuccess = () => {
        setClaimStake(null);
        setUnstakeStake(null);
        setCompoundStake(null);
        onRefresh();
        setTimeout(() => window.location.reload(), 2000);
    };

    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40">
            <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">Active Stakes (V2)</h2>

            {/* V2 Stakes */}
            <div className="space-y-4">
                {v2Stakes.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-3">📊</div>
                        <p>No active stakes yet</p>
                        <p className="text-sm">Create your first stake to start earning!</p>
                    </div>
                ) : (
                    v2Stakes.map((stake) => {
                        const pendingRoi = calculatePendingRoi(stake);
                        const daysPending = calculatePendingDays(stake.lastRoiClaimTime);
                        const isBoosted = stake.boostedRoiPercent > BigInt(0);
                        const dailyRate = isBoosted ? '1.5%' : '1%';

                        return (
                            <div key={stake.stakeIndex} className="p-5 bg-black/50 border-2 border-gold-primary/30 rounded-lg hover:border-gold-primary transition-all">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-2xl font-black text-white mb-1">${formatUSDT(stake.amount)}</div>
                                        <div className="flex gap-2 items-center flex-wrap">
                                            <span className="px-2 py-0.5 bg-gold-primary/20 text-gold-primary text-xs font-bold rounded">
                                                {dailyRate} Daily ROI
                                            </span>
                                            {isBoosted && (
                                                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold rounded animate-pulse">
                                                    🚀 BOOSTED
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400">Stake #{stake.stakeIndex}</div>
                                    </div>
                                </div>

                                {/* Booster Progress (only for current stake that can get booster) */}
                                {boosterData && boosterData[5] && Number(boosterData[4]) === stake.stakeIndex && !isBoosted && (
                                    <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-purple-400">🎯 Booster Progress</span>
                                            <span className="text-xs font-black text-pink-400">
                                                {formatCountdown(Number(boosterData[6]))}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="flex-1 bg-black/50 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                                                    style={{ width: `${(Number(boosterData[2]) / 2) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-white">{Number(boosterData[2])}/2</span>
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            Bring 2 referrals (${formatUSDT(boosterData[3])}+) to boost ROI to 1.5%!
                                        </p>
                                    </div>
                                )}
                                {boosterData && !boosterData[5] && Number(boosterData[4]) === stake.stakeIndex && !isBoosted && (
                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                        <p className="text-xs text-red-400 font-bold">⏰ Booster window expired</p>
                                    </div>
                                )}

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="p-3 bg-black/60 rounded-lg border border-white/10">
                                        <div className="text-xs text-gray-400 mb-1">Total ROI Earned</div>
                                        <div className="text-lg font-black text-green-400">${formatUSDT(stake.totalRoiEarned)}</div>
                                    </div>
                                    <div className="p-3 bg-black/60 rounded-lg border border-white/10">
                                        <div className="text-xs text-gray-400 mb-1">Pending ROI</div>
                                        <div className="text-lg font-black text-blue-400">${formatUSDT(pendingRoi)}</div>
                                        <div className="text-xs text-gray-500">{daysPending} days</div>
                                    </div>
                                </div>

                                {/* Last Claim */}
                                <div className="text-xs text-gray-500 mb-4">
                                    Last claim: {formatTimeAgo(stake.lastRoiClaimTime)}
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setClaimStake(stake)}
                                        disabled={pendingRoi === BigInt(0)}
                                        className="py-3 font-black uppercase rounded-lg transition-all hover:scale-105 disabled:opacity-50 text-black text-xs"
                                        style={{
                                            background: pendingRoi > BigInt(0) 
                                                ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                                                : 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
                                        }}
                                    >
                                        💰 Claim
                                    </button>
                                    <button
                                        onClick={() => setCompoundStake(stake)}
                                        className="py-3 font-black uppercase rounded-lg transition-all hover:scale-105 text-black text-xs"
                                        style={{
                                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                                        }}
                                    >
                                        🔄 Compound
                                    </button>
                                    <button
                                        onClick={() => setUnstakeStake(stake)}
                                        className="py-3 font-black uppercase rounded-lg transition-all hover:scale-105 text-black text-xs"
                                        style={{
                                            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                                        }}
                                    >
                                        🔓 Unstake
                                    </button>
                                </div>
                            </div>
                        );
                    })
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

            {/* Claim ROI Modal */}
            {claimStake && userId && typeof document !== 'undefined' && createPortal(
                <ClaimRoiModal
                    stake={claimStake}
                    userId={userId}
                    onClose={() => setClaimStake(null)}
                    onSuccess={handleSuccess}
                />,
                document.body
            )}

            {/* Unstake Modal */}
            {unstakeStake && userId && typeof document !== 'undefined' && createPortal(
                <UnstakeModal
                    stake={unstakeStake}
                    userId={userId}
                    onClose={() => setUnstakeStake(null)}
                    onSuccess={handleSuccess}
                />,
                document.body
            )}

            {/* Compound Modal */}
            {compoundStake && userId && typeof document !== 'undefined' && createPortal(
                <CompoundModal
                    stake={compoundStake}
                    userId={userId}
                    onClose={() => setCompoundStake(null)}
                    onSuccess={handleSuccess}
                />,
                document.body
            )}
        </div>
    );
}
