'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectedWallet, setConnectedWallet] = useState('');
    const [referralCode, setReferralCode] = useState('');

    const walletOptions = [
        {
            name: 'MetaMask',
            icon: '🦊',
            description: 'Connect with MetaMask wallet'
        },
        {
            name: 'WalletConnect',
            icon: '🔗',
            description: 'Scan with WalletConnect'
        },
        {
            name: 'Trust Wallet',
            icon: '🛡️',
            description: 'Connect with Trust Wallet'
        },
        {
            name: 'Coinbase Wallet',
            icon: '💼',
            description: 'Connect with Coinbase'
        }
    ];

    const handleWalletConnect = async (walletName: string) => {
        setIsConnecting(true);
        // Simulate wallet connection
        setTimeout(() => {
            setConnectedWallet(walletName);
            setIsConnecting(false);
            // Here you would integrate actual wallet connection logic
            console.log(`Connecting to ${walletName}...`);
        }, 1500);
    };

    const handleRegister = () => {
        if (connectedWallet) {
            console.log('Registering with wallet:', connectedWallet);
            console.log('Referral code:', referralCode);
            // Handle registration logic
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-primary)_0%,_transparent_70%)] opacity-5"></div>

            {/* Animated Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-secondary/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

            <div className="w-full max-w-lg relative z-10">
                {/* Logo & Header */}
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
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                    }}>
                        CONNECT WALLET
                    </h1>
                    <p className="text-gray-400 text-lg">Choose your wallet to get started</p>
                </div>

                {/* Main Card */}
                <div className="card-gold p-8 border-4 border-gold-primary/40 hover:border-gold-primary transition-all">
                    {!connectedWallet ? (
                        <>
                            {/* Wallet Options */}
                            <div className="space-y-4 mb-6">
                                {walletOptions.map((wallet, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleWalletConnect(wallet.name)}
                                        disabled={isConnecting}
                                        className="w-full p-5 bg-black/50 border-2 border-gold-primary/30 rounded-xl hover:border-gold-primary hover:bg-gold-primary/5 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl group-hover:scale-110 transition-transform">
                                                {wallet.icon}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className="text-white font-bold text-lg group-hover:text-gold-primary transition-colors">
                                                    {wallet.name}
                                                </h3>
                                                <p className="text-gray-400 text-sm">{wallet.description}</p>
                                            </div>
                                            <svg className="w-6 h-6 text-gold-primary opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Loading State */}
                            {isConnecting && (
                                <div className="text-center py-4">
                                    <div className="inline-block w-8 h-8 border-4 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-gold-primary mt-2 font-bold">Connecting wallet...</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Connected State */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gold-primary/10 border-2 border-gold-primary rounded-full mb-4">
                                    <div className="w-3 h-3 bg-gold-primary rounded-full animate-pulse"></div>
                                    <span className="text-gold-primary font-bold">Wallet Connected</span>
                                </div>
                                <p className="text-white font-bold text-lg">{connectedWallet}</p>
                            </div>

                            {/* Referral Code Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                                    Referral Code (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={referralCode}
                                    onChange={(e) => setReferralCode(e.target.value)}
                                    className="w-full px-4 py-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-primary focus:outline-none transition-all"
                                    placeholder="Enter referral code"
                                />
                            </div>

                            {/* Register Button */}
                            <button
                                onClick={handleRegister}
                                className="w-full py-4 font-black text-base uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 relative overflow-hidden group mb-4"
                                style={{
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                                    color: '#000000',
                                    boxShadow: '0 4px 30px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.2)',
                                    border: '2px solid #FFD700'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                <span className="relative z-10">COMPLETE REGISTRATION</span>
                            </button>

                            {/* Disconnect Button */}
                            <button
                                onClick={() => setConnectedWallet('')}
                                className="w-full py-3 border-2 border-gold-primary/30 rounded-lg text-gray-400 hover:border-gold-primary hover:text-gold-primary transition-all"
                            >
                                Disconnect Wallet
                            </button>
                        </>
                    )}

                    {/* Info Box */}
                    <div className="mt-6 p-4 bg-gold-primary/5 border border-gold-primary/20 rounded-lg">
                        <div className="flex items-start gap-3">
                            <span className="text-gold-primary text-xl">ℹ️</span>
                            <div className="text-sm text-gray-300">
                                <p className="font-bold text-gold-primary mb-1">Secure Connection</p>
                                <p>Your wallet connection is encrypted and secure. We never store your private keys.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-6 text-center space-y-2">
                    <p className="text-gray-400 text-sm">
                        Already registered?{' '}
                        <Link href="/dashboard" className="text-gold-primary hover:text-gold-secondary font-bold transition-colors">
                            Go to Dashboard
                        </Link>
                    </p>
                    <p className="text-xs text-gray-500">
                        By connecting your wallet, you agree to our{' '}
                        <Link href="/terms" className="text-gold-primary hover:underline">Terms</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-gold-primary hover:underline">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
