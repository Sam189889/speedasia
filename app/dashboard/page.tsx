'use client';

import { useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardBottomNav from './components/DashboardBottomNav';
import OverviewTab from './components/OverviewTab';
import StakeTab from './components/StakeTab';
import EarningsTab from './components/EarningsTab';
import ProfileTab from './components/ProfileTab';
import QuickActions from './components/QuickActions';
import ReferralSection from './components/ReferralSection';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock user data
    const userData = {
        walletAddress: '0x742d...4a8f',
        totalStaked: '$2,500',
        totalEarnings: '$875',
        referrals: 12,
        level: 5
    };

    const stats = [
        { label: 'Total Staked', value: userData.totalStaked, icon: '💰' },
        { label: 'Total Earnings', value: userData.totalEarnings, icon: '📈' },
        { label: 'Active Referrals', value: userData.referrals, icon: '👥' },
        { label: 'Current Level', value: userData.level, icon: '⭐' }
    ];

    const activeStakes = [
        { amount: '$1,000', plan: '30 Days', interest: '25%', daysLeft: 15, progress: 50 },
        { amount: '$1,500', plan: '21 Days', interest: '16%', daysLeft: 8, progress: 62 }
    ];

    const recentTransactions = [
        { type: 'Staking Reward', amount: '+$25', date: '2 hours ago', status: 'completed' },
        { type: 'Direct Income', amount: '+$15', date: '5 hours ago', status: 'completed' },
        { type: 'Level Income', amount: '+$8', date: '1 day ago', status: 'completed' },
        { type: 'Stake Deposit', amount: '-$500', date: '2 days ago', status: 'completed' }
    ];

    // Handlers
    const handleDisconnect = () => {
        console.log('Disconnecting wallet...');
    };

    const handleCreateStake = () => {
        setActiveTab('stake');
    };

    const handleWithdraw = () => {
        console.log('Withdrawing earnings...');
    };

    const handleInvite = () => {
        console.log('Inviting friends...');
    };

    const handleCalculator = () => {
        console.log('Opening calculator...');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText('speedasia.io/ref/ABC123');
        alert('Referral link copied!');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <OverviewTab
                                stats={stats}
                                activeStakes={activeStakes}
                                recentTransactions={recentTransactions}
                                onCreateStake={handleCreateStake}
                            />
                        </div>
                        <div className="space-y-6">
                            <QuickActions
                                onWithdraw={handleWithdraw}
                                onInvite={handleInvite}
                                onCalculator={handleCalculator}
                            />
                            <ReferralSection
                                referralLink="speedasia.io/ref/ABC123"
                                onCopyLink={handleCopyLink}
                            />
                        </div>
                    </div>
                );
            case 'stake':
                return <StakeTab />;
            case 'earnings':
                return <EarningsTab />;
            case 'profile':
                return <ProfileTab />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <DashboardHeader
                walletAddress={userData.walletAddress}
                onDisconnect={handleDisconnect}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section - Only show on overview */}
                {activeTab === 'overview' && (
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black mb-2" style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}>
                            Welcome Back! 👋
                        </h1>
                        <p className="text-gray-400">Here's your staking overview</p>
                    </div>
                )}

                {/* Tab Content */}
                {renderTabContent()}
            </main>

            <DashboardBottomNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </div>
    );
}
