interface QuickActionsProps {
    onWithdraw: () => void;
    onInvite: () => void;
    onCalculator: () => void;
}

export default function QuickActions({ onWithdraw, onInvite, onCalculator }: QuickActionsProps) {
    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40">
            <h3 className="text-xl font-black text-gold-primary mb-4 uppercase">Quick Actions</h3>
            <div className="space-y-3">
                <button
                    onClick={onWithdraw}
                    className="w-full py-3 px-4 bg-gold-primary/10 border-2 border-gold-primary/30 rounded-lg text-gold-primary font-bold hover:border-gold-primary hover:bg-gold-primary/20 transition-all flex items-center justify-between"
                >
                    <span>Withdraw Earnings</span>
                    <span>💸</span>
                </button>
                <button
                    onClick={onInvite}
                    className="w-full py-3 px-4 bg-gold-primary/10 border-2 border-gold-primary/30 rounded-lg text-gold-primary font-bold hover:border-gold-primary hover:bg-gold-primary/20 transition-all flex items-center justify-between"
                >
                    <span>Invite Friends</span>
                    <span>👥</span>
                </button>
                <button
                    onClick={onCalculator}
                    className="w-full py-3 px-4 bg-gold-primary/10 border-2 border-gold-primary/30 rounded-lg text-gold-primary font-bold hover:border-gold-primary hover:bg-gold-primary/20 transition-all flex items-center justify-between"
                >
                    <span>View Calculator</span>
                    <span>🧮</span>
                </button>
            </div>
        </div>
    );
}
