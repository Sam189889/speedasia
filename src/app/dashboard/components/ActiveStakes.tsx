interface ActiveStake {
    amount: string;
    plan: string;
    interest: string;
    daysLeft: number;
    progress: number;
}

interface ActiveStakesProps {
    stakes: ActiveStake[];
    onCreateStake: () => void;
}

export default function ActiveStakes({ stakes, onCreateStake }: ActiveStakesProps) {
    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40">
            <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">Active Stakes</h2>
            <div className="space-y-4">
                {stakes.map((stake, index) => (
                    <div key={index} className="p-5 bg-black/50 border-2 border-gold-primary/30 rounded-lg hover:border-gold-primary transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-2xl font-black text-white mb-1">{stake.amount}</div>
                                <div className="text-sm text-gray-400">{stake.plan} Plan • {stake.interest} Interest</div>
                            </div>
                            <div className="text-right">
                                <div className="text-gold-primary font-bold">{stake.daysLeft} days left</div>
                                <div className="text-xs text-gray-400">Remaining</div>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="relative">
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gold-primary transition-all duration-500"
                                    style={{ width: `${stake.progress}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-gold-primary font-bold mt-1">{stake.progress}% Complete</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Stake Button */}
            <button
                onClick={onCreateStake}
                className="w-full mt-6 py-4 font-black uppercase rounded-lg transition-all hover:scale-105"
                style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#000000',
                    boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)'
                }}
            >
                + Create New Stake
            </button>
        </div>
    );
}
