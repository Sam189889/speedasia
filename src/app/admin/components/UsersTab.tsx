'use client';

import { useState } from 'react';
import { useTotalUsersCount, useUserByIndex } from '@/hooks/admin/useAdminData';
import { useUserValidation } from '@/hooks/user/useUserValidation';
import { useUserDashboard } from '@/hooks/user/useUserDashboard';
import { useUserIdByAddress } from '@/hooks/user/useUserData';
import { decodeUserId, formatUSDT } from '@/hooks/common/formatters';

export default function UsersTab() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const pageSize = 10;

    const { totalUsers, isLoading: countLoading } = useTotalUsersCount();
    const totalCount = Number(totalUsers);
    const totalPages = Math.ceil(totalCount / pageSize);

    const startIndex = currentPage * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);

    // Loading skeleton - matches dashboard pattern
    if (countLoading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="card-gold p-6 border-4 border-gold-primary/40 animate-pulse">
                            <div className="w-10 h-10 bg-gold-primary/20 rounded-lg mb-3"></div>
                            <div className="w-20 h-6 bg-gold-primary/20 rounded mb-2"></div>
                            <div className="w-16 h-4 bg-gold-primary/10 rounded"></div>
                        </div>
                    ))}
                </div>
                <div className="card-gold p-6 border-4 border-gold-primary/40 animate-pulse">
                    <div className="w-40 h-6 bg-gold-primary/20 rounded mb-6"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-4 bg-black/50 border border-gold-primary/20 rounded-lg">
                                <div className="w-64 h-5 bg-gold-primary/10 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Card - matches dashboard StatsCard pattern */}
            <div className="card-gold p-6 border-4 border-gold-primary/40 hover:border-gold-primary transition-all group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">👥</div>
                <div className="text-2xl md:text-3xl font-black text-gold-primary mb-1">{totalCount.toLocaleString()}</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase font-bold">Total Registered Users</div>
                {totalCount > 0 && (
                    <div className="mt-3 pt-3 border-t border-gold-primary/20">
                        <span className="text-sm text-gray-400">Showing {startIndex + 1} - {endIndex}</span>
                    </div>
                )}
            </div>

            {/* Search Section */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <h3 className="text-lg font-black text-gold-primary mb-4 uppercase">Search User</h3>
                <div className="p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter wallet address (0x...)"
                        className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none font-mono"
                    />
                </div>
                {searchTerm.startsWith('0x') && searchTerm.length >= 10 && (
                    <div className="mt-4">
                        <UserSearchResult address={searchTerm} onSelect={setSelectedUser} />
                    </div>
                )}
            </div>

            {/* Users List - matches Direct Referrals list pattern */}
            <div className="card-gold p-6 border-4 border-gold-primary/40">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg sm:text-xl font-black text-gold-primary uppercase">All Users</h3>
                    <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-primary/10 rounded-full border border-gold-primary/30">
                        <span className="text-gold-primary font-bold text-sm">Page {currentPage + 1} / {totalPages || 1}</span>
                    </div>
                </div>

                {totalCount === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-5xl mb-4">👥</div>
                        <p className="text-gray-400 mb-2">No users registered yet</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {Array.from({ length: Math.min(pageSize, totalCount - startIndex) }, (_, i) => (
                                <UserRow key={startIndex + i} index={startIndex + i} onSelect={setSelectedUser} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-gold-primary/20">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                    disabled={currentPage === 0}
                                    className="px-6 py-3 rounded-lg font-bold text-black transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                                    style={{
                                        background: currentPage === 0 ? '#555' : 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                        boxShadow: currentPage === 0 ? 'none' : '0 4px 15px rgba(255, 215, 0, 0.3)'
                                    }}
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                    disabled={currentPage >= totalPages - 1}
                                    className="px-6 py-3 rounded-lg font-bold text-black transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                                    style={{
                                        background: currentPage >= totalPages - 1 ? '#555' : 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                        boxShadow: currentPage >= totalPages - 1 ? 'none' : '0 4px 15px rgba(255, 215, 0, 0.3)'
                                    }}
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* User Detail Modal */}
            {selectedUser && (
                <UserDetailModal address={selectedUser} onClose={() => setSelectedUser(null)} />
            )}
        </div>
    );
}

