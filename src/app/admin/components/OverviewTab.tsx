'use client';

import { useContractStats, usePartners } from '@/hooks/admin/useAdminData';
import { formatUSDT } from '@/hooks/common/formatters';
import AdminStatsCard from './AdminStatsCard';

export default function OverviewTab() {
    const { stats, isLoading } = useContractStats();
    const { partners, isLoading: partnersLoading } = usePartners();

    // Loading state
    if (isLoading) {
        return (
            <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-xl">Loading Statistics...</p>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="card-gold p-12 border-4 border-gold-primary/40 text-center">
                <p className="text-gray-400">No statistics available</p>
            </div>
        );
    }

    // Calculate total distributed
    const totalDistributed = stats.totalDirectIncome + stats.totalLevelIncome +
        stats.totalStakingIncome + stats.totalLifetimeRewards;

    // Stats array for cards
    const statsData = [
        { label: 'Total Users', value: Number(stats.totalUsers).toLocaleString(), icon: '👥' },
        { label: 'Total Staked', value: `$${formatUSDT(stats.totalStaked, 0)}`, icon: '💰' },
        { label: 'Total Withdrawn', value: `$${formatUSDT(stats.totalWithdrawn, 0)}`, icon: '💸' },
        { label: 'Contract Balance', value: `$${formatUSDT(stats.contractBalance, 0)}`, icon: '🏦' }
    ];

    // Income breakdown
    const incomeBreakdown = [
        { label: 'Direct Income', value: stats.totalDirectIncome, icon: '👥', color: 'border-green-500/30' },
        { label: 'Level Income', value: stats.totalLevelIncome, icon: '📊', color: 'border-purple-500/30' },
        { label: 'Staking Income', value: stats.totalStakingIncome, icon: '💎', color: 'border-blue-500/30' },
        { label: 'Lifetime Rewards', value: stats.totalLifetimeRewards, icon: '🏆', color: 'border-yellow-500/30' }
    ];

    return (
        <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <AdminStatsCard
                        key={index}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>

            {/* Income Breakdown */}
            <div className="card-gold p-6 border-4 border-gold-primary/40 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-gold-primary uppercase">Income Distribution</h2>
                    <div className="px-4 py-2 bg-gold-primary/10 rounded-full border border-gold-primary/30">
                        <span className="text-gold-primary font-bold">Total: ${formatUSDT(totalDistributed, 0)}</span>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {incomeBreakdown.map((item, index) => (
                        <div key={index} className={`p-4 bg-black/50 border-2 ${item.color} rounded-lg`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-sm text-gray-400">{item.label}</span>
                            </div>
                            <div className="text-2xl font-black text-white">
                                ${formatUSDT(item.value, 0)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Partners Section */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <h2 className="text-xl font-black text-gold-primary mb-6 uppercase">Partners</h2>
                {partnersLoading ? (
                    <div className="text-center py-4">
                        <div className="w-8 h-8 border-2 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : partners.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">No partners configured</div>
                ) : (
                    <div className="space-y-3">
                        {partners.map((partner, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-black/50 border border-gold-primary/20 rounded-lg hover:border-gold-primary transition-all">
                                <div>
                                    <div className="font-mono text-white text-sm truncate max-w-[200px] sm:max-w-none">
                                        {partner.address}
                                    </div>
                                    <div className="text-xs text-gray-400">Partner #{index + 1}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-gold-primary">
                                        {Number(partner.share) / 100}%
                                    </div>
                                    <div className="text-xs text-gray-400">Share</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
