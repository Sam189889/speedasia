'use client';

interface AdminBottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function AdminBottomNav({ activeTab, onTabChange }: AdminBottomNavProps) {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'users', label: 'Users', icon: '👥' },
        { id: 'transactions', label: 'Transactions', icon: '💰' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];

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

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
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