// User Row - matches Direct Referrals list item pattern
function UserRow({ index, onSelect }: { index: number; onSelect: (address: string) => void }) {
    const { userAddress, isLoading } = useUserByIndex(index);
    const { userId, isLoading: userIdLoading } = useUserIdByAddress(userAddress ?? undefined);

    if (isLoading) {
        return (
            <div className="flex items-center justify-between p-3 bg-black/50 border border-gold-primary/20 rounded-lg animate-pulse">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold-primary/20"></div>
                    <div className="w-48 h-4 bg-gold-primary/10 rounded"></div>
                </div>
            </div>
        );
    }

    if (!userAddress) return null;

    return (
        <div
            onClick={() => onSelect(userAddress)}
            className="flex items-center justify-between p-3 bg-black/50 border border-gold-primary/20 rounded-lg hover:border-gold-primary/40 transition-all cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                </div>
                <div>
                    <span className="font-mono text-white font-bold text-sm truncate max-w-[180px] sm:max-w-none block">
                        {userAddress.slice(0, 10)}...{userAddress.slice(-6)}
                    </span>
                    {!userIdLoading && userId && (
                        <span className="text-xs text-gold-primary">ID: {decodeUserId(userId)}</span>
                    )}
                </div>
            </div>
            <span className="text-gold-primary font-bold text-sm">View →</span>
        </div>
    );
}

// Search Result - matches user dashboard style
function UserSearchResult({ address, onSelect }: { address: string; onSelect: (address: string) => void }) {
    const { isRegistered, userId, isLoading } = useUserValidation(address as `0x${string}`);

    if (isLoading) {
        return (
            <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-400">Searching...</span>
                </div>
            </div>
        );
    }

    if (!isRegistered) {
        return (
            <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-red-500/30">
                <span className="text-gray-400">❌ Not Registered</span>
                <span className="text-red-400 font-bold text-sm">User not found</span>
            </div>
        );
    }

    return (
        <div
            onClick={() => onSelect(address)}
            className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-green-500/30 hover:border-green-500 cursor-pointer transition-all"
        >
            <div className="flex items-center gap-3">
                <span className="text-green-400">✓ Found</span>
                <span className="font-mono text-white text-sm">{address.slice(0, 12)}...{address.slice(-6)}</span>
            </div>
            <span className="text-gold-primary font-bold">ID: {userId ? decodeUserId(userId) : '-'}</span>
        </div>
    );
}

