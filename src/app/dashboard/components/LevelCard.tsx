'use client';

import { useState } from 'react';
import { useLevelUsers } from '@/hooks/user/useUserData';
import { formatUSDT, decodeUserId } from '@/hooks/common/formatters';

interface LevelCardProps {
    userId: `0x${string}` | undefined;
    levelIndex: number;
    isUnlocked: boolean;
    users: number;
    business: bigint;
    incomePercent: number;
}

export default function LevelCard({
    userId,
    levelIndex,
    isUnlocked,
    users,
    business,
    incomePercent
}: LevelCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasData = users > 0 || business > BigInt(0);

    // Fetch level users only when expanded
    const { userIds, staked, isLoading } = useLevelUsers(
        isExpanded ? userId : undefined,
        levelIndex + 1 // API expects 1-indexed level
    );

    const handleToggle = () => {
        if (users > 0) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div className="w-full">
            {/* Level Card - Clickable */}
            <button
                onClick={handleToggle}
                disabled={users === 0}
                className={`w-full p-2 sm:p-3 rounded-lg border transition-all text-left ${isUnlocked
                    ? 'bg-gradient-to-br from-gold-primary/10 to-gold-secondary/5 border-gold-primary/40'
                    : 'bg-black/30 border-gray-700/50 opacity-60'
                    } ${users > 0 ? 'cursor-pointer hover:border-gold-primary' : 'cursor-default'}`}
            >
                {/* Level Header */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center font-bold text-xs ${isUnlocked
                            ? 'bg-gradient-to-br from-gold-primary to-gold-secondary text-black'
                            : 'bg-gray-800 text-gray-600'
                            }`}>
                            {levelIndex + 1}
                        </div>
                        {users > 0 && (
                            <span className={`text-[10px] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        )}
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isUnlocked
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-700/50 text-gray-500'
                        }`}>
                        {isUnlocked ? '✓' : '🔒'}
                    </span>
                </div>

                {/* Stats */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-500">Users</span>
                        <span className={`text-xs font-bold ${hasData ? 'text-gold-primary' : 'text-gray-600'}`}>
                            {users}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-500">Biz</span>
                        <span className={`text-[10px] font-bold ${hasData ? 'text-green-400' : 'text-gray-600'}`}>
                            ${formatUSDT(business, 0)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/10 pt-1 mt-1">
                        <span className="text-[10px] text-gray-500">Income</span>
                        <span className={`text-xs font-bold ${isUnlocked ? 'text-blue-400' : 'text-gray-600'}`}>
                            {incomePercent}%
                        </span>
                    </div>
                </div>
            </button>

            {/* Expanded Users List */}
            {isExpanded && (
                <div className="mt-2 p-2 bg-black/50 rounded-lg border border-gold-primary/20 animate-in slide-in-from-top-2">
                    <div className="text-[10px] text-gray-400 mb-2 uppercase font-bold">
                        Level {levelIndex + 1} Users
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-3">
                            <div className="w-4 h-4 border-2 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-2 text-xs text-gray-400">Loading...</span>
                        </div>
                    ) : userIds.length === 0 ? (
                        <div className="text-center py-2 text-xs text-gray-500">
                            No users found
                        </div>
                    ) : (
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                            {userIds.map((uid, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-1.5 bg-black/30 rounded border border-white/5"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded bg-gold-primary/20 flex items-center justify-center text-[10px] font-bold text-gold-primary">
                                            {idx + 1}
                                        </div>
                                        <span className="text-xs font-mono text-white">
                                            {decodeUserId(uid) || uid}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-green-400">
                                        ${formatUSDT(staked[idx] || BigInt(0), 0)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
