'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useActiveAccount } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

// Hooks
import { useUserValidation, useReferrerValidation } from '@/hooks/user/useUserValidation';
import { useUserBalances } from '@/hooks/user/useUserBalances';
import { useTokenApproval } from '@/hooks/user/useTokenApproval';
import { useUserTransactions } from '@/hooks/user/useUserTransactions';
import { useContractConfig } from '@/hooks/common/useContractData';
import { encodeUserId, formatUSDT, usdtToWei } from '@/hooks/common/formatters';

// Components
import WalletConnect from '@/app/walletConnect/WalletConnect';

const RegisterContent: React.FC = () => {
    const searchParams = useSearchParams();

    // Form state
    const [referrerId, setReferrerId] = useState('');
    const [selectedTier, setSelectedTier] = useState<1 | 2 | 3>(1);
    const [tier3Amount, setTier3Amount] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(1);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    // Wallet
    const activeAccount = useActiveAccount();
    const userAddress = activeAccount?.address;

    // Validation hooks
    const { isRegistered, isLoading: checkingRegistration, displayUserId, userId } = useUserValidation(userAddress);
    const { isValidReferrer, isValidFormat, isLoading: validatingReferrer, getErrorMessage } = useReferrerValidation(referrerId);

    // Balance hooks
    const { hasEnoughGas, hasEnoughUsdt, getNativeBalanceDisplay, getUsdtBalanceDisplay, isLoading: balancesLoading } = useUserBalances();

    // Token approval
    const { needsApproval, approveTokens, isApproving, getAllowanceDisplay } = useTokenApproval();

    // Transactions
    const { register, isPending } = useUserTransactions();

    // Contract config - Get tiers and durations from blockchain
    const { config, stakingTiers, durations, isLoading: configLoading } = useContractConfig();

    // Calculate stake amount based on selected tier
    const getStakeAmountWei = (): bigint => {
        if (!config) return BigInt(0);

        switch (selectedTier) {
            case 1:
                return config.stakingTier1;
            case 2:
                return config.stakingTier2;
            case 3:
                return tier3Amount ? usdtToWei(tier3Amount) : BigInt(0);
            default:
                return BigInt(0);
        }
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

    // Get duration info from contract
    const getDurationInfo = () => {
        if (!durations) return [];
        return durations.map((d, index) => ({
            id: index + 1,
            days: Number(d.days) / 86400, // Convert seconds to days
            interest: Number(d.interest) / 100, // Convert basis points to percentage
        }));
    };

    const durationOptions = getDurationInfo();
    const selectedDurationInfo = durationOptions.find(d => d.id === selectedDuration) || durationOptions[0];

    // Validate Tier 3 amount
    const validateTier3Amount = (): boolean => {
        if (selectedTier !== 3) return true;
        if (!tier3Amount || !config) return false;

        const amount = usdtToWei(tier3Amount);
        return amount >= config.stakingTier3Min && amount <= config.maxStaking;
    };

    // Extract referrer from URL
    useEffect(() => {
        const ref = searchParams.get('r') || searchParams.get('ref');
        if (ref) {
            setReferrerId(ref.toUpperCase());
        }
    }, [searchParams]);

    // Handle registration
    const handleRegister = async () => {
        // Validations
        if (!userAddress) {
            toast.error('Please connect your wallet first!');
            return;
        }

        if (!referrerId || !isValidReferrer) {
            toast.error('Please enter a valid referrer ID!');
            return;
        }

        if (selectedTier === 3 && !validateTier3Amount()) {
            toast.error(`Amount must be between $${tierAmounts.tier3Min} and $${tierAmounts.max}`);
            return;
        }

        if (!hasEnoughUsdt(stakeAmountWei)) {
            toast.error(`Insufficient USDT balance!`);
            return;
        }

        if (!hasEnoughGas()) {
            toast.error('Insufficient BNB for gas fees!');
            return;
        }

        try {
            // Step 1: Check and handle approval
            if (needsApproval(stakeAmountWei)) {
                toast.loading('Approving USDT...', { id: 'register' });
                const approved = await approveTokens(stakeAmountWei);

                if (!approved) {
                    toast.error('USDT approval failed!', { id: 'register' });
                    return;
                }
                toast.success('USDT approved!', { id: 'register' });
            }

            // Step 2: Register user
            toast.loading('Processing registration...', { id: 'register' });

            const encodedReferrer = encodeUserId(referrerId);
            // Get actual duration in seconds from config (durations array has .days which is actually seconds from contract)
            const durationSeconds = durations ? durations[selectedDuration - 1]?.days : BigInt(604800);
            await register(encodedReferrer, stakeAmountWei, durationSeconds);

            setRegistrationSuccess(true);
            toast.success('Registration successful! Welcome to Speed Asia! 🎉', { id: 'register' });

            // Reload page after short delay to refresh user state
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed. Please try again.', { id: 'register' });
        }
    };

    // Success screen
    if (registrationSuccess) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse"></div>

                <div className="w-full max-w-lg relative z-10 card-gold p-8 border-4 border-gold-primary/40 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-black mb-4" style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                    }}>
                        Welcome to Speed Asia!
                    </h1>
                    <p className="text-gray-300 mb-6">Your registration was successful!</p>

                    <div className="bg-black/50 rounded-xl p-6 mb-6 border border-gold-primary/30">
                        <h3 className="text-gold-primary font-bold mb-4">Registration Details</h3>
                        <div className="space-y-3 text-left text-sm">
                            <div className="flex justify-between py-2 border-b border-white/10">
                                <span className="text-gray-400">Wallet:</span>
                                <span className="text-white font-mono">{userAddress ? shortenAddress(userAddress) : 'Connected'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                                <span className="text-gray-400">Referrer:</span>
                                <span className="text-gold-primary font-bold">{referrerId}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-white/10">
                                <span className="text-gray-400">Staked Amount:</span>
                                <span className="text-green-400 font-bold">${formatUSDT(stakeAmountWei)} USDT</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Duration:</span>
                                <span className="text-white font-bold">{selectedDurationInfo?.days} Days ({selectedDurationInfo?.interest}% Return)</span>
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/dashboard"
                        className="inline-block w-full py-4 font-black text-base uppercase tracking-wider rounded-lg transition-all hover:scale-105"
                        style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            color: '#000000',
                            boxShadow: '0 4px 30px rgba(255, 215, 0, 0.5)'
                        }}
                    >
                        Go to Dashboard →
                    </Link>
                </div>
            </div>
        );
    }

    // Already registered screen
    if (isRegistered && !checkingRegistration) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse"></div>

                <div className="w-full max-w-lg relative z-10 card-gold p-8 border-4 border-gold-primary/40 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4">Already Registered!</h2>
                    <p className="text-gray-400 mb-2">Your User ID:</p>
                    <p className="text-2xl font-bold text-gold-primary mb-6">{displayUserId}</p>

                    <Link
                        href="/dashboard"
                        className="inline-block w-full py-4 font-black text-base uppercase tracking-wider rounded-lg transition-all hover:scale-105 mb-4"
                        style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            color: '#000000'
                        }}
                    >
                        Go to Dashboard
                    </Link>

                    <div className="pt-4 border-t border-white/10">
                        <p className="text-sm text-gray-400 mb-3">Want to register with a different wallet?</p>
                        <WalletConnect />
                    </div>
                </div>
            </div>
        );
    }

    // Main registration form
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-secondary/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

            <div className="w-full max-w-2xl relative z-10">
                {/* Header - Compact */}
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)'
                        }}>
                            <span className="text-black font-black text-lg">SA</span>
                        </div>
                        <h1 className="text-2xl font-black" style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}>
                            JOIN SPEED ASIA
                        </h1>
                    </Link>
                </div>

                {!userAddress ? (
                    // Connect Wallet
                    <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
                        <p className="text-gray-400 mb-8">Please connect your wallet to continue</p>
                        <WalletConnect />
                    </div>
                ) : checkingRegistration || balancesLoading || configLoading ? (
                    // Loading
                    <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                        <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-xl">Loading...</p>
                    </div>
                ) : (
                    // Registration Form
                    <div className="card-gold p-8 border-4 border-gold-primary/40">
                        {/* Connected Wallet - Top of Form */}
                        <div className="mb-6 flex justify-center">
                            <WalletConnect />
                        </div>

                        {/* Referrer ID - Readonly from URL */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                                Referrer ID <span className="text-xs text-gray-500 normal-case">(From referral link)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={referrerId || 'No referrer found in URL'}
                                    readOnly
                                    className={`w-full px-4 py-3 bg-black/50 border-2 rounded-lg uppercase cursor-not-allowed font-mono ${!referrerId
                                        ? 'border-red-500/50 text-red-400'
                                        : isValidReferrer
                                            ? 'border-green-500/50 text-white'
                                            : 'border-yellow-500/50 text-yellow-400'
                                        }`}
                                />
                                {referrerId && isValidReferrer && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                                {!referrerId && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {!referrerId ? (
                                <p className="text-red-400 text-sm mt-2 animate-pulse">
                                    ⚠️ Please use a valid invitation link to register. You cannot register without a referrer.
                                </p>
                            ) : validatingReferrer ? (
                                <p className="text-yellow-400 text-sm mt-2">⏳ Validating referrer...</p>
                            ) : isValidReferrer ? (
                                <p className="text-green-400 text-sm mt-2">✓ Referrer verified</p>
                            ) : (
                                <p className="text-red-400 text-sm mt-2">{getErrorMessage()}</p>
                            )}
                            <p className="text-gray-500 text-xs mt-1">🔒 Referrer is set from your invitation link and cannot be changed</p>
                        </div>

                        {/* Staking Tier Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                                Select Package
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {/* Tier 1 - Fixed */}
                                <button
                                    onClick={() => setSelectedTier(1)}
                                    className={`p-3 rounded-lg border-2 transition-all text-center ${selectedTier === 1
                                        ? 'border-gold-primary bg-gradient-to-br from-gold-primary/30 to-gold-secondary/20 scale-[1.02] shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                                        : 'border-white/10 bg-black/40 hover:border-gold-primary/40 hover:bg-black/60'
                                        }`}
                                >
                                    <div className={`text-xs font-bold ${selectedTier === 1 ? 'text-white' : 'text-gray-500'}`}>TIER 1</div>
                                    <div className={`text-xl font-black ${selectedTier === 1 ? 'text-gold-primary' : 'text-gray-300'}`}>${tierAmounts.tier1}</div>
                                </button>

                                {/* Tier 2 - Fixed */}
                                <button
                                    onClick={() => setSelectedTier(2)}
                                    className={`p-3 rounded-lg border-2 transition-all text-center ${selectedTier === 2
                                        ? 'border-gold-primary bg-gradient-to-br from-gold-primary/30 to-gold-secondary/20 scale-[1.02] shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                                        : 'border-white/10 bg-black/40 hover:border-gold-primary/40 hover:bg-black/60'
                                        }`}
                                >
                                    <div className={`text-xs font-bold ${selectedTier === 2 ? 'text-white' : 'text-gray-500'}`}>TIER 2</div>
                                    <div className={`text-xl font-black ${selectedTier === 2 ? 'text-gold-primary' : 'text-gray-300'}`}>${tierAmounts.tier2}</div>
                                </button>

                                {/* Tier 3 - Variable */}
                                <button
                                    onClick={() => setSelectedTier(3)}
                                    className={`p-3 rounded-lg border-2 transition-all text-center ${selectedTier === 3
                                        ? 'border-gold-primary bg-gradient-to-br from-gold-primary/30 to-gold-secondary/20 scale-[1.02] shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                                        : 'border-white/10 bg-black/40 hover:border-gold-primary/40 hover:bg-black/60'
                                        }`}
                                >
                                    <div className={`text-xs font-bold ${selectedTier === 3 ? 'text-white' : 'text-gray-500'}`}>TIER 3</div>
                                    <div className={`text-sm font-black ${selectedTier === 3 ? 'text-gold-primary' : 'text-gray-300'}`}>${tierAmounts.tier3Min}+</div>
                                </button>
                            </div>

                            {/* Tier 3 Custom Amount Selector */}
                            {selectedTier === 3 && config && (() => {
                                const minAmount = Number(formatUSDT(config.stakingTier3Min, 0).replace(/,/g, ''));
                                const maxAmount = Number(formatUSDT(config.maxStaking, 0).replace(/,/g, ''));
                                const currentAmount = Number(tier3Amount) || minAmount;

                                const handleIncrement = () => {
                                    const newAmount = Math.min(currentAmount + 1, maxAmount);
                                    setTier3Amount(newAmount.toString());
                                };

                                const handleDecrement = () => {
                                    const newAmount = Math.max(currentAmount - 1, minAmount);
                                    setTier3Amount(newAmount.toString());
                                };

                                return (
                                    <div className="mt-4 p-4 bg-black/30 rounded-xl border border-gold-primary/20">
                                        {/* +/- Controls with Amount Display */}
                                        <div className="flex items-center justify-center gap-4 mb-4">
                                            {/* Decrement Button */}
                                            <button
                                                type="button"
                                                onClick={handleDecrement}
                                                disabled={currentAmount <= minAmount}
                                                className="w-14 h-14 rounded-xl bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-primary font-bold text-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border-2 border-gold-primary/30 hover:border-gold-primary/50 flex items-center justify-center"
                                            >
                                                −
                                            </button>

                                            {/* Amount Display with Manual Input */}
                                            <div className="flex-1 text-center">
                                                <input
                                                    type="number"
                                                    value={tier3Amount || minAmount}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                                        const numVal = parseInt(val) || minAmount;
                                                        setTier3Amount(Math.min(maxAmount, Math.max(minAmount, numVal)).toString());
                                                    }}
                                                    className="w-32 h-16 text-3xl font-black text-center bg-black/50 border-2 border-gold-primary/40 focus:border-gold-primary rounded-xl text-gold-primary outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                                <p className="text-xs text-gray-400 mt-2">
                                                    USDT (Range: ${minAmount} - ${maxAmount})
                                                </p>
                                            </div>

                                            {/* Increment Button */}
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
                                                const isValid = amount >= minAmount && amount <= maxAmount;
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

                                        {tier3Amount && !validateTier3Amount() && (
                                            <p className="text-red-400 text-sm mt-3 text-center">
                                                ⚠️ Amount must be between ${tierAmounts.tier3Min} and ${tierAmounts.max}
                                            </p>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Duration Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                                Duration
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {durationOptions.map((duration) => (
                                    <button
                                        key={duration.id}
                                        onClick={() => setSelectedDuration(duration.id)}
                                        className={`p-2 rounded-lg border-2 transition-all text-center ${selectedDuration === duration.id
                                            ? 'border-gold-primary bg-gradient-to-br from-gold-primary/30 to-gold-secondary/20 scale-[1.02] shadow-[0_0_20px_rgba(255,215,0,0.5)]'
                                            : 'border-white/10 bg-black/40 hover:border-gold-primary/40 hover:bg-black/60'
                                            }`}
                                    >
                                        <div className={`text-sm font-bold ${selectedDuration === duration.id ? 'text-gold-primary' : 'text-gray-400'}`}>{duration.days}d</div>
                                        <div className={`text-xs font-bold ${selectedDuration === duration.id ? 'text-green-400' : 'text-gray-500'}`}>{duration.interest}%</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Summary - Compact */}
                        <div className="bg-gold-primary/10 rounded-lg p-3 mb-4 border border-gold-primary/30">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 text-sm">Staking:</span>
                                <span className="text-xl font-black text-gold-primary">
                                    ${formatUSDT(stakeAmountWei)} USDT
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-gray-300 text-sm">Assured Return:</span>
                                <span className="text-green-400 font-bold">
                                    +${(Number(formatUSDT(stakeAmountWei)) * (selectedDurationInfo?.interest || 0) / 100).toFixed(2)} USDT
                                    <span className="text-xs text-gray-400 ml-1">({selectedDurationInfo?.interest}% in {selectedDurationInfo?.days}d)</span>
                                </span>
                            </div>
                        </div>

                        {/* Balance Info - Single Row */}
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

                        {/* Register Button */}
                        <button
                            onClick={handleRegister}
                            disabled={isPending || isApproving || !referrerId || !isValidReferrer || (selectedTier === 3 && !validateTier3Amount())}
                            className="w-full py-3 font-black text-base uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                            style={{
                                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                color: '#000000',
                                boxShadow: '0 4px 30px rgba(255, 215, 0, 0.5)'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            <span className="relative z-10">
                                {isApproving ? 'Approving USDT...' : isPending ? 'Processing...' : 'REGISTER & STAKE'}
                            </span>
                        </button>

                        <p className="text-center text-gray-500 text-xs mt-3">
                            By registering, you agree to our terms and conditions
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Already registered?{' '}
                        <Link href="/dashboard" className="text-gold-primary hover:text-gold-secondary font-bold">
                            Go to Dashboard
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <Toaster position="top-center" />
            <RegisterContent />
        </Suspense>
    );
}