// User Detail Modal - matches dashboard Income Breakdown / Team Stats pattern
function UserDetailModal({ address, onClose }: { address: string; onClose: () => void }) {
    const { userId, isLoading: userIdLoading } = useUserIdByAddress(address);
    const { dashboard, isLoading: dashboardLoading } = useUserDashboard(userId);

    const isLoading = userIdLoading || dashboardLoading;

    return (
        <div
            className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center p-4"
            style={{ top: '80px', bottom: '64px' }}
            onClick={onClose}
        >
            <div
                className="card-gold border-4 border-gold-primary/60 w-full max-w-2xl max-h-full overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - matches dashboard card header */}
                <div className="p-6 border-b border-gold-primary/30">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-black text-gold-primary uppercase">User Details</h2>
                            <span className="text-white font-bold text-lg">
                                ID: {userId ? decodeUserId(userId) : 'Loading...'}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg font-bold text-black transition-all hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            }}
                        >
                            ✕ Close
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-xl">Loading User Data...</p>
                    </div>
                ) : !dashboard ? (
                    <div className="p-12 text-center">
                        <div className="text-5xl mb-4">❌</div>
                        <p className="text-gray-400">User data not found</p>
                    </div>
                ) : (
                    <div className="p-6 space-y-6">
                        {/* Wallet Address - centered display */}
                        <div className="text-center">
                            <div className="inline-block px-4 py-2 bg-black/50 rounded-lg border border-gold-primary/20">
                                <code className="text-gray-300 text-sm break-all">{address}</code>
                            </div>
                        </div>

                        {/* Stats Grid - matches Team Summary pattern */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-center">
                                <div className="text-2xl font-black text-gold-primary mb-1">
                                    {dashboard.info.isActive ? '✓' : '✗'}
                                </div>
                                <div className="text-xs text-gray-400 uppercase">Status</div>
                            </div>
                            <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-center">
                                <div className="text-2xl font-black text-gold-primary mb-1">
                                    {Number(dashboard.team.directReferralCount)}
                                </div>
                                <div className="text-xs text-gray-400 uppercase">Directs</div>
                            </div>
                            <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-center">
                                <div className="text-2xl font-black text-gold-primary mb-1">
                                    {Number(dashboard.team.teamSize)}
                                </div>
                                <div className="text-xs text-gray-400 uppercase">Team</div>
                            </div>
                            <div className="p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-center">
                                <div className="text-2xl font-black text-gold-primary mb-1">
                                    {Number(dashboard.unlockedLevels)}
                                </div>
                                <div className="text-xs text-gray-400 uppercase">Levels</div>
                            </div>
                        </div>

                        {/* Staking Stats - matches dashboard pattern */}
                        <div>
                            <h3 className="text-lg font-black text-gold-primary mb-4 uppercase">💰 Staking</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-black/50 border-2 border-green-500/30 rounded-lg text-center">
                                    <div className="text-2xl font-black text-green-400 mb-1">
                                        ${formatUSDT(dashboard.stakingStats.totalStaked, 0)}
                                    </div>
                                    <div className="text-xs text-gray-400 uppercase">Total Staked</div>
                                </div>
                                <div className="p-4 bg-black/50 border-2 border-blue-500/30 rounded-lg text-center">
                                    <div className="text-2xl font-black text-blue-400 mb-1">
                                        {Number(dashboard.stakingStats.activeStakesCount)}
                                    </div>
                                    <div className="text-xs text-gray-400 uppercase">Active Stakes</div>
                                </div>
                            </div>
                        </div>

                        {/* Income Breakdown - 2 per row */}
                        <div>
                            <h3 className="text-lg font-black text-gold-primary mb-4 uppercase">📊 Income Breakdown</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                    <span className="text-gray-400 text-sm">💵 Direct</span>
                                    <span className="text-white font-bold">${formatUSDT(dashboard.incomes.directIncome)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                    <span className="text-gray-400 text-sm">📊 Level</span>
                                    <span className="text-white font-bold">${formatUSDT(dashboard.incomes.levelIncome)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                    <span className="text-gray-400 text-sm">💎 Staking</span>
                                    <span className="text-white font-bold">${formatUSDT(dashboard.incomes.stakingIncome)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                    <span className="text-gray-400 text-sm">🏆 Lifetime</span>
                                    <span className="text-white font-bold">${formatUSDT(dashboard.incomes.lifetimeRewardIncome)}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-gold-primary/30">
                                <div className="p-3 bg-gold-primary/10 rounded-lg border border-gold-primary/30 text-center">
                                    <div className="text-xs text-gray-400 mb-1">Total</div>
                                    <div className="text-gold-primary font-black">${formatUSDT(dashboard.incomes.totalIncome, 0)}</div>
                                </div>
                                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30 text-center">
                                    <div className="text-xs text-gray-400 mb-1">Available</div>
                                    <div className="text-green-400 font-black">${formatUSDT(dashboard.incomes.availableBalance, 0)}</div>
                                </div>
                                <div className="p-3 bg-black/50 rounded-lg border border-gold-primary/20 text-center">
                                    <div className="text-xs text-gray-400 mb-1">Withdrawn</div>
                                    <div className="text-white font-bold">${formatUSDT(dashboard.incomes.totalWithdrawn, 0)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Team Business - matches Team Stats pattern */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Direct Business</span>
                                    <span className="text-lg font-bold text-yellow-400">${formatUSDT(dashboard.team.directBusinessVolume, 0)}</span>
                                </div>
                            </div>
                            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Team Business</span>
                                    <span className="text-lg font-bold text-purple-400">${formatUSDT(dashboard.team.teamBusinessVolume, 0)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Registration Info */}
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <p className="text-sm text-blue-300 text-center">
                                <span className="font-bold">Registered:</span> {new Date(Number(dashboard.info.registrationTime) * 1000).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
