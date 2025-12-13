'use client';

import { useState } from 'react';

export default function StakeTab() {
    const [selectedPlan, setSelectedPlan] = useState('');
    const [stakeAmount, setStakeAmount] = useState('');

    const stakingPlans = [
        { days: 7, interest: '3%', minAmount: '$5' },
        { days: 14, interest: '7%', minAmount: '$5' },
        { days: 21, interest: '16%', minAmount: '$5' },
        { days: 30, interest: '25%', minAmount: '$5' }
    ];

    const handleStake = () => {
        console.log('Staking:', { plan: selectedPlan, amount: stakeAmount });
        // Add staking logic
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="card-gold p-8 border-4 border-gold-primary/40">
                <h2 className="text-3xl font-black text-gold-primary mb-6 uppercase">Create New Stake</h2>

                {/* Staking Plans */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gold-primary mb-4 uppercase tracking-wider">
                        Select Staking Plan
                    </label>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {stakingPlans.map((plan, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedPlan(`${plan.days}-days`)}
                                className={`p-6 rounded-lg border-2 transition-all ${selectedPlan === `${plan.days}-days`
                                        ? 'border-gold-primary bg-gold-primary/10'
                                        : 'border-gold-primary/30 bg-black/50 hover:border-gold-primary'
                                    }`}
                            >
                                <div className="text-4xl font-black text-gold-primary mb-2">{plan.days} Days</div>
                                <div className="text-2xl font-bold text-white mb-1">{plan.interest} Interest</div>
                                <div className="text-sm text-gray-400">Min: {plan.minAmount}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amount Input */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                        Stake Amount (USD)
                    </label>
                    <input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="Enter amount (Min: $5, Max: $5000)"
                        className="w-full px-4 py-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white text-xl placeholder-gray-500 focus:border-gold-primary focus:outline-none transition-all"
                    />
                    <div className="mt-2 text-sm text-gray-400">
                        Range: $5 - $5,000
                    </div>
                </div>

                {/* Summary */}
                {selectedPlan && stakeAmount && (
                    <div className="mb-8 p-6 bg-gold-primary/10 border-2 border-gold-primary rounded-lg">
                        <h3 className="text-lg font-bold text-gold-primary mb-4">Stake Summary</h3>
                        <div className="space-y-2 text-white">
                            <div className="flex justify-between">
                                <span>Plan:</span>
                                <span className="font-bold">{selectedPlan}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Amount:</span>
                                <span className="font-bold">${stakeAmount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Expected Return:</span>
                                <span className="font-bold text-gold-primary">
                                    ${(parseFloat(stakeAmount) * (selectedPlan === '7-days' ? 0.03 : selectedPlan === '14-days' ? 0.07 : selectedPlan === '21-days' ? 0.16 : 0.25)).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stake Button */}
                <button
                    onClick={handleStake}
                    disabled={!selectedPlan || !stakeAmount}
                    className="w-full py-4 font-black text-base uppercase tracking-wider rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        color: '#000000',
                        boxShadow: '0 4px 30px rgba(255, 215, 0, 0.5)'
                    }}
                >
                    Confirm Stake
                </button>
            </div>
        </div>
    );
}
