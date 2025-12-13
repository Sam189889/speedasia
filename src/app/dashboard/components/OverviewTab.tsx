import StatsCard from './StatsCard';
import ActiveStakes from './ActiveStakes';
import RecentTransactions from './RecentTransactions';

interface OverviewTabProps {
    stats: Array<{ label: string; value: string | number; icon: string }>;
    activeStakes: Array<{
        amount: string;
        plan: string;
        interest: string;
        daysLeft: number;
        progress: number;
    }>;
    recentTransactions: Array<{
        type: string;
        amount: string;
        date: string;
        status: string;
    }>;
    onCreateStake: () => void;
}

export default function OverviewTab({ stats, activeStakes, recentTransactions, onCreateStake }: OverviewTabProps) {
    return (
        <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <ActiveStakes stakes={activeStakes} onCreateStake={onCreateStake} />
                    <RecentTransactions transactions={recentTransactions} />
                </div>
            </div>
        </>
    );
}
