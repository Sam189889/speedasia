export default function ProfileTab() {
    const userInfo = {
        username: 'SpeedUser123',
        email: 'user@example.com',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f4a8f',
        joinDate: 'Nov 15, 2024',
        totalReferrals: 12,
        activeReferrals: 8,
        level: 5
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Card */}
            <div className="card-gold p-8 border-4 border-gold-primary/40">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl" style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                    }}>
                        👤
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gold-primary mb-1">{userInfo.username}</h2>
                        <p className="text-gray-400">Member since {userInfo.joinDate}</p>
                    </div>
                </div>

                {/* User Details */}
                <div className="space-y-4">
                    <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Email</div>
                        <div className="text-white font-bold">{userInfo.email}</div>
                    </div>

                    <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg">
                        <div className="text-sm text-gray-400 mb-1">Wallet Address</div>
                        <div className="text-white font-mono text-sm break-all">{userInfo.walletAddress}</div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-center">
                            <div className="text-2xl font-black text-gold-primary mb-1">{userInfo.level}</div>
                            <div className="text-xs text-gray-400 uppercase">Current Level</div>
                        </div>
                        <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-center">
                            <div className="text-2xl font-black text-gold-primary mb-1">{userInfo.totalReferrals}</div>
                            <div className="text-xs text-gray-400 uppercase">Total Referrals</div>
                        </div>
                        <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-center">
                            <div className="text-2xl font-black text-gold-primary mb-1">{userInfo.activeReferrals}</div>
                            <div className="text-xs text-gray-400 uppercase">Active Referrals</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <h3 className="text-2xl font-black text-gold-primary mb-6 uppercase">Settings</h3>
                <div className="space-y-3">
                    <button className="w-full py-3 px-4 bg-gold-primary/10 border-2 border-gold-primary/30 rounded-lg text-gold-primary font-bold hover:border-gold-primary hover:bg-gold-primary/20 transition-all text-left flex items-center justify-between">
                        <span>Edit Profile</span>
                        <span>✏️</span>
                    </button>
                    <button className="w-full py-3 px-4 bg-gold-primary/10 border-2 border-gold-primary/30 rounded-lg text-gold-primary font-bold hover:border-gold-primary hover:bg-gold-primary/20 transition-all text-left flex items-center justify-between">
                        <span>Security Settings</span>
                        <span>🔒</span>
                    </button>
                    <button className="w-full py-3 px-4 bg-gold-primary/10 border-2 border-gold-primary/30 rounded-lg text-gold-primary font-bold hover:border-gold-primary hover:bg-gold-primary/20 transition-all text-left flex items-center justify-between">
                        <span>Notification Preferences</span>
                        <span>🔔</span>
                    </button>
                    <button className="w-full py-3 px-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg text-red-400 font-bold hover:border-red-500 hover:bg-red-500/20 transition-all text-left flex items-center justify-between">
                        <span>Disconnect Wallet</span>
                        <span>🚪</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
