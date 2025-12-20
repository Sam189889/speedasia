'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useContractConfig } from '@/hooks/common/useContractData';
import { useContractStats, usePartners, useFirstUser } from '@/hooks/admin/useAdminData';
import { useAdminTransactions } from '@/hooks/admin/useAdminTransactions';
import { formatUSDT, usdtToWei } from '@/hooks/common/formatters';

type EditMode = 'durations' | 'interests' | 'tiers' | 'direct' | 'level' | 'withdrawal' | 'partners' | 'firstUser' | 'levelPercents' | 'lifetimeRewards' | null;

export default function SettingsTab() {
    const { config, lifetimeRewards, isLoading: configLoading } = useContractConfig();
    const { stats } = useContractStats();
    const { partners, isLoading: partnersLoading, refetch: refetchPartners } = usePartners();
    const { firstUser, isLoading: firstUserLoading, refetch: refetchFirstUser } = useFirstUser();
    const {
        setDurations,
        setInterestRates,
        setStakingTiers,
        setDirectIncomeConfig,
        setLevelUnlockConfig,
        setMinWithdrawal,
        setPartners,
        transferFirstUser,
        setLevelIncomePercents,
        setLifetimeRewardTier,
        emergencyWithdraw,
        isPending
    } = useAdminTransactions();

    const [editMode, setEditMode] = useState<EditMode>(null);

    // Form states
    const [durations, setDurationsState] = useState({ d1: '', d2: '', d3: '', d4: '' });
    const [interests, setInterests] = useState({ r1: '', r2: '', r3: '', r4: '' });
    const [tiers, setTiers] = useState({ t1: '', t2: '', t3min: '', max: '' });
    const [directConfig, setDirectConfig] = useState({ percent: '', minStake: '' });
    const [levelConfig, setLevelConfig] = useState({ minStake: '', businessForAll: '' });
    const [minWithdrawalAmount, setMinWithdrawalAmount] = useState('');
    const [emergencyAmount, setEmergencyAmount] = useState('');
    // Partners state
    const [partnersList, setPartnersList] = useState<{ address: string; share: string }[]>([]);
    // FirstUser state
    const [newFirstUser, setNewFirstUser] = useState('');
    // Level Income Percents state (20 levels)
    const [levelPercents, setLevelPercents] = useState<string[]>(Array(20).fill(''));
    // Lifetime Reward Tiers state (6 tiers)
    const [rewardTiers, setRewardTiers] = useState<{ teamSize: string; directReferrals: string; businessVolume: string; rewardAmount: string }[]>(
        Array(6).fill({ teamSize: '', directReferrals: '', businessVolume: '', rewardAmount: '' })
    );

    // Load current values into form when entering edit mode
    const loadFormValues = () => {
        if (!config) return;
        setDurationsState({
            d1: String(Number(config.durationOne) / 86400),
            d2: String(Number(config.durationTwo) / 86400),
            d3: String(Number(config.durationThree) / 86400),
            d4: String(Number(config.durationFour) / 86400)
        });
        setInterests({
            r1: String(Number(config.interestOne) / 100),
            r2: String(Number(config.interestTwo) / 100),
            r3: String(Number(config.interestThree) / 100),
            r4: String(Number(config.interestFour) / 100)
        });
        setTiers({
            t1: formatUSDT(config.stakingTier1, 0).replace(/,/g, ''),
            t2: formatUSDT(config.stakingTier2, 0).replace(/,/g, ''),
            t3min: formatUSDT(config.stakingTier3Min, 0).replace(/,/g, ''),
            max: formatUSDT(config.maxStaking, 0).replace(/,/g, '')
        });
        setDirectConfig({
            percent: String(Number(config.directIncomePercent) / 100),
            minStake: formatUSDT(config.minDirectIncomeStake, 0).replace(/,/g, '')
        });
        setLevelConfig({
            minStake: formatUSDT(config.minStakeForLevelCount, 0).replace(/,/g, ''),
            businessForAll: formatUSDT(config.directBusinessForAllLevels, 0).replace(/,/g, '')
        });
        setMinWithdrawalAmount(formatUSDT(config.minWithdrawal, 0).replace(/,/g, ''));
    };

    useEffect(() => {
        loadFormValues();
    }, [config]);

    const handleEdit = (mode: EditMode) => {
        loadFormValues();
        setEditMode(mode);
    };

    const handleCancel = () => {
        loadFormValues();
        setEditMode(null);
    };

    // Update handlers
    const handleUpdateDurations = async () => {
        try {
            toast.loading('Updating durations...', { id: 'durations' });
            await setDurations(
                BigInt(Math.round(parseFloat(durations.d1) * 86400)),
                BigInt(Math.round(parseFloat(durations.d2) * 86400)),
                BigInt(Math.round(parseFloat(durations.d3) * 86400)),
                BigInt(Math.round(parseFloat(durations.d4) * 86400))
            );
            toast.success('Durations updated!', { id: 'durations' });
            setEditMode(null);
        } catch (error) {
            toast.error('Failed to update', { id: 'durations' });
        }
    };

    const handleUpdateInterests = async () => {
        try {
            toast.loading('Updating interest rates...', { id: 'interests' });
            await setInterestRates(
                BigInt(Math.round(parseFloat(interests.r1) * 100)),
                BigInt(Math.round(parseFloat(interests.r2) * 100)),
                BigInt(Math.round(parseFloat(interests.r3) * 100)),
                BigInt(Math.round(parseFloat(interests.r4) * 100))
            );
            toast.success('Interest rates updated!', { id: 'interests' });
            setEditMode(null);
        } catch (error) {
            toast.error('Failed to update', { id: 'interests' });
        }
    };

    const handleUpdateTiers = async () => {
        try {
            toast.loading('Updating staking tiers...', { id: 'tiers' });
            await setStakingTiers(
                usdtToWei(tiers.t1),
                usdtToWei(tiers.t2),
                usdtToWei(tiers.t3min),
                usdtToWei(tiers.max)
            );
            toast.success('Staking tiers updated!', { id: 'tiers' });
            setEditMode(null);
        } catch (error) {
            toast.error('Failed to update', { id: 'tiers' });
        }
    };

    const handleUpdateDirectConfig = async () => {
        try {
            toast.loading('Updating...', { id: 'direct' });
            await setDirectIncomeConfig(
                BigInt(Math.round(parseFloat(directConfig.percent) * 100)),
                usdtToWei(directConfig.minStake)
            );
            toast.success('Updated!', { id: 'direct' });
            setEditMode(null);
        } catch (error) {
            toast.error('Failed to update', { id: 'direct' });
        }
    };

    const handleUpdateLevelConfig = async () => {
        try {
            toast.loading('Updating...', { id: 'level' });
            await setLevelUnlockConfig(
                usdtToWei(levelConfig.minStake),
                usdtToWei(levelConfig.businessForAll)
            );
            toast.success('Updated!', { id: 'level' });
            setEditMode(null);
        } catch (error) {
            toast.error('Failed to update', { id: 'level' });
        }
    };

    const handleUpdateMinWithdrawal = async () => {
        try {
            toast.loading('Updating...', { id: 'minwd' });
            await setMinWithdrawal(usdtToWei(minWithdrawalAmount));
            toast.success('Updated!', { id: 'minwd' });
            setEditMode(null);
        } catch (error) {
            toast.error('Failed to update', { id: 'minwd' });
        }
    };

    const handleEmergencyWithdraw = async () => {
        if (!confirm('⚠️ Are you sure you want to emergency withdraw? This action cannot be undone.')) return;
        try {
            toast.loading('Processing...', { id: 'emergency' });
            await emergencyWithdraw(usdtToWei(emergencyAmount));
            toast.success('Withdrawal successful!', { id: 'emergency' });
            setEmergencyAmount('');
        } catch (error) {
            toast.error('Failed', { id: 'emergency' });
        }
    };

    // Load partners into form when editing
    const loadPartners = () => {
        if (partners && partners.length > 0) {
            setPartnersList(partners.map(p => ({
                address: p.address,
                share: String(Number(p.share) / 100) // basis points to percentage
            })));
        }
    };

    const handleUpdatePartners = async () => {
        try {
            const total = partnersList.reduce((sum, p) => sum + parseFloat(p.share || '0'), 0);
            if (Math.abs(total - 100) > 0.01) {
                toast.error('Shares must total 100%');
                return;
            }
            toast.loading('Updating partners...', { id: 'partners' });
            await setPartners(
                partnersList.map(p => p.address),
                partnersList.map(p => BigInt(Math.round(parseFloat(p.share) * 100))) // percentage to basis points
            );
            toast.success('Partners updated!', { id: 'partners' });
            setEditMode(null);
            refetchPartners();
        } catch (error) {
            toast.error('Failed to update partners', { id: 'partners' });
        }
    };

    const handleTransferFirstUser = async () => {
        if (!newFirstUser || !newFirstUser.startsWith('0x')) {
            toast.error('Enter a valid address');
            return;
        }
        if (!confirm('⚠️ Are you sure you want to transfer FirstUser role? This is a critical action.')) return;
        try {
            toast.loading('Transferring...', { id: 'firstUser' });
            await transferFirstUser(newFirstUser);
            toast.success('FirstUser transferred!', { id: 'firstUser' });
            setEditMode(null);
            setNewFirstUser('');
            refetchFirstUser();
        } catch (error) {
            toast.error('Failed to transfer', { id: 'firstUser' });
        }
    };

    const addPartner = () => {
        setPartnersList([...partnersList, { address: '', share: '' }]);
    };

    const removePartner = (index: number) => {
        setPartnersList(partnersList.filter((_, i) => i !== index));
    };

    const updatePartner = (index: number, field: 'address' | 'share', value: string) => {
        const updated = [...partnersList];
        updated[index][field] = value;
        setPartnersList(updated);
    };

    // Load level percents from config
    const loadLevelPercents = () => {
        if (config?.levelIncomePercents) {
            setLevelPercents(config.levelIncomePercents.map(p => String(Number(p) / 100))); // basis points to %
        }
    };

    // Load lifetime rewards from config
    const loadLifetimeRewards = () => {
        if (lifetimeRewards && lifetimeRewards.length > 0) {
            setRewardTiers(lifetimeRewards.map(r => ({
                teamSize: String(Number(r.teamSize)),
                directReferrals: String(Number(r.directReferrals)),
                businessVolume: formatUSDT(r.businessVolume, 0).replace(/,/g, ''),
                rewardAmount: formatUSDT(r.rewardAmount, 0).replace(/,/g, '')
            })));
        }
    };

    const handleUpdateLevelPercents = async () => {
        try {
            toast.loading('Updating level percents...', { id: 'levelPercents' });
            const percents = levelPercents.map(p => BigInt(Math.round(parseFloat(p || '0') * 100))); // % to basis points
            await setLevelIncomePercents(percents);
            toast.success('Level percents updated!', { id: 'levelPercents' });
            setEditMode(null);
        } catch (error) {
            toast.error('Failed to update', { id: 'levelPercents' });
        }
    };

    const handleUpdateLifetimeRewardTier = async (tierIndex: number) => {
        try {
            const tier = rewardTiers[tierIndex];
            toast.loading(`Updating tier ${tierIndex + 1}...`, { id: `tier${tierIndex}` });
            await setLifetimeRewardTier(
                BigInt(tierIndex),
                BigInt(tier.teamSize || '0'),
                BigInt(tier.directReferrals || '0'),
                usdtToWei(tier.businessVolume || '0'),
                usdtToWei(tier.rewardAmount || '0')
            );
            toast.success(`Tier ${tierIndex + 1} updated!`, { id: `tier${tierIndex}` });
        } catch (error) {
            toast.error(`Failed to update tier ${tierIndex + 1}`, { id: `tier${tierIndex}` });
        }
    };

    const updateLevelPercent = (index: number, value: string) => {
        const updated = [...levelPercents];
        updated[index] = value;
        setLevelPercents(updated);
    };

    const updateRewardTier = (index: number, field: keyof typeof rewardTiers[0], value: string) => {
        const updated = [...rewardTiers];
        updated[index] = { ...updated[index], [field]: value };
        setRewardTiers(updated);
    };

    // Loading
    if (configLoading || !config) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="card-gold p-6 border-4 border-gold-primary/40 animate-pulse">
                        <div className="w-48 h-6 bg-gold-primary/20 rounded mb-4"></div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((j) => (
                                <div key={j} className="p-4 bg-black/50 rounded-lg">
                                    <div className="w-16 h-8 bg-gold-primary/10 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Staking Durations */}
            <SettingsCard
                title="⏱️ Staking Durations"
                isEditing={editMode === 'durations'}
                onEdit={() => handleEdit('durations')}
                onCancel={handleCancel}
                onSave={handleUpdateDurations}
                isPending={isPending}
            >
                {editMode === 'durations' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {(['d1', 'd2', 'd3', 'd4'] as const).map((key, i) => (
                            <EditInput
                                key={key}
                                label={`Duration ${i + 1}`}
                                value={durations[key]}
                                onChange={(v) => setDurationsState({ ...durations, [key]: v })}
                                suffix="days"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <ValueDisplay label="Duration 1" value={`${Number(config.durationOne) / 86400} Days`} />
                        <ValueDisplay label="Duration 2" value={`${Number(config.durationTwo) / 86400} Days`} />
                        <ValueDisplay label="Duration 3" value={`${Number(config.durationThree) / 86400} Days`} />
                        <ValueDisplay label="Duration 4" value={`${Number(config.durationFour) / 86400} Days`} />
                    </div>
                )}
            </SettingsCard>

            {/* Interest Rates */}
            <SettingsCard
                title="📈 Interest Rates"
                isEditing={editMode === 'interests'}
                onEdit={() => handleEdit('interests')}
                onCancel={handleCancel}
                onSave={handleUpdateInterests}
                isPending={isPending}
            >
                {editMode === 'interests' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {(['r1', 'r2', 'r3', 'r4'] as const).map((key, i) => (
                            <EditInput
                                key={key}
                                label={`Rate ${i + 1}`}
                                value={interests[key]}
                                onChange={(v) => setInterests({ ...interests, [key]: v })}
                                suffix="%"
                                step="0.1"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <ValueDisplay label="Rate 1" value={`${Number(config.interestOne) / 100}%`} highlight />
                        <ValueDisplay label="Rate 2" value={`${Number(config.interestTwo) / 100}%`} highlight />
                        <ValueDisplay label="Rate 3" value={`${Number(config.interestThree) / 100}%`} highlight />
                        <ValueDisplay label="Rate 4" value={`${Number(config.interestFour) / 100}%`} highlight />
                    </div>
                )}
            </SettingsCard>

            {/* Staking Tiers */}
            <SettingsCard
                title="💰 Staking Tiers"
                isEditing={editMode === 'tiers'}
                onEdit={() => handleEdit('tiers')}
                onCancel={handleCancel}
                onSave={handleUpdateTiers}
                isPending={isPending}
            >
                {editMode === 'tiers' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <EditInput label="Tier 1" value={tiers.t1} onChange={(v) => setTiers({ ...tiers, t1: v })} prefix="$" />
                        <EditInput label="Tier 2" value={tiers.t2} onChange={(v) => setTiers({ ...tiers, t2: v })} prefix="$" />
                        <EditInput label="Tier 3 Min" value={tiers.t3min} onChange={(v) => setTiers({ ...tiers, t3min: v })} prefix="$" />
                        <EditInput label="Maximum" value={tiers.max} onChange={(v) => setTiers({ ...tiers, max: v })} prefix="$" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <ValueDisplay label="Tier 1" value={`$${formatUSDT(config.stakingTier1, 0)}`} />
                        <ValueDisplay label="Tier 2" value={`$${formatUSDT(config.stakingTier2, 0)}`} />
                        <ValueDisplay label="Tier 3 Min" value={`$${formatUSDT(config.stakingTier3Min, 0)}`} />
                        <ValueDisplay label="Maximum" value={`$${formatUSDT(config.maxStaking, 0)}`} highlight />
                    </div>
                )}
            </SettingsCard>

            {/* Direct Income Config */}
            <SettingsCard
                title="👥 Direct Income Config"
                isEditing={editMode === 'direct'}
                onEdit={() => handleEdit('direct')}
                onCancel={handleCancel}
                onSave={handleUpdateDirectConfig}
                isPending={isPending}
            >
                {editMode === 'direct' ? (
                    <div className="grid grid-cols-2 gap-4">
                        <EditInput label="Direct Income %" value={directConfig.percent} onChange={(v) => setDirectConfig({ ...directConfig, percent: v })} suffix="%" step="0.1" />
                        <EditInput label="Min Stake Required" value={directConfig.minStake} onChange={(v) => setDirectConfig({ ...directConfig, minStake: v })} prefix="$" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <ValueDisplay label="Direct Income" value={`${Number(config.directIncomePercent) / 100}%`} highlight />
                        <ValueDisplay label="Min Stake Required" value={`$${formatUSDT(config.minDirectIncomeStake, 0)}`} />
                    </div>
                )}
            </SettingsCard>

            {/* Level Unlock Config */}
            <SettingsCard
                title="🎯 Level Unlock Config"
                isEditing={editMode === 'level'}
                onEdit={() => handleEdit('level')}
                onCancel={handleCancel}
                onSave={handleUpdateLevelConfig}
                isPending={isPending}
            >
                {editMode === 'level' ? (
                    <div className="grid grid-cols-2 gap-4">
                        <EditInput label="Min Stake per Level" value={levelConfig.minStake} onChange={(v) => setLevelConfig({ ...levelConfig, minStake: v })} prefix="$" />
                        <EditInput label="Business for All Levels" value={levelConfig.businessForAll} onChange={(v) => setLevelConfig({ ...levelConfig, businessForAll: v })} prefix="$" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <ValueDisplay label="Min Stake per Level" value={`$${formatUSDT(config.minStakeForLevelCount, 0)}`} />
                        <ValueDisplay label="Business for All Levels" value={`$${formatUSDT(config.directBusinessForAllLevels, 0)}`} highlight />
                    </div>
                )}
            </SettingsCard>

            {/* Min Withdrawal */}
            <SettingsCard
                title="💸 Minimum Withdrawal"
                isEditing={editMode === 'withdrawal'}
                onEdit={() => handleEdit('withdrawal')}
                onCancel={handleCancel}
                onSave={handleUpdateMinWithdrawal}
                isPending={isPending}
            >
                {editMode === 'withdrawal' ? (
                    <EditInput label="Minimum Amount" value={minWithdrawalAmount} onChange={setMinWithdrawalAmount} prefix="$" />
                ) : (
                    <ValueDisplay label="Minimum Amount" value={`$${formatUSDT(config.minWithdrawal, 0)}`} highlight />
                )}
            </SettingsCard>

            {/* Emergency Withdraw - Always editable, danger zone */}
            <div className="card-gold p-6 border-4 border-red-500/40">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-red-400 uppercase">⚠️ Emergency Withdraw</h2>
                    <div className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/30">
                        <span className="text-green-400 font-bold text-sm">
                            Balance: ${stats ? formatUSDT(stats.contractBalance, 0) : '0'}
                        </span>
                    </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                    ⚡ Withdraw funds from contract to partners. Use with caution.
                </p>
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                            type="number"
                            value={emergencyAmount}
                            onChange={(e) => setEmergencyAmount(e.target.value)}
                            placeholder="Amount"
                            className="w-full pl-8 pr-3 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white focus:border-red-500 focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={handleEmergencyWithdraw}
                        disabled={isPending || !emergencyAmount}
                        className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                        style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
                    >
                        Withdraw
                    </button>
                </div>
            </div>

            {/* Partners Management */}
            <div className={`card-gold p-6 border-4 border-gold-primary/40 transition-all`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black text-gold-primary uppercase">👥 Partners</h2>
                    {/* Edit button hidden for now
                    {editMode === 'partners' ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => { loadFormValues(); setEditMode(null); }}
                                disabled={isPending}
                                className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdatePartners}
                                disabled={isPending}
                                className="px-4 py-2 rounded-lg font-bold text-black transition-all hover:scale-105 disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
                            >
                                {isPending ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { loadPartners(); setEditMode('partners'); }}
                            className="px-4 py-2 bg-blue-500/20 text-blue-400 font-bold rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all"
                        >
                            ✏️ Edit
                        </button>
                    )}
                    */}
                </div>

                {editMode === 'partners' ? (
                    <div className="space-y-3">
                        {partnersList.map((partner, idx) => (
                            <div key={idx} className="flex gap-3 items-center">
                                <input
                                    type="text"
                                    value={partner.address}
                                    onChange={(e) => updatePartner(idx, 'address', e.target.value)}
                                    placeholder="0x..."
                                    className="flex-1 px-3 py-2 bg-black/50 border-2 border-blue-500/50 rounded-lg text-white font-mono text-sm focus:border-blue-500 focus:outline-none"
                                />
                                <div className="relative w-24">
                                    <input
                                        type="number"
                                        value={partner.share}
                                        onChange={(e) => updatePartner(idx, 'share', e.target.value)}
                                        placeholder="Share"
                                        className="w-full pr-6 pl-3 py-2 bg-black/50 border-2 border-blue-500/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                                    />
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                                </div>
                                <button
                                    onClick={() => removePartner(idx)}
                                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addPartner}
                            className="w-full py-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-gold-primary hover:text-gold-primary transition-all"
                        >
                            + Add Partner
                        </button>
                        <div className="text-sm text-gray-400 text-center">
                            Total: <span className={`font-bold ${Math.abs(partnersList.reduce((s, p) => s + parseFloat(p.share || '0'), 0) - 100) < 0.01 ? 'text-green-400' : 'text-red-400'}`}>
                                {partnersList.reduce((s, p) => s + parseFloat(p.share || '0'), 0).toFixed(2)}%
                            </span> (must be 100%)
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {partnersLoading ? (
                            <div className="p-4 text-center text-gray-400">Loading...</div>
                        ) : partners.length === 0 ? (
                            <div className="p-4 text-center text-gray-400">No partners set</div>
                        ) : (
                            partners.map((p, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-gold-primary/20">
                                    <code className="text-gray-300 text-sm">{p.address.slice(0, 10)}...{p.address.slice(-6)}</code>
                                    <span className="text-gold-primary font-bold">{Number(p.share) / 100}%</span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* FirstUser Management */}
            <div className={`card-gold p-6 border-4 ${editMode === 'firstUser' ? 'border-purple-500/60' : 'border-purple-500/40'} transition-all`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black text-purple-400 uppercase">👑 First User</h2>
                    {editMode === 'firstUser' ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => { setNewFirstUser(''); setEditMode(null); }}
                                disabled={isPending}
                                className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setEditMode('firstUser')}
                            className="px-4 py-2 bg-purple-500/20 text-purple-400 font-bold rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-all"
                        >
                            🔄 Transfer
                        </button>
                    )}
                </div>

                {/* Current FirstUser */}
                <div className="p-4 bg-black/50 rounded-lg border border-purple-500/20 mb-4">
                    <div className="text-xs text-gray-400 mb-1">Current First User</div>
                    {firstUserLoading ? (
                        <div className="text-gray-400">Loading...</div>
                    ) : (
                        <code className="text-purple-400 font-bold break-all">{firstUser || 'Not set'}</code>
                    )}
                </div>

                {editMode === 'firstUser' && (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">New First User Address</label>
                            <input
                                type="text"
                                value={newFirstUser}
                                onChange={(e) => setNewFirstUser(e.target.value)}
                                placeholder="0x..."
                                className="w-full px-3 py-3 bg-black/50 border-2 border-purple-500/50 rounded-lg text-white font-mono focus:border-purple-500 focus:outline-none"
                            />
                        </div>
                        <button
                            onClick={handleTransferFirstUser}
                            disabled={isPending || !newFirstUser}
                            className="w-full py-3 rounded-lg font-bold text-white transition-all hover:scale-105 disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}
                        >
                            {isPending ? 'Transferring...' : '⚠️ Transfer FirstUser Role'}
                        </button>
                    </div>
                )}
            </div>

            {/* Level Income Percents */}
            <div className={`card-gold p-6 border-4 ${editMode === 'levelPercents' ? 'border-blue-500/60' : 'border-gold-primary/40'} transition-all`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black text-gold-primary uppercase">📊 Level Income Percents</h2>
                    {editMode === 'levelPercents' ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => { loadFormValues(); setEditMode(null); }}
                                disabled={isPending}
                                className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateLevelPercents}
                                disabled={isPending}
                                className="px-4 py-2 rounded-lg font-bold text-black transition-all hover:scale-105 disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
                            >
                                {isPending ? 'Saving...' : 'Save All'}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { loadLevelPercents(); setEditMode('levelPercents'); }}
                            className="px-4 py-2 bg-blue-500/20 text-blue-400 font-bold rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all"
                        >
                            ✏️ Edit
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
                    {Array.from({ length: 20 }, (_, i) => (
                        <div key={i} className="text-center">
                            <div className="text-xs text-gray-500 mb-1">L{i + 1}</div>
                            {editMode === 'levelPercents' ? (
                                <input
                                    type="number"
                                    step="0.01"
                                    value={levelPercents[i]}
                                    onChange={(e) => updateLevelPercent(i, e.target.value)}
                                    className="w-full px-1 py-2 bg-black/50 border-2 border-blue-500/50 rounded text-white text-center text-sm focus:border-blue-500 focus:outline-none"
                                />
                            ) : (
                                <div className="p-2 bg-black/50 border border-gold-primary/20 rounded">
                                    <span className="text-gold-primary font-bold text-sm">
                                        {config?.levelIncomePercents?.[i] ? Number(config.levelIncomePercents[i]) / 100 : 0}%
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-3 text-center text-sm text-gray-400">
                    Total: <span className="text-gold-primary font-bold">
                        {editMode === 'levelPercents'
                            ? levelPercents.reduce((s, p) => s + parseFloat(p || '0'), 0).toFixed(2)
                            : config?.levelIncomePercents?.reduce((s, p) => s + Number(p), 0) / 100 || 0
                        }%
                    </span>
                </div>
            </div>

            {/* Lifetime Reward Tiers */}
            <div className={`card-gold p-6 border-4 ${editMode === 'lifetimeRewards' ? 'border-yellow-500/60' : 'border-yellow-500/40'} transition-all`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-black text-yellow-400 uppercase">🏆 Lifetime Reward Tiers</h2>
                    {editMode === 'lifetimeRewards' ? (
                        <button
                            onClick={() => { setEditMode(null); }}
                            className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all"
                        >
                            Done
                        </button>
                    ) : (
                        <button
                            onClick={() => { loadLifetimeRewards(); setEditMode('lifetimeRewards'); }}
                            className="px-4 py-2 bg-yellow-500/20 text-yellow-400 font-bold rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-all"
                        >
                            ✏️ Edit
                        </button>
                    )}
                </div>

                <div className="space-y-3">
                    {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className={`p-4 rounded-lg border ${editMode === 'lifetimeRewards' ? 'bg-black/50 border-yellow-500/30' : 'bg-black/50 border-gold-primary/20'}`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-yellow-400 font-bold">Tier {i + 1}</span>
                                {editMode === 'lifetimeRewards' && (
                                    <button
                                        onClick={() => handleUpdateLifetimeRewardTier(i)}
                                        disabled={isPending}
                                        className="px-3 py-1 text-sm rounded font-bold text-black transition-all hover:scale-105 disabled:opacity-50"
                                        style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                            {editMode === 'lifetimeRewards' ? (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Team Size</label>
                                        <input
                                            type="number"
                                            value={rewardTiers[i]?.teamSize || ''}
                                            onChange={(e) => updateRewardTier(i, 'teamSize', e.target.value)}
                                            className="w-full px-2 py-2 bg-black/50 border border-yellow-500/30 rounded text-white text-sm focus:border-yellow-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Direct Refs</label>
                                        <input
                                            type="number"
                                            value={rewardTiers[i]?.directReferrals || ''}
                                            onChange={(e) => updateRewardTier(i, 'directReferrals', e.target.value)}
                                            className="w-full px-2 py-2 bg-black/50 border border-yellow-500/30 rounded text-white text-sm focus:border-yellow-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Business ($)</label>
                                        <input
                                            type="number"
                                            value={rewardTiers[i]?.businessVolume || ''}
                                            onChange={(e) => updateRewardTier(i, 'businessVolume', e.target.value)}
                                            className="w-full px-2 py-2 bg-black/50 border border-yellow-500/30 rounded text-white text-sm focus:border-yellow-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">Reward ($)</label>
                                        <input
                                            type="number"
                                            value={rewardTiers[i]?.rewardAmount || ''}
                                            onChange={(e) => updateRewardTier(i, 'rewardAmount', e.target.value)}
                                            className="w-full px-2 py-2 bg-black/50 border border-yellow-500/30 rounded text-white text-sm focus:border-yellow-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                                    <div>
                                        <div className="text-xs text-gray-500">Team Size</div>
                                        <div className="text-white font-bold">{lifetimeRewards[i]?.teamSize?.toString() || '0'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Direct Refs</div>
                                        <div className="text-white font-bold">{lifetimeRewards[i]?.directReferrals?.toString() || '0'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Business</div>
                                        <div className="text-green-400 font-bold">${lifetimeRewards[i]?.businessVolume ? formatUSDT(lifetimeRewards[i].businessVolume, 0) : '0'}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500">Reward</div>
                                        <div className="text-yellow-400 font-bold">${lifetimeRewards[i]?.rewardAmount ? formatUSDT(lifetimeRewards[i].rewardAmount, 0) : '0'}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Settings Card Component - View/Edit toggle pattern
function SettingsCard({
    title,
    isEditing,
    onEdit,
    onCancel,
    onSave,
    isPending,
    children
}: {
    title: string;
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
    isPending: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className={`card-gold p-6 border-4 ${isEditing ? 'border-blue-500/60' : 'border-gold-primary/40'} transition-all`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black text-gold-primary uppercase">{title}</h2>
                {isEditing ? (
                    <div className="flex gap-2">
                        <button
                            onClick={onCancel}
                            disabled={isPending}
                            className="px-4 py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            disabled={isPending}
                            className="px-4 py-2 rounded-lg font-bold text-black transition-all hover:scale-105 disabled:opacity-50"
                            style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
                        >
                            {isPending ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 bg-blue-500/20 text-blue-400 font-bold rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all"
                    >
                        ✏️ Edit
                    </button>
                )}
            </div>
            {children}
        </div>
    );
}

// Value Display Component - Readonly
function ValueDisplay({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className="p-4 bg-black/50 border border-gold-primary/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">{label}</div>
            <div className={`text-xl font-black ${highlight ? 'text-gold-primary' : 'text-white'}`}>
                {value}
            </div>
        </div>
    );
}

// Edit Input Component
function EditInput({
    label,
    value,
    onChange,
    prefix,
    suffix,
    step
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    prefix?: string;
    suffix?: string;
    step?: string;
}) {
    return (
        <div>
            <label className="block text-xs text-gray-400 mb-1">{label}</label>
            <div className="relative">
                {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{prefix}</span>}
                <input
                    type="number"
                    step={step}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full ${prefix ? 'pl-8' : 'pl-3'} ${suffix ? 'pr-12' : 'pr-3'} py-3 bg-black/50 border-2 border-blue-500/50 rounded-lg text-white focus:border-blue-500 focus:outline-none`}
                />
                {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{suffix}</span>}
            </div>
        </div>
    );
}
