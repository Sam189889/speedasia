export default function EarningsTab() {
    const earningsData = [
        { type: 'Staking Income', amount: '$425', percentage: '48%' },
        { type: 'Direct Income', amount: '$262', percentage: '30%' },
        { type: 'Level Income', amount: '$131', percentage: '15%' },
        { type: 'Lifetime Rewards', amount: '$57', percentage: '7%' }
    ];

    const earningsHistory = [
        { date: 'Dec 10, 2024', type: 'Staking Reward', amount: '+$25', status: 'Completed' },
        { date: 'Dec 10, 2024', type: 'Direct Income', amount: '+$15', status: 'Completed' },
        { date: 'Dec 9, 2024', type: 'Level Income', amount: '+$8', status: 'Completed' },
        { date: 'Dec 9, 2024', type: 'Staking Reward', amount: '+$25', status: 'Completed' },
        { date: 'Dec 8, 2024', type: 'Lifetime Reward', amount: '+$50', status: 'Completed' },
        { date: 'Dec 8, 2024', type: 'Direct Income', amount: '+$12', status: 'Completed' }
    ];

    return (
        <div className="space-y-6">
            {/* Total Earnings Card */}
            <div className="card-gold p-8 border-4 border-gold-primary/40 text-center">
                <div className="text-sm text-gray-400 uppercase mb-2">Total Earnings</div>
                <div className="text-5xl md:text-6xl font-black text-gold-primary mb-4">$875</div>
                <div className="text-gray-400">All time earnings from all sources</div>
            </div>

            {/* Earnings Breakdown */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">Earnings Breakdown</h2>
                <div className="space-y-4">
                    {earningsData.map((item, index) => (
                        <div key={index} className="p-5 bg-black/50 border-2 border-gold-primary/30 rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-white font-bold">{item.type}</span>
                                <span className="text-2xl font-black text-gold-primary">{item.amount}</span>
                            </div>
                            <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gold-primary transition-all"
                                    style={{ width: item.percentage }}
                                ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{item.percentage} of total</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Earnings History */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">Earnings History</h2>
                <div className="space-y-3">
                    {earningsHistory.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-black/50 border border-gold-primary/20 rounded-lg hover:border-gold-primary transition-all">
                            <div>
                                <div className="font-bold text-white">{item.type}</div>
                                <div className="text-xs text-gray-400">{item.date}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-black text-lg text-green-400">{item.amount}</div>
                                <div className="text-xs text-gold-primary uppercase">{item.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
