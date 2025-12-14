'use client';

interface DashboardBottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function DashboardBottomNav({ activeTab, onTabChange }: DashboardBottomNavProps) {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'stake', label: 'Stake', icon: '💎' },
        { id: 'earnings', label: 'Earnings', icon: '💰' },
        { id: 'team', label: 'Team', icon: '👥' }
    ];

    const handleClick = (item: typeof navItems[0]) => {
        onTabChange(item.id);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe" style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 215, 0, 0.2)',
            boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.5)'
        }}>
            <div className="flex justify-around items-center h-16 sm:h-18 md:h-20 px-2 sm:px-4 max-w-7xl mx-auto">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;

                    // Stake button - center with highlight
                    if (item.id === 'stake') {
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleClick(item)}
                                className="group flex flex-col items-center justify-center gap-1 py-2 px-2 sm:px-4 min-w-[60px] sm:min-w-[70px] transition-all active:scale-95 -mt-4 sm:-mt-6"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center relative group-hover:scale-110 transition-transform" style={{
                                    background: isActive
                                        ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                                        : 'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 165, 0, 0.3) 100%)',
                                    boxShadow: isActive
                                        ? '0 4px 25px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)'
                                        : '0 4px 15px rgba(255, 215, 0, 0.2)'
                                }}>
                                    <span className={`text-2xl sm:text-3xl ${isActive ? 'text-black' : 'text-gold-primary'}`}>
                                        {item.icon}
                                    </span>
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-full bg-gold-primary animate-ping opacity-20"></div>
                                    )}
                                </div>
                                <span className={`text-[9px] sm:text-[10px] font-bold ${isActive ? 'text-gold-primary' : 'text-gray-400'}`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    }

                    // Regular nav items
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleClick(item)}
                            className="group flex flex-col items-center justify-center gap-1 py-2 px-2 sm:px-4 min-w-[60px] sm:min-w-[70px] transition-all hover:scale-110 active:scale-95"
                        >
                            <div className="relative">
                                <div className={`text-2xl sm:text-3xl transition-all ${isActive ? 'scale-110 text-gold-primary' : 'text-gray-400 group-hover:text-gold-primary'
                                    }`}>
                                    {item.icon}
                                </div>
                                <div className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-primary transition-transform ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}></div>
                            </div>
                            <span className={`text-[9px] sm:text-[10px] font-medium transition-colors ${isActive ? 'text-gold-primary font-bold' : 'text-gray-400 group-hover:text-gold-primary'
                                }`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
