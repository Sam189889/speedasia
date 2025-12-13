'use client';

import Link from 'next/link';
import Image from 'next/image';
import WalletConnect from '@/app/walletConnect/WalletConnect';

export default function DashboardHeader() {
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
                        src="/logo.png"
                        alt="Speed Asia Logo"
                        width={240}
                        height={80}
                        className="h-16 w-auto"
                        priority
                        quality={100}
                    />
                </Link>

                {/* Wallet Connect Button */}
                <WalletConnect />
            </div>
        </header>
    );
}
