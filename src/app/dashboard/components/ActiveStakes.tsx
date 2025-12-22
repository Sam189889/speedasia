'use client';

import { useState, useEffect } from 'react';

interface ActiveStake {
    amount: string;
    plan: string;
    interest: string;
    daysLeft: number;
    progress: number;
    endTime?: number; // Unix timestamp in seconds
}

interface ActiveStakesProps {
    stakes: ActiveStake[];
    onCreateStake: () => void;
}

// Countdown Timer Component
function CountdownTimer({ endTime }: { endTime: number }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = Math.floor(Date.now() / 1000);
            const diff = endTime - now;

            if (diff <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(diff / 86400),
                hours: Math.floor((diff % 86400) / 3600),
                minutes: Math.floor((diff % 3600) / 60),
                seconds: diff % 60
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="flex gap-1 text-center">
            <div className="bg-black/60 rounded px-2 py-1 border border-gold-primary/30">
                <div className="text-gold-primary font-black text-lg leading-none">{pad(timeLeft.days)}</div>
                <div className="text-[8px] text-gray-500 uppercase">Days</div>
            </div>
            <span className="text-gold-primary font-bold self-center">:</span>
            <div className="bg-black/60 rounded px-2 py-1 border border-gold-primary/30">
                <div className="text-gold-primary font-black text-lg leading-none">{pad(timeLeft.hours)}</div>
                <div className="text-[8px] text-gray-500 uppercase">Hrs</div>
            </div>
            <span className="text-gold-primary font-bold self-center">:</span>
            <div className="bg-black/60 rounded px-2 py-1 border border-gold-primary/30">
                <div className="text-gold-primary font-black text-lg leading-none">{pad(timeLeft.minutes)}</div>
                <div className="text-[8px] text-gray-500 uppercase">Min</div>
            </div>
            <span className="text-gold-primary font-bold self-center">:</span>
            <div className="bg-black/60 rounded px-2 py-1 border border-gold-primary/30">
                <div className="text-gold-primary font-black text-lg leading-none">{pad(timeLeft.seconds)}</div>
                <div className="text-[8px] text-gray-500 uppercase">Sec</div>
            </div>
        </div>
    );
}

export default function ActiveStakes({ stakes, onCreateStake }: ActiveStakesProps) {
    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40">
            <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">Active Stakes</h2>
            <div className="space-y-4">
                {stakes.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-3">📊</div>
                        <p>No active stakes yet</p>
                        <p className="text-sm">Create your first stake to start earning!</p>
                    </div>
                ) : (
                    stakes.map((stake, index) => (
                        <div key={index} className="p-5 bg-black/50 border-2 border-gold-primary/30 rounded-lg hover:border-gold-primary transition-all">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                <div>
                                    <div className="text-2xl font-black text-white mb-1">{stake.amount}</div>
                                    <div className="text-sm text-gray-400">{stake.plan} Plan • {stake.interest} Interest</div>
                                </div>
                                {/* Countdown Timer */}
                                {stake.endTime && (
                                    <CountdownTimer endTime={stake.endTime} />
                                )}
                            </div>

                            {/* Progress Bar */}
                            <div className="relative">
                                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-gold-secondary to-gold-primary transition-all duration-500 relative"
                                        style={{ width: `${stake.progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="text-xs text-gold-primary font-bold">{stake.progress}% Complete</div>
                                    <div className="text-xs text-gray-400">{stake.daysLeft} days remaining</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* New Stake Button */}
            <button
                onClick={onCreateStake}
                className="w-full mt-6 py-4 font-black uppercase rounded-lg transition-all hover:scale-105"
                style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#000000',
                    boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)'
                }}
            >
                + Create New Stake
            </button>
        </div>
    );
}
