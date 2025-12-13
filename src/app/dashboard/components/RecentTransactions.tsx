interface Transaction {
    type: string;
    amount: string;
    date: string;
    status: string;
}

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40">
            <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">Recent Transactions</h2>
            <div className="space-y-3">
                {transactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-black/50 border border-gold-primary/20 rounded-lg hover:border-gold-primary transition-all">
                        <div>
                            <div className="font-bold text-white">{tx.type}</div>
                            <div className="text-xs text-gray-400">{tx.date}</div>
                        </div>
                        <div className="text-right">
                            <div className={`font-black text-lg ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {tx.amount}
                            </div>
                            <div className="text-xs text-gold-primary uppercase">{tx.status}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
