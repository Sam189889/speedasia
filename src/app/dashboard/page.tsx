'use client';

import { useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import Link from 'next/link';

// Hooks
import { useUserValidation } from '@/hooks/user/useUserValidation';
import { useUserDashboard } from '@/hooks/user/useUserDashboard';
import { encodeUserId, decodeUserId, formatUSDT } from '@/hooks/common/formatters';

// Components
import DashboardHeader from './components/DashboardHeader';
import DashboardBottomNav from './components/DashboardBottomNav';
import OverviewTab from './components/OverviewTab';
import StakeTab from './components/StakeTab';
import EarningsTab from './components/EarningsTab';
import ProfileTab from './components/ProfileTab';
import QuickActions from './components/QuickActions';
import ReferralSection from './components/ReferralSection';
import WalletConnect from '@/app/walletConnect/WalletConnect';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');

    // Wallet
    const activeAccount = useActiveAccount();
    const userAddress = activeAccount?.address;

    // Validation & Registration Check
    const {
        isRegistered,
        isLoading: checkingRegistration,
        displayUserId,
        userId
    } = useUserValidation(userAddress);

    // User Dashboard Data
    const {
        dashboard,
        isLoading: loadingDashboard
    } = useUserDashboard(userId);

    // Show connect wallet message if not connected
    if (!userAddress) {
        return (
            <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-secondary/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

                {/* Connect Wallet Message */}
                <div className="min-h-screen flex items-center justify-center relative z-10">
                    <div className="text-center card-gold p-12 max-w-md mx-4 border-4 border-gold-primary/40">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4">Connect Your Wallet</h2>
                        <p className="text-gray-400 mb-8">Please connect your wallet to access your dashboard</p>

                        <div className="flex justify-center mb-6">
                            <WalletConnect />
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span>Secure connection via ThirdWeb</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show loading state
    if (checkingRegistration || loadingDashboard) {
        return (
            <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse"></div>

                <DashboardHeader />

                <div className="min-h-screen flex items-center justify-center pt-20 relative z-10">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-xl font-bold">Loading Dashboard...</p>
                        <p className="text-gray-400 text-sm mt-2">Fetching your data from blockchain...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show registration required message
    if (!isRegistered) {
        return (
            <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse"></div>

                <DashboardHeader />

                <div className="min-h-screen flex items-center justify-center pt-20 relative z-10">
                    <div className="text-center card-gold p-12 max-w-lg mx-4 border-4 border-gold-primary/40">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4">Registration Required</h2>
                        <p className="text-gray-400 mb-6">
                            Your wallet is connected, but you need to register first to access the dashboard.
                        </p>
                        <p className="text-sm text-gray-500 mb-8">
                            Connected Wallet: <span className="text-gold-primary font-mono">{userAddress?.slice(0, 6)}...{userAddress?.slice(-4)}</span>
                        </p>

                        <Link
                            href="/register"
                            className="inline-block px-8 py-4 font-black text-base uppercase tracking-wider rounded-lg transition-all hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                color: '#000000',
                                boxShadow: '0 4px 30px rgba(255, 215, 0, 0.5)'
                            }}
                        >
                            Register Now
                        </Link>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span>Registration is required to start earning</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Prepare user data from dashboard
    const userData = {
        walletAddress: userAddress,
        userId: displayUserId || '',
        totalStaked: dashboard?.stakingStats?.totalStaked ? formatUSDT(dashboard.stakingStats.totalStaked) : '0',
        activeStaked: dashboard?.stakingStats?.activeStakedAmount ? formatUSDT(dashboard.stakingStats.activeStakedAmount) : '0',
        activeStakesCount: dashboard?.stakingStats?.activeStakesCount ? Number(dashboard.stakingStats.activeStakesCount) : 0,
        totalEarnings: dashboard?.incomes?.totalIncome ? formatUSDT(dashboard.incomes.totalIncome) : '0',
        availableBalance: dashboard?.incomes?.availableBalance ? formatUSDT(dashboard.incomes.availableBalance) : '0',
        directIncome: dashboard?.incomes?.directIncome ? formatUSDT(dashboard.incomes.directIncome) : '0',
        levelIncome: dashboard?.incomes?.levelIncome ? formatUSDT(dashboard.incomes.levelIncome) : '0',
        stakingIncome: dashboard?.incomes?.stakingIncome ? formatUSDT(dashboard.incomes.stakingIncome) : '0',
        lifetimeRewards: dashboard?.incomes?.lifetimeRewardIncome ? formatUSDT(dashboard.incomes.lifetimeRewardIncome) : '0',
        referrals: dashboard?.team?.directReferralCount ? Number(dashboard.team.directReferralCount) : 0,
        teamSize: dashboard?.team?.teamSize ? Number(dashboard.team.teamSize) : 0,
        unlockedLevels: dashboard?.unlockedLevels ? Number(dashboard.unlockedLevels) : 0,
    };

    const stats = [
        { label: 'Total Staked', value: `$${userData.totalStaked}`, icon: '💰' },
        { label: 'Total Earnings', value: `$${userData.totalEarnings}`, icon: '📈' },
        { label: 'Direct Referrals', value: userData.referrals, icon: '👥' },
        { label: 'Unlocked Levels', value: userData.unlockedLevels, icon: '⭐' }
    ];

    // Transform stakes data
    const activeStakes = dashboard?.stakes?.filter(s => s.isActive).map(stake => {
        const daysTotal = Number(stake.duration) / 86400;
        const daysLeft = Math.max(0, Math.ceil((Number(stake.endTime) - Date.now() / 1000) / 86400));
        const progress = Math.min(100, Math.floor(((Date.now() / 1000) - Number(stake.startTime)) / (Number(stake.endTime) - Number(stake.startTime)) * 100));

        return {
            amount: `$${formatUSDT(stake.amount)}`,
            plan: `${daysTotal} Days`,
            interest: `${Number(stake.interestRate) / 100}%`,
            daysLeft: daysLeft,
            progress: progress
        };
    }) || [];

    // Handlers
    const handleCreateStake = () => setActiveTab('stake');
    const handleWithdraw = () => setActiveTab('earnings');
    const handleInvite = () => console.log('Inviting friends...');
    const handleCalculator = () => console.log('Opening calculator...');

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`speedasia.io/register?r=${userData.userId}`);
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
                                recentTransactions={[]}
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
                                referralLink={`speedasia.io/register?r=${userData.userId}`}
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
        <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-secondary/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Welcome Section */}
                {activeTab === 'overview' && (
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black mb-2" style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}>
                            Welcome Back, {userData.userId}! 👋
                        </h1>
                        <p className="text-gray-400">Here's your staking overview</p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                            <span className="text-gray-500">Available Balance:</span>
                            <span className="text-gold-primary font-bold">${userData.availableBalance} USDT</span>
                        </div>
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
