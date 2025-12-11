interface StatsCardProps {
    label: string;
    value: string | number;
    icon: string;
}

export default function StatsCard({ label, value, icon }: StatsCardProps) {
    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40 hover:border-gold-primary transition-all group">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
            <div className="text-2xl md:text-3xl font-black text-gold-primary mb-1">{value}</div>
            <div className="text-xs md:text-sm text-gray-400 uppercase font-bold">{label}</div>
        </div>
    );
}
