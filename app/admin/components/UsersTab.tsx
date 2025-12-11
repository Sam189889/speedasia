'use client';

import { useState } from 'react';

export default function UsersTab() {
    const [searchTerm, setSearchTerm] = useState('');

    const users = [
        { id: '#1234', wallet: '0x742d...4a8f', totalStaked: '$2,500', earnings: '$875', referrals: 12, status: 'Active', joined: 'Nov 15, 2024' },
        { id: '#5678', wallet: '0x8a3f...9c2d', totalStaked: '$1,800', earnings: '$540', referrals: 8, status: 'Active', joined: 'Nov 20, 2024' },
        { id: '#9012', wallet: '0x5d2c...7b1a', totalStaked: '$3,200', earnings: '$1,120', referrals: 15, status: 'Active', joined: 'Nov 25, 2024' },
        { id: '#3456', wallet: '0x9f1e...4c8b', totalStaked: '$950', earnings: '$285', referrals: 5, status: 'Inactive', joined: 'Dec 1, 2024' }
    ];

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by User ID or Wallet Address..."
                    className="w-full px-4 py-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white placeholder-gray-500 focus:border-gold-primary focus:outline-none transition-all"
                />
            </div>

            {/* Users Table */}
            <div className="card-gold p-6 border-4 border-gold-primary/40 overflow-x-auto">
                <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">All Users</h2>
                <div className="min-w-[800px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-7 gap-4 p-4 bg-gold-primary/10 border-2 border-gold-primary/30 rounded-lg mb-4 font-bold text-gold-primary text-sm">
                        <div>USER ID</div>
                        <div>WALLET</div>
                        <div>STAKED</div>
                        <div>EARNINGS</div>
                        <div>REFERRALS</div>
                        <div>STATUS</div>
                        <div>JOINED</div>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-2">
                        {users.map((user, index) => (
                            <div key={index} className="grid grid-cols-7 gap-4 p-4 bg-black/50 border border-gold-primary/20 rounded-lg hover:border-gold-primary transition-all items-center">
                                <div className="font-bold text-white">{user.id}</div>
                                <div className="text-gray-400 font-mono text-sm">{user.wallet}</div>
                                <div className="text-gold-primary font-bold">{user.totalStaked}</div>
                                <div className="text-green-400 font-bold">{user.earnings}</div>
                                <div className="text-white">{user.referrals}</div>
                                <div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {user.status}
                                    </span>
                                </div>
                                <div className="text-gray-400 text-sm">{user.joined}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
