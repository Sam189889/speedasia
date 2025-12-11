export default function TransactionsTab() {
    const transactions = [
        { id: '#TX001', user: 'User #1234', type: 'Stake Deposit', amount: '$500', status: 'Completed', date: 'Dec 10, 2024 14:30' },
        { id: '#TX002', user: 'User #5678', type: 'Withdrawal', amount: '$250', status: 'Completed', date: 'Dec 10, 2024 14:15' },
        { id: '#TX003', user: 'User #9012', type: 'Staking Reward', amount: '$25', status: 'Completed', date: 'Dec 10, 2024 14:00' },
        { id: '#TX004', user: 'User #3456', type: 'Direct Income', amount: '$15', status: 'Pending', date: 'Dec 10, 2024 13:45' },
        { id: '#TX005', user: 'User #1234', type: 'Level Income', amount: '$8', status: 'Completed', date: 'Dec 10, 2024 13:30' }
    ];

    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40 overflow-x-auto">
            <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">All Transactions</h2>

            <div className="min-w-[900px]">
                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 p-4 bg-gold-primary/10 border-2 border-gold-primary/30 rounded-lg mb-4 font-bold text-gold-primary text-sm">
                    <div>TX ID</div>
                    <div>USER</div>
                    <div>TYPE</div>
                    <div>AMOUNT</div>
                    <div>STATUS</div>
                    <div>DATE</div>
                </div>

                {/* Table Rows */}
                <div className="space-y-2">
                    {transactions.map((tx, index) => (
                        <div key={index} className="grid grid-cols-6 gap-4 p-4 bg-black/50 border border-gold-primary/20 rounded-lg hover:border-gold-primary transition-all items-center">
                            <div className="font-mono text-gold-primary text-sm">{tx.id}</div>
                            <div className="font-bold text-white">{tx.user}</div>
                            <div className="text-gray-400">{tx.type}</div>
                            <div className="text-gold-primary font-bold">{tx.amount}</div>
                            <div>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${tx.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                    {tx.status}
                                </span>
                            </div>
                            <div className="text-gray-400 text-sm">{tx.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
