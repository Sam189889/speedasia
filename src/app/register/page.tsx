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
import { useUserDashboard } from '@/hooks/user/useUserDashboard';
import { useContractConfig } from '@/hooks/common/useContractData';
import { encodeUserId, decodeUserId, formatUSDT, usdtToWei } from '@/hooks/common/formatters';

// Components
import WalletConnect from '@/app/walletConnect/WalletConnect';

// Staking duration options
const DURATIONS = [
    { id: 1, days: 7, interest: 3, label: '7 Days' },
    { id: 2, days: 14, interest: 7, label: '14 Days' },
    { id: 3, days: 21, interest: 16, label: '21 Days' },
    { id: 4, days: 30, interest: 25, label: '30 Days' },
];

const RegisterContent: React.FC = () => {
    const searchParams = useSearchParams();

    // Form state
    const [referrerId, setReferrerId] = useState('');
    const [stakeAmount, setStakeAmount] = useState('');
    const [selectedDuration, setSelectedDuration] = useState(1);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    // Wallet
    const activeAccount = useActiveAccount();
    const userAddress = activeAccount?.address;

    // Validation hooks
    const { isRegistered, isLoading: checkingRegistration, displayUserId } = useUserValidation(userAddress);
    const { isValidReferrer, isValidFormat, isLoading: validatingReferrer, encodedUserId, getErrorMessage } = useReferrerValidation(referrerId);

    // Balance hooks
    const { hasEnoughGas, hasEnoughUsdt, getNativeBalanceDisplay, getUsdtBalanceDisplay, isLoading: balancesLoading } = useUserBalances();

    // Token approval
    const { needsApproval, approveTokens, isApproving, getAllowanceDisplay } = useTokenApproval();

    // Transactions
    const { register, isPending } = useUserTransactions();

    // Contract config
    const { config, durations, isLoading: configLoading } = useContractConfig();

    // Dashboard for after registration
    const { dashboard, isLoading: loadingDashboard } = useUserDashboard(displayUserId ? encodeUserId(displayUserId) : undefined);

    // Calculate stake amount in wei
    const stakeAmountWei = stakeAmount ? usdtToWei(stakeAmount) : BigInt(0);

    // Get selected duration interest
    const selectedDurationInfo = DURATIONS.find(d => d.id === selectedDuration) || DURATIONS[0];

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

        if (!stakeAmount || parseFloat(stakeAmount) < 5) {
            toast.error('Minimum staking amount is $5!');
            return;
        }

        if (parseFloat(stakeAmount) > 5000) {
            toast.error('Maximum staking amount is $5000!');
            return;
        }

        if (!hasEnoughUsdt(stakeAmountWei)) {
            toast.error(`Insufficient USDT balance! You need ${stakeAmount} USDT.`);
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
            await register(encodedReferrer, stakeAmountWei, BigInt(selectedDuration));

            setRegistrationSuccess(true);
            toast.success('Registration successful! Welcome to Speed Asia! 🎉', { id: 'register' });
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
                                <span className="text-green-400 font-bold">${stakeAmount} USDT</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-400">Duration:</span>
                                <span className="text-white font-bold">{selectedDurationInfo.days} Days ({selectedDurationInfo.interest}% Return)</span>
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
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)'
                        }}>
                            <span className="text-black font-black text-3xl">SA</span>
                        </div>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black mb-3" style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                    }}>
                        JOIN SPEED ASIA
                    </h1>
                    <p className="text-gray-400 text-lg">Start your staking journey today</p>
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
                ) : checkingRegistration || balancesLoading ? (
                    // Loading
                    <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                        <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-xl">Loading...</p>
                    </div>
                ) : (
                    // Registration Form
                    <div className="card-gold p-8 border-4 border-gold-primary/40">
                        {/* Referrer ID Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                                Referrer ID
                            </label>
                            <input
                                type="text"
                                value={referrerId}
                                onChange={(e) => setReferrerId(e.target.value.toUpperCase())}
                                maxLength={5}
                                className={`w-full px-4 py-3 bg-black/50 border-2 rounded-lg text-white uppercase placeholder-gray-500 focus:outline-none transition-all ${validatingReferrer
                                        ? 'border-yellow-500/50'
                                        : isValidReferrer
                                            ? 'border-green-500/50'
                                            : referrerId && isValidFormat
                                                ? 'border-red-500/50'
                                                : 'border-gold-primary/30 focus:border-gold-primary'
                                    }`}
                                placeholder="e.g., 3ABCD"
                            />
                            <p className={`text-sm mt-2 ${isValidReferrer ? 'text-green-400' : referrerId && !validatingReferrer ? 'text-red-400' : 'text-gray-500'
                                }`}>
                                {validatingReferrer
                                    ? '⏳ Validating referrer...'
                                    : isValidReferrer
                                        ? '✓ Referrer verified'
                                        : getErrorMessage() || 'Enter your referrer ID (1-5 characters)'}
                            </p>
                        </div>

                        {/* Stake Amount Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                                Staking Amount (USDT)
                            </label>
                            <input
                                type="number"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                min="5"
                                max="5000"
                                className="w-full px-4 py-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-primary focus:outline-none transition-all"
                                placeholder="Min $5 - Max $5000"
                            />
                            <div className="flex gap-2 mt-2">
                                {[50, 100, 500, 1000].map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setStakeAmount(amount.toString())}
                                        className="flex-1 py-2 text-sm bg-black/30 border border-gold-primary/30 rounded-lg text-gold-primary hover:bg-gold-primary/10 transition-all"
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duration Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gold-primary mb-3 uppercase tracking-wider">
                                Staking Duration
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {DURATIONS.map((duration) => (
                                    <button
                                        key={duration.id}
                                        onClick={() => setSelectedDuration(duration.id)}
                                        className={`p-4 rounded-lg border-2 transition-all ${selectedDuration === duration.id
                                                ? 'border-gold-primary bg-gold-primary/10'
                                                : 'border-gold-primary/30 bg-black/30 hover:border-gold-primary/50'
                                            }`}
                                    >
                                        <div className="text-lg font-bold text-white">{duration.days} Days</div>
                                        <div className="text-green-400 text-sm font-bold">{duration.interest}% Profit</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Balance Info */}
                        <div className="bg-black/50 rounded-xl p-4 mb-6 space-y-3 border border-gold-primary/20">
                            <div className="text-sm font-bold text-gold-primary mb-2">Balance Check</div>

                            <div className={`flex justify-between items-center text-sm p-2 rounded-lg ${hasEnoughUsdt(stakeAmountWei) ? 'bg-green-500/10' : 'bg-red-500/10'
                                }`}>
                                <span className="text-gray-300">USDT Balance:</span>
                                <span className={hasEnoughUsdt(stakeAmountWei) ? 'text-green-400' : 'text-red-400'}>
                                    {getUsdtBalanceDisplay()}
                                </span>
                            </div>

                            <div className={`flex justify-between items-center text-sm p-2 rounded-lg ${hasEnoughGas() ? 'bg-green-500/10' : 'bg-red-500/10'
                                }`}>
                                <span className="text-gray-300">BNB for Gas:</span>
                                <span className={hasEnoughGas() ? 'text-green-400' : 'text-red-400'}>
                                    {getNativeBalanceDisplay()}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm p-2 rounded-lg bg-white/5">
                                <span className="text-gray-300">USDT Allowance:</span>
                                <span className="text-white">{getAllowanceDisplay()}</span>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            onClick={handleRegister}
                            disabled={isPending || isApproving || !referrerId || !stakeAmount}
                            className="w-full py-4 font-black text-base uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
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

                        <p className="text-center text-gray-500 text-sm mt-4">
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
