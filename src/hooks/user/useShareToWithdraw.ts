"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface ShareConfig {
    withdrawAmount: string;
    referralLink: string;
}

export const useShareToWithdraw = () => {
    const [shareCount, setShareCount] = useState<number>(0);
    const [lastShareTime, setLastShareTime] = useState<number>(0);
    const [verifying, setVerifying] = useState<boolean>(false);
    const [verifyTimeLeft, setVerifyTimeLeft] = useState<number>(0);

    useEffect(() => {
        // Load share count and last share time from localStorage on mount
        const savedCount = localStorage.getItem('growbit_share_count');
        const savedTime = localStorage.getItem('growbit_last_share_time');

        if (savedCount) {
            setShareCount(parseInt(savedCount, 10));
        }
        if (savedTime) {
            setLastShareTime(parseInt(savedTime, 10));
        }
    }, []);

    // Countdown timer for verification
    useEffect(() => {
        if (verifyTimeLeft > 0) {
            const timer = setTimeout(() => {
                setVerifyTimeLeft(verifyTimeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (verifyTimeLeft === 0 && verifying) {
            setVerifying(false);
            incrementShareCount();
            toast.success('✅ Share verified! You can now withdraw. 🎉');
        }
    }, [verifyTimeLeft, verifying]);

    const isSharedToday = () => {
        if (!lastShareTime) return false;
        const lastDate = new Date(lastShareTime).toDateString();
        const today = new Date().toDateString();
        return lastDate === today;
    };

    const incrementShareCount = () => {
        const newCount = shareCount + 1;
        const now = Date.now();

        setShareCount(newCount);
        setLastShareTime(now);

        localStorage.setItem('growbit_share_count', newCount.toString());
        localStorage.setItem('growbit_last_share_time', now.toString());
    };

    const handleShare = async ({ withdrawAmount, referralLink }: ShareConfig) => {
        const message = `🚀 *Just withdrew ${withdrawAmount} USDT from GrowBit Trade!* 💸

🔥 *The Ultimate Passive Income Platform!*
💎 *Daily ROI:* 1-2% Daily
⏳ *Duration:* 300 Days
💰 *Total Return:* 300% (3x)
🎁 *1st Referral:* 50 USDT Instant!
🎁 *3rd+ Referrals:* 25 USDT Each!
👥 *Binary Income:* 10% Team Matching
📊 *Level Income:* 10 Levels Deep

👇 *Join my winning team now:*

${referralLink}

#GrowBitTrade #PassiveIncome #Crypto #USDT #FinancialFreedom 🚀`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'GrowBit Trade Withdrawal',
                    text: message,
                });
                // Start 30-second verification
                setVerifying(true);
                setVerifyTimeLeft(30);
                toast.success('⏳ Verifying share... Please wait 30 seconds to unlock withdrawal.');
            } else {
                // Fallback to clipboard with same verification
                await navigator.clipboard.writeText(message);
                setVerifying(true);
                setVerifyTimeLeft(30);
                toast.success('📋 Message copied! Share it now. Verifying in 30 seconds...');
            }
        } catch (error) {
            console.error('Share error:', error);
            if ((error as Error).name === 'AbortError') {
                toast.error('❌ Share cancelled! You must share to withdraw.');
            } else {
                toast.error('Failed to share. Please try again.');
            }
        }
    };

    const resetShareCount = () => {
        setShareCount(0);
        setLastShareTime(0);
        setVerifying(false);
        setVerifyTimeLeft(0);
        localStorage.setItem('growbit_share_count', '0');
        localStorage.setItem('growbit_last_share_time', '0');
    };

    return {
        shareCount,
        lastShareTime,
        handleShare,
        resetShareCount,
        canWithdraw: isSharedToday() && !verifying,
        verifying,
        verifyTimeLeft
    };
};
