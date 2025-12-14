'use client';

import { useUserDashboard } from '@/hooks/user/useUserDashboard';
import { useAllLevelsSummary } from '@/hooks/user/useUserData';
import { useContractConfig } from '@/hooks/common/useContractData';
import { formatUSDT, decodeUserId as decodeUserIdFn } from '@/hooks/common/formatters';
import LevelCard from './LevelCard';

interface TeamTabProps {
    userId: `0x${string}` | undefined;
}

export default function TeamTab({ userId }: TeamTabProps) {
    const { dashboard, isLoading } = useUserDashboard(userId);
    const { levelCounts, levelBusiness, isLoading: levelsLoading } = useAllLevelsSummary(userId);
    const { config, isLoading: configLoading } = useContractConfig();

    // Get level income percentages from contract config (convert from basis points to percentage)
    const levelPercents = config?.levelIncomePercents
        ? config.levelIncomePercents.map(p => Number(p) / 100)
        : [];

    // Loading state
    if (isLoading || levelsLoading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                    <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-xl">Loading Team Data...</p>
                </div>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                    <p className="text-gray-400">No team data available</p>
                </div>
            </div>
        );
    }

    const { team, unlockedLevels, levelsUnlocked } = dashboard;

    // Calculate totals from level data
    const totalLevelUsers = levelCounts.reduce((sum, count) => sum + Number(count), 0);
    const totalLevelBusiness = levelBusiness.reduce((sum, biz) => sum + biz, BigInt(0));

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Team Summary Card */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase text-center">My Team</h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-center">
                        <div className="text-3xl font-black text-gold-primary mb-1">
                            {Number(team.directReferralCount)}
                        </div>
                        <div className="text-xs text-gray-400 uppercase">Direct Referrals</div>
                    </div>
                    <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-center">
                        <div className="text-3xl font-black text-gold-primary mb-1">
                            {totalLevelUsers || Number(team.teamSize)}
                        </div>
                        <div className="text-xs text-gray-400 uppercase">Total Team</div>
                    </div>
                    <div className="p-4 bg-black/50 border-2 border-green-500/30 rounded-lg text-center">
                        <div className="text-3xl font-black text-green-400 mb-1">
                            ${formatUSDT(team.directBusinessVolume, 0)}
                        </div>
                        <div className="text-xs text-gray-400 uppercase">Direct Business</div>
                    </div>
                    <div className="p-4 bg-black/50 border-2 border-blue-500/30 rounded-lg text-center">
                        <div className="text-3xl font-black text-blue-400 mb-1">
                            ${formatUSDT(totalLevelBusiness || team.teamBusinessVolume, 0)}
                        </div>
                        <div className="text-xs text-gray-400 uppercase">Team Business</div>
                    </div>
                </div>

                {/* Qualifying Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Qualifying Directs ($20+)</span>
                            <span className="text-lg font-bold text-yellow-400">{Number(team.qualifyingDirectCount)}</span>
                        </div>
                    </div>
                    <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Qualifying Business</span>
                            <span className="text-lg font-bold text-purple-400">${formatUSDT(team.qualifyingDirectBusiness, 0)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Level-wise Data Card */}
            <div className="card-gold p-4 sm:p-6 border-4 border-gold-primary/40">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                    <h3 className="text-lg sm:text-xl font-black text-gold-primary uppercase">Level Details</h3>
                    <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-primary/10 rounded-full border border-gold-primary/30">
                        <span className="text-gold-primary font-bold text-sm">{Number(unlockedLevels)} / 20 Unlocked</span>
                    </div>
                </div>

                {/* Totals Summary - Mobile Friendly */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gold-primary/10 rounded-lg border border-gold-primary/30">
                    <div className="text-center">
                        <div className="text-lg font-black text-gold-primary">{totalLevelUsers}</div>
                        <div className="text-[10px] text-gray-400 uppercase">Total Users</div>
                    </div>
                    <div className="text-center border-x border-gold-primary/20">
                        <div className="text-lg font-black text-green-400">${formatUSDT(totalLevelBusiness, 0)}</div>
                        <div className="text-[10px] text-gray-400 uppercase">Total Business</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-black text-blue-400">{levelPercents.reduce((a, b) => a + b, 0)}%</div>
                        <div className="text-[10px] text-gray-400 uppercase">Total Income</div>
                    </div>
                </div>

                {/* Expandable Level Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                    {levelsUnlocked.map((isUnlocked, index) => (
                        <LevelCard
                            key={index}
                            userId={userId}
                            levelIndex={index}
                            isUnlocked={isUnlocked}
                            users={levelCounts[index] ? Number(levelCounts[index]) : 0}
                            business={levelBusiness[index] || BigInt(0)}
                            incomePercent={levelPercents[index]}
                        />
                    ))}
                </div>

                {/* Level Unlock Info */}
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-xs sm:text-sm text-blue-300 text-center">
                        <span className="font-bold">Unlock levels:</span> Each $20+ referral = 1 level, OR $2000 business = all 20!
                    </p>
                </div>
            </div>

            {/* Direct Referrals List */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <h3 className="text-xl font-black text-gold-primary mb-6 uppercase">Direct Referrals</h3>

                {team.directReferralIds.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-5xl mb-4">👥</div>
                        <p className="text-gray-400 mb-2">No direct referrals yet</p>
                        <p className="text-sm text-gray-500">Share your referral link to start building your team!</p>
                    </div>
                ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {team.directReferralIds.map((refId, index) => {
                            const decodedId = decodeUserIdFn(refId);
                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-black/50 border border-gold-primary/20 rounded-lg hover:border-gold-primary/40 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary flex items-center justify-center text-black font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <span className="font-mono text-white font-bold">{decodedId || refId}</span>
                                    </div>
                                    <span className="text-green-400 text-sm">✓ Active</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
