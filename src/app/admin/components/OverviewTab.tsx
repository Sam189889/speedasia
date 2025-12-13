import AdminStatsCard from './AdminStatsCard';

interface OverviewTabProps {
    stats: Array<{ label: string; value: string | number; icon: string; trend?: string }>;
}

export default function OverviewTab({ stats }: OverviewTabProps) {
    const recentActivity = [
        { user: 'User #1234', action: 'New Stake', amount: '$500', time: '5 min ago' },
        { user: 'User #5678', action: 'Withdrawal', amount: '$250', time: '12 min ago' },
        { user: 'User #9012', action: 'New Registration', amount: '-', time: '18 min ago' },
        { user: 'User #3456', action: 'Referral Bonus', amount: '$15', time: '25 min ago' }
    ];

    return (
        <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {stats.map((stat, index) => (
                    <AdminStatsCard
                        key={index}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        trend={stat.trend}
                    />
                ))}
            </div>

            {/* Recent Activity */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">Recent Activity</h2>
                <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-black/50 border border-gold-primary/20 rounded-lg hover:border-gold-primary transition-all">
                            <div>
                                <div className="font-bold text-white">{activity.user}</div>
                                <div className="text-sm text-gray-400">{activity.action}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-gold-primary">{activity.amount}</div>
                                <div className="text-xs text-gray-400">{activity.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
