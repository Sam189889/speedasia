'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/src/logo.png';

interface DashboardHeaderProps {
    walletAddress: string;
    onDisconnect: () => void;
}

export default function DashboardHeader({ walletAddress, onDisconnect }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b-2 border-gold-primary/20" style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(26,21,8,0.95) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(255, 215, 0, 0.2)'
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src={logo}
                        alt="Speed Asia Logo"
                        width={240}
                        height={80}
                        className="h-16 w-auto"
                        priority
                        quality={100}
                    />
                </Link>

                {/* Wallet Info */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gold-primary/10 border-2 border-gold-primary rounded-lg">
                        <svg className="w-5 h-5 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="text-gold-primary font-bold text-sm">{walletAddress}</span>
                    </div>
                    <button
                        onClick={onDisconnect}
                        className="px-4 py-2 border-2 border-gold-primary/30 rounded-lg text-gold-primary hover:border-gold-primary transition-all"
                    >
                        Disconnect
                    </button>
                </div>
            </div>
        </header>
    );
}
