'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/src/logo.png';

interface AdminHeaderProps {
    adminName: string;
    onLogout: () => void;
}

export default function AdminHeader({ adminName, onLogout }: AdminHeaderProps) {
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

                {/* Admin Info */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gold-primary/10 border-2 border-gold-primary rounded-lg">
                        <svg className="w-5 h-5 text-gold-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gold-primary font-bold text-sm">{adminName}</span>
                    </div>
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 border-2 border-red-500/30 rounded-lg text-red-400 hover:border-red-500 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
