'use client';

import { useState } from 'react';

export default function SettingsTab() {
    const [settings, setSettings] = useState({
        platformFee: '2',
        minStake: '5',
        maxStake: '5000',
        maintenanceMode: false
    });

    const handleSave = () => {
        console.log('Saving settings:', settings);
        alert('Settings saved successfully!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Platform Settings */}
            <div className="card-gold p-8 border-4 border-gold-primary/40">
                <h2 className="text-2xl font-black text-gold-primary mb-6 uppercase">Platform Settings</h2>

                <div className="space-y-6">
                    {/* Platform Fee */}
                    <div>
                        <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                            Platform Fee (%)
                        </label>
                        <input
                            type="number"
                            value={settings.platformFee}
                            onChange={(e) => setSettings({ ...settings, platformFee: e.target.value })}
                            className="w-full px-4 py-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white focus:border-gold-primary focus:outline-none transition-all"
                        />
                    </div>

                    {/* Min Stake */}
                    <div>
                        <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                            Minimum Stake Amount ($)
                        </label>
                        <input
                            type="number"
                            value={settings.minStake}
                            onChange={(e) => setSettings({ ...settings, minStake: e.target.value })}
                            className="w-full px-4 py-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white focus:border-gold-primary focus:outline-none transition-all"
                        />
                    </div>

                    {/* Max Stake */}
                    <div>
                        <label className="block text-sm font-bold text-gold-primary mb-2 uppercase tracking-wider">
                            Maximum Stake Amount ($)
                        </label>
                        <input
                            type="number"
                            value={settings.maxStake}
                            onChange={(e) => setSettings({ ...settings, maxStake: e.target.value })}
                            className="w-full px-4 py-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg text-white focus:border-gold-primary focus:outline-none transition-all"
                        />
                    </div>

                    {/* Maintenance Mode */}
                    <div className="flex items-center justify-between p-4 bg-black/50 border-2 border-gold-primary/30 rounded-lg">
                        <div>
                            <div className="font-bold text-white mb-1">Maintenance Mode</div>
                            <div className="text-sm text-gray-400">Disable user access temporarily</div>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                            className={`px-6 py-2 rounded-lg font-bold transition-all ${settings.maintenanceMode
                                    ? 'bg-red-500 text-white'
                                    : 'bg-green-500/20 text-green-400 border-2 border-green-500'
                                }`}
                        >
                            {settings.maintenanceMode ? 'ON' : 'OFF'}
                        </button>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full py-4 font-black uppercase rounded-lg transition-all hover:scale-105"
                        style={{
                            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                            color: '#000000',
                            boxShadow: '0 4px 30px rgba(255, 215, 0, 0.5)'
                        }}
                    >
                        Save Settings
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="card-gold p-8 border-4 border-red-500/40">
                <h2 className="text-2xl font-black text-red-400 mb-6 uppercase">Danger Zone</h2>
                <div className="space-y-3">
                    <button className="w-full py-3 px-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg text-red-400 font-bold hover:border-red-500 hover:bg-red-500/20 transition-all text-left">
                        Clear All Cache
                    </button>
                    <button className="w-full py-3 px-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg text-red-400 font-bold hover:border-red-500 hover:bg-red-500/20 transition-all text-left">
                        Reset Platform Statistics
                    </button>
                </div>
            </div>
        </div>
    );
}
