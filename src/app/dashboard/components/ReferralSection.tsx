interface ReferralSectionProps {
    referralLink: string;
    onCopyLink: () => void;
}

export default function ReferralSection({ referralLink, onCopyLink }: ReferralSectionProps) {
    return (
        <div className="card-gold p-6 border-4 border-gold-primary/40">
            <h3 className="text-xl font-black text-gold-primary mb-4 uppercase">Your Referral Link</h3>
            <div className="p-3 bg-black/50 border-2 border-gold-primary/30 rounded-lg mb-3">
                <div className="text-xs text-gray-400 mb-1">Share this link:</div>
                <div className="text-gold-primary text-sm font-mono break-all">{referralLink}</div>
            </div>
            <button
                onClick={onCopyLink}
                className="w-full py-3 bg-gold-primary text-black font-bold rounded-lg hover:scale-105 transition-all"
            >
                Copy Link
            </button>
        </div>
    );
}
