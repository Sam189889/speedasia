'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

// Hooks
import { useUserDashboard } from '@/hooks/user/useUserDashboard';
import { useUserBalances } from '@/hooks/user/useUserBalances';
import { useTokenApproval } from '@/hooks/user/useTokenApproval';
import { useUserTransactions } from '@/hooks/user/useUserTransactions';
import { useContractConfig } from '@/hooks/common/useContractData';
import { formatUSDT, usdtToWei } from '@/hooks/common/formatters';

interface StakeTabProps {
    userId: `0x${string}` | undefined;
}

export default function StakeTab({ userId }: StakeTabProps) {
    // Form state - V2: Only custom amount ($20-$5000)
    const [tier3Amount, setTier3Amount] = useState('20'); // Default to $20 minimum

    // Get user's existing stakes to determine minimum
    const { dashboard, isLoading: dashboardLoading } = useUserDashboard(userId);

    // Balance hooks
    const { hasEnoughGas, hasEnoughUsdt, getNativeBalanceDisplay, getUsdtBalanceDisplay } = useUserBalances();

    // Token approval
    const { needsApproval, approveTokens, isApproving, getAllowanceDisplay } = useTokenApproval();

    // Transactions
    const { stake, isPending } = useUserTransactions();

    // Contract config
    const { config, durations, isLoading: configLoading } = useContractConfig();

    // Get user's last stake amount (minimum for new stake)
    const getMinStakeAmount = (): bigint => {
        if (!dashboard?.stakes || dashboard.stakes.length === 0) {
            return config?.stakingTier1 || BigInt(0); // Default to tier 1 if no stakes
        }
        // Get the last stake amount
        const lastStake = dashboard.stakes[dashboard.stakes.length - 1];
        return lastStake.amount;
    };

    const minStakeAmount = getMinStakeAmount();

    // V2: Calculate stake amount from custom input ($20-$5000)
    const getStakeAmountWei = (): bigint => {
        return tier3Amount ? usdtToWei(tier3Amount) : BigInt(0);
    };

    const stakeAmountWei = getStakeAmountWei();

    // Get formatted tier amounts
    const getTierAmounts = () => {
        if (!config) return { tier1: '0', tier2: '0', tier3Min: '0', max: '0' };
        return {
            tier1: formatUSDT(config.stakingTier1, 0),
            tier2: formatUSDT(config.stakingTier2, 0),
            tier3Min: formatUSDT(config.stakingTier3Min, 0),
            max: formatUSDT(config.maxStaking, 0),
        };
    };

    const tierAmounts = getTierAmounts();

    // Check if tier is allowed based on minimum stake
    const isTierAllowed = (tierAmount: bigint): boolean => {
        return tierAmount >= minStakeAmount;
    };

    // V2: No duration selection needed (daily 1% ROI system)
    const dailyRoiPercent = 1; // 1% daily ROI for V2 stakes

    // V2: Validate stake amount ($20-$5000 AND >= last stake)
    const validateStakeAmount = (): boolean => {
        if (!config || !tier3Amount) return false;
        const amount = usdtToWei(tier3Amount);
        
        // Must be within $20-$5000 range
        if (amount < config.stakingTier3Min || amount > config.maxStaking) return false;
        
        // Must be >= last stake (progressive staking)
        if (amount < minStakeAmount) return false;
        
        return true;
    };

    // Get effective minimum for tier 3
    const getEffectiveTier3Min = (): bigint => {
        if (!config) return BigInt(0);
        // Use whichever is higher: tier3Min or user's last stake
        return minStakeAmount > config.stakingTier3Min ? minStakeAmount : config.stakingTier3Min;
    };

    // Handle stake
    const handleStake = async () => {
        if (!userId) {
            toast.error('User not found!');
            return;
        }

        if (!validateStakeAmount()) {
            toast.error(`Minimum stake amount is $${formatUSDT(minStakeAmount, 0)}`);
            return;
        }

        if (!hasEnoughUsdt(stakeAmountWei)) {
            toast.error('Insufficient USDT balance!');
            return;
        }

        if (!hasEnoughGas()) {
            toast.error('Insufficient BNB for gas fees!');
            return;
        }

        try {
            // Step 1: Check and handle approval
            if (needsApproval(stakeAmountWei)) {
                toast.loading('Approving USDT...', { id: 'stake' });
                const approved = await approveTokens(stakeAmountWei);

                if (!approved) {
                    toast.error('USDT approval failed!', { id: 'stake' });
                    return;
                }
                toast.success('USDT approved!', { id: 'stake' });
            }

            // Step 2: Create V2 stake (duration = 0)
            toast.loading('Creating stake...', { id: 'stake' });

            // V2: duration = 0 for daily ROI system
            await stake(userId, stakeAmountWei, BigInt(0));

            toast.success('Stake created successfully! 🎉', { id: 'stake' });

            // Reload page after short delay
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Stake error:', error);
            toast.error('Stake failed. Please try again.', { id: 'stake' });
        }
    };

    // Loading state
    if (dashboardLoading || configLoading) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                    <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-xl">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="card-gold p-8 border-4 border-gold-primary/40">
                <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase text-center">Create New Stake</h2>

                {/* Minimum Stake Notice */}
                {dashboard?.stakes && dashboard.stakes.length > 0 && (
                    <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <p className="text-yellow-400 text-sm text-center">
                            ⚠️ Minimum stake: <span className="font-bold">${formatUSDT(minStakeAmount, 0)} USDT</span> (based on your last stake)
                        </p>
                    </div>
                )}

                {/* V2 Staking Amount Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                        Stake Amount (Min: ${formatUSDT(minStakeAmount, 0)} - Max: $5,000 USDT)
                    </label>

                    {/* Custom Amount Selector */}
                    {config && (() => {
                        const effectiveMin = Number(formatUSDT(getEffectiveTier3Min(), 0).replace(/,/g, ''));
                        const maxAmount = Number(formatUSDT(config.maxStaking, 0).replace(/,/g, ''));
                        const currentAmount = Number(tier3Amount) || effectiveMin;

                        const handleIncrement = () => {
                            const newAmount = Math.min(currentAmount + 1, maxAmount);
                            setTier3Amount(newAmount.toString());
                        };

                        const handleDecrement = () => {
                            const newAmount = Math.max(currentAmount - 1, effectiveMin);
                            setTier3Amount(newAmount.toString());
                        };

                        // Validate on blur - clamp value to valid range
                        const handleBlur = () => {
                            if (!tier3Amount) {
                                setTier3Amount(effectiveMin.toString());
                                return;
                            }
                            const numVal = parseInt(tier3Amount) || effectiveMin;
                            const clampedVal = Math.min(maxAmount, Math.max(effectiveMin, numVal));
                            setTier3Amount(clampedVal.toString());
                        };

                        return (
                            <div className="mt-4 p-4 bg-black/30 rounded-xl border border-gold-primary/20">
                                <div className="flex items-center justify-center gap-4 mb-4">
                                    <button
                                        type="button"
                                        onClick={handleDecrement}
                                        disabled={currentAmount <= effectiveMin}
                                        className="w-14 h-14 rounded-xl bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-primary font-bold text-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border-2 border-gold-primary/30 hover:border-gold-primary/50 flex items-center justify-center"
                                    >
                                        −
                                    </button>

                                    <div className="flex-1 text-center">
                                        <input
                                            type="number"
                                            value={tier3Amount || effectiveMin}
                                            onChange={(e) => {
                                                // Allow free typing
                                                setTier3Amount(e.target.value);
                                            }}
                                            onBlur={handleBlur}
                                            className="w-32 h-16 text-3xl font-black text-center bg-black/50 border-2 border-gold-primary/40 focus:border-gold-primary rounded-xl text-gold-primary outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <p className="text-xs text-gray-400 mt-2">
                                            USDT (Min: ${effectiveMin} - Max: ${maxAmount})
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleIncrement}
                                        disabled={currentAmount >= maxAmount}
                                        className="w-14 h-14 rounded-xl bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-primary font-bold text-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border-2 border-gold-primary/30 hover:border-gold-primary/50 flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Quick Amount Buttons */}
                                <div className="grid grid-cols-4 gap-2">
                                    {[100, 250, 500, 1000].map((amount) => {
                                        const isValid = amount >= effectiveMin && amount <= maxAmount;
                                        return (
                                            <button
                                                key={amount}
                                                type="button"
                                                onClick={() => isValid && setTier3Amount(amount.toString())}
                                                disabled={!isValid}
                                                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all ${tier3Amount === amount.toString()
                                                    ? 'bg-gold-primary text-black border-gold-primary'
                                                    : isValid
                                                        ? 'bg-black/30 border-gold-primary/30 text-white hover:bg-gold-primary/10'
                                                        : 'bg-black/10 border-gray-700 text-gray-600 cursor-not-allowed'
                                                    }`}
                                            >
                                                ${amount}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* V2 Staking Info */}
                <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-blue-400 text-sm font-bold mb-2">💡 V2 Staking System</div>
                    <ul className="text-xs text-gray-400 space-y-1">
                        <li>• Daily {dailyRoiPercent}% ROI - claim anytime</li>
                        <li>• No lock period - withdraw capital anytime</li>
                        <li>• Compound to maximize earnings</li>
                    </ul>
                </div>

                {/* Selected Summary - V2 */}
                <div className="bg-gold-primary/10 rounded-lg p-3 mb-4 border border-gold-primary/30">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Staking:</span>
                        <span className="text-xl font-black text-gold-primary">
                            ${formatUSDT(stakeAmountWei)} USDT
                        </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-300 text-sm">Daily ROI:</span>
                        <span className="text-green-400 font-bold">
                            +${(Number(formatUSDT(stakeAmountWei).replace(/,/g, '')) * dailyRoiPercent / 100).toFixed(2)} USDT/day
                            <span className="text-xs text-gray-400 ml-1">({dailyRoiPercent}% daily)</span>
                        </span>
                    </div>
                </div>

                {/* Balance Info */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className={`text-center p-2 rounded-lg ${hasEnoughUsdt(stakeAmountWei) ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        <div className="text-xs text-gray-400">USDT</div>
                        <div className={`text-sm font-bold ${hasEnoughUsdt(stakeAmountWei) ? 'text-green-400' : 'text-red-400'}`}>
                            {getUsdtBalanceDisplay()}
                        </div>
                    </div>
                    <div className={`text-center p-2 rounded-lg ${hasEnoughGas() ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        <div className="text-xs text-gray-400">BNB</div>
                        <div className={`text-sm font-bold ${hasEnoughGas() ? 'text-green-400' : 'text-red-400'}`}>
                            {getNativeBalanceDisplay()}
                        </div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                        <div className="text-xs text-gray-400">Allowance</div>
                        <div className="text-sm font-bold text-white">{getAllowanceDisplay()}</div>
                    </div>
                </div>

                {/* Stake Button */}
                <button
                    onClick={handleStake}
                    disabled={isPending || isApproving || !validateStakeAmount()}
                    className="w-full py-3 font-black text-base uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        color: '#000000',
                        boxShadow: '0 4px 30px rgba(255, 215, 0, 0.5)'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10">
                        {isApproving ? 'Approving USDT...' : isPending ? 'Processing...' : 'CONFIRM STAKE'}
                    </span>
                </button>
            </div>
        </div>
    );
}
