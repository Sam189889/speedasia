'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { encodeUserId } from '@/hooks/common/formatters';
import OverviewTab from '@/app/dashboard/components/OverviewTab';
import TeamTab from '@/app/dashboard/components/TeamTab';
import EarningsTab from '@/app/dashboard/components/EarningsTab';
import StakeTab from '@/app/dashboard/components/StakeTab';

export default function UserLookupPage() {
    const searchParams = useSearchParams();
    const urlUserId = searchParams.get('user');
    
    const [userIdInput, setUserIdInput] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'earnings' | 'stake'>('overview');
    const [viewingUserId, setViewingUserId] = useState<`0x${string}` | undefined>(undefined);

    // Auto-lookup if user param in URL
    useEffect(() => {
        if (urlUserId && urlUserId.length === 5) {
            setUserIdInput(urlUserId.toUpperCase());
            const encoded = encodeUserId(urlUserId.toUpperCase());
            setViewingUserId(encoded);
        }
    }, [urlUserId]);

    const handleLookup = () => {
        if (userIdInput.trim().length === 5) {
            const encoded = encodeUserId(userIdInput.trim().toUpperCase());
            setViewingUserId(encoded);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Header */}
            <div className="border-b border-gold-primary/20 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-black text-gold-primary uppercase">
                            🔍 User Lookup
                        </h1>
                        <a
                            href="/"
                            className="px-4 py-2 rounded-lg font-bold text-gold-primary border-2 border-gold-primary/30 hover:bg-gold-primary/10 transition-all"
                        >
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* User ID Input Card */}
                <div className="card-gold p-6 border-4 border-gold-primary/40 mb-6">
                    <h2 className="text-xl font-black text-gold-primary uppercase mb-4">
                        Enter User ID
                    </h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={userIdInput}
                                onChange={(e) => setUserIdInput(e.target.value.toUpperCase())}
                                placeholder="Enter 5-character User ID (e.g. ABCDE)"
                                maxLength={5}
                                className="w-full px-4 py-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white text-lg font-mono uppercase focus:border-gold-primary focus:outline-none"
                                onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
                            />
                            <p className="text-xs text-gray-400 mt-2">
                                Enter any user's 5-character ID to view their dashboard
                            </p>
                        </div>
                        <button
                            onClick={handleLookup}
                            disabled={userIdInput.trim().length !== 5}
                            className="px-8 py-3 rounded-lg font-black uppercase transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-black"
                            style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}
                        >
                            🔍 Lookup
                        </button>
                    </div>

                    {viewingUserId && (
                        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <p className="text-sm text-green-400">
                                <span className="font-bold">Viewing User:</span> {userIdInput.toUpperCase()}
                            </p>
                        </div>
                    )}
                </div>

                {/* Dashboard Content - Only show if user is selected */}
                {viewingUserId ? (
                    <>
                        {/* Tab Navigation */}
                        <div className="card-gold p-2 border-4 border-gold-primary/40 mb-6">
                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    { id: 'overview', label: '📊 Overview', icon: '📊' },
                                    { id: 'team', label: '👥 Team', icon: '👥' },
                                    { id: 'earnings', label: '💰 Earnings', icon: '💰' },
                                    { id: 'stake', label: '⚡ Stake', icon: '⚡' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                        className={`py-3 px-4 rounded-lg font-bold uppercase transition-all ${
                                            activeTab === tab.id
                                                ? 'bg-gradient-to-r from-gold-primary to-yellow-600 text-black scale-105'
                                                : 'bg-black/30 text-gray-400 hover:bg-black/50 hover:text-white'
                                        }`}
                                    >
                                        <span className="text-xl mr-2">{tab.icon}</span>
                                        <span className="hidden sm:inline">{tab.label.replace(/.*\s/, '')}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-6">
                            {activeTab === 'overview' && (
                                <OverviewTab 
                                    userId={viewingUserId}
                                    onCreateStake={() => {}}
                                    onWithdraw={() => {}}
                                />
                            )}

                            {activeTab === 'team' && (
                                <TeamTab userId={viewingUserId} />
                            )}

                            {activeTab === 'earnings' && (
                                <EarningsTab userId={viewingUserId} />
                            )}

                            {activeTab === 'stake' && (
                                <StakeTab userId={viewingUserId} />
                            )}
                        </div>
                    </>
                ) : (
                    <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-black text-gold-primary mb-2">No User Selected</h3>
                        <p className="text-gray-400">Enter a User ID above to view their dashboard</p>
                    </div>
                )}
            </div>
        </div>
    );
}
