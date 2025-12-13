interface AdminStatsCardProps {
    label: string;
    value: string | number;
    icon: string;
    trend?: string;
}

export default function AdminStatsCard({ label, value, icon, trend }: AdminStatsCardProps) {
    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40 hover:border-gold-primary transition-all group">
            <div className="flex items-start justify-between mb-3">
                <div className="text-4xl group-hover:scale-110 transition-transform">{icon}</div>
                {trend && (
                    <div className={`text-xs font-bold px-2 py-1 rounded ${trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {trend}
                    </div>
                )}
            </div>
            <div className="text-2xl md:text-3xl font-black text-gold-primary mb-1">{value}</div>
            <div className="text-xs md:text-sm text-gray-400 uppercase font-bold">{label}</div>
        </div>
    );
}
