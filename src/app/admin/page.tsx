'use client';

import { useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import AdminHeader from './components/AdminHeader';
import AdminBottomNav from './components/AdminBottomNav';
import OverviewTab from './components/OverviewTab';
import UsersTab from './components/UsersTab';
import TransactionsTab from './components/TransactionsTab';
import SettingsTab from './components/SettingsTab';
import WalletConnect from '@/app/walletConnect/WalletConnect';
import { ADMIN_ADDRESS } from '@/constants/addresses';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('overview');

    // Wallet
    const activeAccount = useActiveAccount();
    const userAddress = activeAccount?.address;

    // Check if connected wallet is admin
    const isAdmin = userAddress?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

    // Handlers
    const handleLogout = () => {
        console.log('Logging out...');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab />;
            case 'users':
                return <UsersTab />;
            case 'transactions':
                return <TransactionsTab />;
            case 'settings':
                return <SettingsTab />;
            default:
                return null;
        }
    };

    // Show connect wallet if not connected
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4">Admin Access</h2>
                        <p className="text-gray-400 mb-8">Connect your admin wallet to access the dashboard</p>

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

    // Show unauthorized message if not admin
    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-bg-gold-dark to-black"></div>
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

                {/* Unauthorized Message */}
                <div className="min-h-screen flex items-center justify-center relative z-10">
                    <div className="text-center card-gold p-12 max-w-md mx-4 border-4 border-red-500/40">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-red-400 mb-4">Access Denied</h2>
                        <p className="text-gray-400 mb-4">This wallet is not authorized to access the admin panel.</p>

                        {/* Show connected address */}
                        <div className="p-3 bg-black/50 border border-red-500/30 rounded-lg mb-6">
                            <div className="text-xs text-gray-500 mb-1">Connected Wallet</div>
                            <div className="font-mono text-sm text-white truncate">{userAddress}</div>
                        </div>

                        <p className="text-gray-500 text-sm mb-6">Please switch to an admin wallet to continue.</p>

                        <div className="flex justify-center">
                            <WalletConnect />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <AdminHeader
                adminName="Admin"
                onLogout={handleLogout}
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
                            Admin Dashboard 👨‍💼
                        </h1>
                        <p className="text-gray-400">Manage your platform</p>
                    </div>
                )}

                {/* Tab Content */}
                {renderTabContent()}
            </main>

            <AdminBottomNav
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </div>
    );
}
