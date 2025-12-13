'use client';

import { useState } from 'react';
import AdminHeader from './components/AdminHeader';
import AdminBottomNav from './components/AdminBottomNav';
import OverviewTab from './components/OverviewTab';
import UsersTab from './components/UsersTab';
import TransactionsTab from './components/TransactionsTab';
import SettingsTab from './components/SettingsTab';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock admin data
    const adminData = {
        name: 'Admin',
        totalUsers: 1247,
        totalStaked: '$2.5M',
        totalEarnings: '$875K',
        activeStakes: 856
    };

    const stats = [
        { label: 'Total Users', value: adminData.totalUsers, icon: '👥', trend: '+12%' },
        { label: 'Total Staked', value: adminData.totalStaked, icon: '💰', trend: '+8%' },
        { label: 'Total Earnings', value: adminData.totalEarnings, icon: '📈', trend: '+15%' },
        { label: 'Active Stakes', value: adminData.activeStakes, icon: '⭐', trend: '+5%' }
    ];

    // Handlers
    const handleLogout = () => {
        console.log('Logging out...');
        // Add logout logic
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab stats={stats} />;
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

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <AdminHeader
                adminName={adminData.name}
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
