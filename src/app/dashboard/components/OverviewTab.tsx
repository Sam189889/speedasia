'use client';

import toast from 'react-hot-toast';
import { useUserDashboard } from '@/hooks/user/useUserDashboard';
import { formatUSDT, decodeUserId } from '@/hooks/common/formatters';
import StatsCard from './StatsCard';
import ActiveStakes from './ActiveStakes';

interface OverviewTabProps {
    userId: `0x${string}` | undefined;
    onCreateStake: () => void;
}

export default function OverviewTab({ userId, onCreateStake }: OverviewTabProps) {
    // Fetch dashboard data
    const { dashboard, isLoading } = useUserDashboard(userId);

    // Loading state
    if (isLoading || !dashboard) {
        return (
            <div className="space-y-6">
                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="card-gold p-6 border-4 border-gold-primary/40 animate-pulse">
                            <div className="w-10 h-10 bg-gold-primary/20 rounded-lg mb-3"></div>
                            <div className="w-20 h-6 bg-gold-primary/20 rounded mb-2"></div>
                            <div className="w-16 h-4 bg-gold-primary/10 rounded"></div>
                        </div>
                    ))}
                </div>
                {/* Content Skeleton */}
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 card-gold p-6 border-4 border-gold-primary/40 animate-pulse">
                        <div className="w-40 h-6 bg-gold-primary/20 rounded mb-6"></div>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-5 bg-black/50 border-2 border-gold-primary/30 rounded-lg">
                                    <div className="w-24 h-6 bg-gold-primary/20 rounded mb-2"></div>
                                    <div className="w-full h-2 bg-gold-primary/10 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card-gold p-6 border-4 border-gold-primary/40 animate-pulse">
                        <div className="w-32 h-6 bg-gold-primary/20 rounded mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-full h-8 bg-gold-primary/10 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Transform data for stats cards
    const stats = [
        {
            label: 'Total Staked',
            value: `$${dashboard.stakingStats?.totalStaked ? formatUSDT(dashboard.stakingStats.totalStaked) : '0'}`,
            icon: '💰'
        },
        {
            label: 'Total Earnings',
            value: `$${dashboard.incomes?.totalIncome ? formatUSDT(dashboard.incomes.totalIncome) : '0'}`,
            icon: '📈'
        },
        {
            label: 'Direct Referrals',
            value: dashboard.team?.directReferralCount ? Number(dashboard.team.directReferralCount) : 0,
            icon: '👥'
        },
        {
            label: 'Team Size',
            value: dashboard.team?.teamSize ? Number(dashboard.team.teamSize) : 0,
            icon: '🌐'
        }
    ];

    // Transform stakes data
    const activeStakes = dashboard.stakes?.filter(s => s.isActive).map(stake => {
        const daysTotal = Number(stake.duration) / 86400;
        const now = Date.now() / 1000;
        const startTime = Number(stake.startTime);
        const endTime = Number(stake.endTime);
        const daysLeft = Math.max(0, Math.ceil((endTime - now) / 86400));
        const progress = Math.min(100, Math.max(0, Math.floor(((now - startTime) / (endTime - startTime)) * 100)));

        return {
            amount: `$${formatUSDT(stake.amount)}`,
            plan: `${daysTotal} Days`,
            interest: `${Number(stake.interestRate) / 100}%`,
            daysLeft: daysLeft,
            progress: progress,
            endTime: endTime // Add endTime for countdown timer
        };
    }) || [];

    // Decode userId for referral link
    const userIdString = userId ? decodeUserId(userId) : '';
    const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/register?r=${userIdString}`;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success('Referral link copied! 🔗');
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Stakes */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Available Balance Card */}
                    <div className="card-gold p-6 border-4 border-gold-primary/40">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-sm text-gray-400 uppercase font-bold mb-1">Available Balance</div>
                                <div className="text-3xl font-black text-gold-primary">
                                    ${dashboard.incomes?.availableBalance ? formatUSDT(dashboard.incomes.availableBalance) : '0.00'}
                                </div>
                            </div>
                            <button
                                className="px-6 py-3 rounded-lg font-bold text-black transition-all hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
                                }}
                            >
                                Withdraw
                            </button>
                        </div>
                    </div>

                    {/* Active Stakes */}
                    <ActiveStakes stakes={activeStakes} onCreateStake={onCreateStake} />
                </div>

                {/* Right Column - Income & Referral */}
                <div className="space-y-6">
                    {/* Income Breakdown */}
                    <div className="card-gold p-6 border-4 border-gold-primary/40">
                        <h3 className="text-lg font-black text-gold-primary mb-4 uppercase">Income Breakdown</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                <span className="text-gray-400">💵 Direct Income</span>
                                <span className="text-white font-bold">${formatUSDT(dashboard.incomes?.directIncome || BigInt(0))}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                <span className="text-gray-400">📊 Level Income</span>
                                <span className="text-white font-bold">${formatUSDT(dashboard.incomes?.levelIncome || BigInt(0))}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                <span className="text-gray-400">💎 Staking Income</span>
                                <span className="text-white font-bold">${formatUSDT(dashboard.incomes?.stakingIncome || BigInt(0))}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                <span className="text-gray-400">🏆 Lifetime Rewards</span>
                                <span className="text-white font-bold">${formatUSDT(dashboard.incomes?.lifetimeRewardIncome || BigInt(0))}</span>
                            </div>
                            <div className="border-t border-gold-primary/30 pt-3 mt-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gold-primary font-bold">Total Withdrawn</span>
                                    <span className="text-gold-primary font-black">${formatUSDT(dashboard.incomes?.totalWithdrawn || BigInt(0))}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Stats */}
                    <div className="card-gold p-6 border-4 border-gold-primary/40">
                        <h3 className="text-lg font-black text-gold-primary mb-4 uppercase">Team Stats</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                <div className="text-2xl font-black text-white">{Number(dashboard.team?.directReferralCount || 0)}</div>
                                <div className="text-xs text-gray-400">Directs</div>
                            </div>
                            <div className="text-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                <div className="text-2xl font-black text-white">{Number(dashboard.team?.qualifyingDirectCount || 0)}</div>
                                <div className="text-xs text-gray-400">Qualifying</div>
                            </div>
                            <div className="text-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                <div className="text-2xl font-black text-white">{Number(dashboard.unlockedLevels || 0)}</div>
                                <div className="text-xs text-gray-400">Levels</div>
                            </div>
                            <div className="text-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                <div className="text-2xl font-black text-white">{Number(dashboard.team?.teamSize || 0)}</div>
                                <div className="text-xs text-gray-400">Team Size</div>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-gold-primary/10 rounded-lg border border-gold-primary/30">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Team Business</span>
                                <span className="text-gold-primary font-bold">${formatUSDT(dashboard.team?.teamBusinessVolume || BigInt(0))}</span>
                            </div>
                        </div>
                    </div>

                    {/* Referral Link */}
                    <div className="card-gold p-6 border-4 border-gold-primary/40">
                        <h3 className="text-lg font-black text-gold-primary mb-4 uppercase">Your Referral Link</h3>
                        <div className="p-3 bg-black/50 rounded-lg border border-gold-primary/20 mb-4">
                            <code className="text-gray-300 text-sm break-all">{referralLink}</code>
                        </div>
                        <button
                            onClick={handleCopyLink}
                            className="w-full py-3 rounded-lg font-bold text-black transition-all hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
                            }}
                        >
                            📋 Copy Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
